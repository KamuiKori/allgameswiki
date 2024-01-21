import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {child, get, getDatabase, ref, set, update, remove} from "firebase/database";
import {setUserAvatar, setUserInfo} from "../../store/slices/userSlice";
import styles from './styles.module.css'
import {Link} from "react-router-dom";
import Comment from "../../Components/Comment";
import CreateComment from "../../Components/CreateComment";
import {useSelector} from "react-redux";
import createDateHook from "../../hooks/createDate";
import post from "../../Components/Post";
import {getDownloadURL, getStorage, ref as sRef, uploadBytesResumable} from "firebase/storage";
import {retry} from "@reduxjs/toolkit/query";

function FullPost() {
    const {id} = useParams();
    const dbRef = ref(getDatabase());
    const [postInfo, setPostInfo] = useState({});
    const [comments, setComments] = useState([]);
    const [isCommentsLoaded, setIsCommentsLoaded] = useState(false);
    const [renderActionBtns, setRenderActionBtns] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [showPost,setShowPost] = useState(true);
    const navigate = useNavigate();
    const [isEditing,setIsEditing] = useState(false);
    const [nameEditInputValue,setNameEditInputValue] = useState("");
    const [textEditInputValue,setTextEditInputValue] = useState("");
    const [editPostPicture,setEditPostPicture] = useState(null);
    const storage = getStorage();
    const commentId = "";
    const [isCommentDeleted,setIsCommentDeleted] = useState(false);
    const [userName,setUserName] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    function setIsCommentDeletedFunc(arg){
        setIsCommentDeleted(arg)
    }

    function getComments() {
        get(child(dbRef, `posts/${id}/comments`)).then((snapshot) => {
            if (snapshot.exists()) {
                setIsCommentsLoaded(true);
                var data = snapshot.val();
                setComments(snapshot.val())
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getComments();
        setIsCommentDeletedFunc(false)
    }, [isCommentsLoaded,isCommentDeleted])
    useEffect(()=>{
        get(child(dbRef, `users/${postInfo.userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUserName(snapshot.val().nickname)
            }
        }).catch((error) => {
            console.error(error);
        });
    },[postInfo])

    useEffect(() => {
        setIsLoading(true)
        get(child(dbRef, `posts/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val()
                setPostInfo({
                    "postName": data.name,
                    "postTitle": data.title,
                    "postText": data.text,
                    "postPicture": data.postPicture,
                    "postCreateDate": data.createDate,
                    "author": data.authorNickname,
                    "userId": data.userId,
                    "isDeleted":data.isDeleted
                });
                setIsLoading(false);
                if(data.isDeleted){
                    setShowPost(false);
                }
                if(localStorage.getItem('userId')){
                    const userId = localStorage.getItem('userId')
                    if (userId === data.userId || JSON.parse(localStorage.getItem('isAdmin'))) {
                        setRenderActionBtns(true);
                    }
                    else{
                        setRenderActionBtns(false);
                    }
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [isEditing])

    const [comment, setComment] = useState("");
    const user = useSelector((state) => state.user);

    function onChangeCommentText(e) {
        setComment(e.target.value);
    }

    function createCommentHandler(e) {
        let commentId = "";
        var createDate = createDateHook();
        const data = {
            "userId": localStorage.getItem('userId'),
            "commentText": comment,
            "userNickname": user.nickname,
            "userAvatar": user.avatar,
            "createDate": createDate,
            "id":commentId,
            "isDeleted":false
        }
        get(child(dbRef, `posts/${id}/comments`)).then((snapshot) => {
            if (snapshot.exists()) {
                commentId = Object.keys(snapshot.val()).length + 1;
                data["id"] = commentId
                update(child(dbRef, `posts/${id}/comments/${commentId}`), data).then(() => {
                    setComment("");
                    getComments();
                })
            } else {
                commentId = 1;
                data["id"] = commentId
                set(child(dbRef, `posts/${id}/comments/${commentId}`), data).then((e) => {
                    setComment("")
                    getComments();
                })
            }
        }).catch((error) => {
            console.error(error);
        });
        setIsCommentsLoaded(false);
    }
    function writePostDataToDatabase(data){
        if(editPostPicture !== null){
            const postPictureName = id + "picture"
            const storageRef = sRef(storage, 'postsPictures/' + postPictureName);
            const uploadTask = uploadBytesResumable(storageRef, editPostPicture);
            uploadTask.on('state_changed',
                (snapshot) => {
                },
                (error) => {
                    console.error(error.code)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        data["postPicture"] = downloadURL;
                        const db = ref(getDatabase());
                        update(child(db, `posts/${id}`),data).then(()=>setIsEditing(false));
                    });
                }
            );
        }
        else{
            const db = ref(getDatabase());
            update(child(db, `posts/${id}`),data).then(()=>{
                setIsEditing(false);
            })
        }
    }

    function editPostHandler() {
        setNameEditInputValue(postInfo.postName)
        setTextEditInputValue(postInfo.postText)
        setIsEditing(true);
    }
    function postPictureChangeHandler(e){
        setEditPostPicture(e.target.files[0]);
    }
    function nameEditHandler(e){
        setNameEditInputValue(e.target.value);
    }
    function textEditHandler(e){
        setTextEditInputValue(e.target.value);
    }
    function cancelEditBtnHandler(){
        setIsEditing(false);
    }
    function saveEditingHandler(){
        let data = {
            name: nameEditInputValue,
            text:textEditInputValue,
            isDeleted:false
        };
        writePostDataToDatabase(data)
    }

    function deletePostHandler() {
        let data = {};
        data["isDeleted"] = true;
        update(child(dbRef, `posts/${id}`), data).then((e) => {
            setIsDeleted(true);
        });
    }
    if (isLoading) {
        return <>
            <img className="loader"
                 src="https://firebasestorage.googleapis.com/v0/b/allgameswiki-b3ce4.appspot.com/o/postsPictures%2Floading.gif?alt=media&token=d1e259f2-cbcf-4633-ba85-20f004bcda7f"
                 alt=""/>
        </>
    }


    return (
        <>{
            !isEditing?
            showPost?
            isDeleted?
                <>
                    <p className={styles.post_title}>Материал удален</p>
                </>
                :
                <>
                    <div className={styles.post_wrapper}>
                        <p className={styles.post_title}>{postInfo.postName}</p>
                        <div className={styles.post_img_wrapper}>
                            <div className={styles.post_info}>
                                <div className={styles.line}>
                                    <Link to={"/profile/" + postInfo.userId}>Автор: {userName}</Link>
                                    <p>Дата создания: {postInfo.postCreateDate}</p>
                                </div>
                                <div className={styles.line}>
                                    {
                                        renderActionBtns ?
                                            <div className={styles.action_btns}>
                                                <button className={styles.edit_btn} name="Редактировать"
                                                        onClick={editPostHandler}>Редактировать
                                                </button>
                                                <button className={styles.delete_btn} name="Удалить"
                                                        onClick={deletePostHandler}>Удалить
                                                </button>
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                            <img src={postInfo.postPicture} alt="post_img" className={styles.post_img} align="left"/>
                            <p className={styles.post_text}>{postInfo.postText}</p>
                        </div>
                    </div>
                    <div className={styles.comments_wrapper}>
                        <p className={styles.comments_title}>Комментарии</p>
                        {
                            comments.length > 0?
                            comments.map((comment) => {
                                return (<Comment userId={comment.userId} commentText={comment.commentText}
                                                 createDate={comment.createDate} userAvatar={comment.userAvatar}
                                                 userNickname={comment.userNickname} id={comment.id} isDeleted={comment.isDeleted} setIsCommentDeletedFunc={setIsCommentDeletedFunc}/>)
                            }):""
                        }
                        {
                            localStorage.getItem('userId')?<CreateComment createCommentHandler={createCommentHandler}
                                                                          onChangeCommentText={onChangeCommentText} comment={comment}/>:""
                        }
                    </div>
                </>
                :<><p className={styles.post_title}>Материал удален</p></>:
                <div className={styles.edit_form}>
                    <div className={styles.inputs}>
                        <input type="file" className={styles.post_pic_input}
                               onChange={(e) => postPictureChangeHandler(e)} accept=".jpg, .jpeg, .png"/>
                        <input type="text" name="post_name" className={styles.editName} value={nameEditInputValue} onChange={(e)=>nameEditHandler(e)}/>
                        <textarea name="post_text" className={styles.editText} value={textEditInputValue} onChange={(e)=>textEditHandler(e)}>{textEditInputValue}</textarea>
                    </div>
                    <div className={styles.edit_btns}>
                        <button type="button" onClick={saveEditingHandler}>Сохранить</button>
                        <button type="button" onClick={cancelEditBtnHandler}>Отмена</button>
                    </div>
                </div>
        }
        </>
    )
}

export default FullPost
