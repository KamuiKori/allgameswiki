import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {child, get, getDatabase, ref, set, update, remove} from "firebase/database";
import {setUserInfo} from "../../store/slices/userSlice";
import styles from './styles.module.css'
import {Link} from "react-router-dom";
import Comment from "../../Components/Comment";
import CreateComment from "../../Components/CreateComment";
import {useSelector} from "react-redux";
import createDateHook from "../../hooks/createDate";
import post from "../../Components/Post";

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
    }, [isCommentsLoaded])

    useEffect(() => {
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
                if(data.isDeleted){
                    setShowPost(false);
                }
                if(localStorage.getItem('userId')){
                    const userId = localStorage.getItem('userId')
                    if (userId === data.userId || JSON.parse(user.isAdmin)) {
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
    }, [])

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
            "createDate": createDate
        }
        get(child(dbRef, `posts/${id}/comments`)).then((snapshot) => {
            if (snapshot.exists()) {
                commentId = Object.keys(snapshot.val()).length + 1;
                update(child(dbRef, `posts/${id}/comments/${commentId}`), data).then(() => {
                    setComment("");
                    getComments();
                })
            } else {
                commentId = 1;
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

    function editPostHandler() {

    }

    function deletePostHandler() {
        let data = {};
        data["isDeleted"] = true;
        update(child(dbRef, `posts/${id}`), data).then((e) => {
            setIsDeleted(true);
        });
    }


    return (
        <>{
            showPost?
            isDeleted?
                <>
                    <p className={styles.post_title}>Материал удален</p>
                </>
                :
                <>
                    <p className={styles.post_title}>{postInfo.postName}</p>
                    <div className={styles.post_wrapper}>
                        <div className={styles.post_img_wrapper}>
                            <div className={styles.post_info}>
                                <div className={styles.line}>
                                    <p>Автор: {postInfo.author}</p>
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
                            <p className={styles.post_title}>{postInfo.title}</p>
                            <p className={styles.post_text}>{postInfo.postText}</p>
                        </div>
                    </div>
                    <div className={styles.comments_wrapper}>
                        <p className={styles.comments_title}>Комментарии</p>
                        {
                            comments.map((comment) => {
                                return (<Comment userId={comment.userId} commentText={comment.commentText}
                                                 createDate={comment.createDate} userAvatar={comment.userAvatar}
                                                 userNickname={comment.userNickname}/>)
                            })
                        }
                        <CreateComment createCommentHandler={createCommentHandler}
                                       onChangeCommentText={onChangeCommentText} comment={comment}/>
                    </div>
                </>
                :<><p className={styles.post_title}>Материал удален</p></>
        }
        </>
    )
}

export default FullPost
