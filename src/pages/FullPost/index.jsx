import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {child, get, getDatabase, ref, set, update} from "firebase/database";
import {setUserInfo} from "../../store/slices/userSlice";
import styles from './styles.module.css'
import {Link} from "react-router-dom";
import Comment from "../../Components/Comment";
import CreateComment from "../../Components/CreateComment";
import {useSelector} from "react-redux";

function FullPost() {
    const {id} = useParams();
    const dbRef = ref(getDatabase());
    const [postInfo,setPostInfo] = useState({});
    const [comments,setComments] = useState([]);
    const [isCommentsLoaded,setIsCommentsLoaded] = useState(false);
    function getComments(){
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
    useEffect(()=>{
        getComments();
    },[isCommentsLoaded])

    useEffect(() => {
        get(child(dbRef, `posts/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val()
                setPostInfo({
                    "postName":data.name,
                    "postTitle":data.title,
                    "postText":data.text,
                    "postPicture":data.postPicture,
                    "postCreateDate":data.createDate,
                    "author":data.authorNickname,
                });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    const [comment,setComment] = useState("");
    const user = useSelector((state) => state.user);
    function onChangeCommentText(e){
        setComment(e.target.value);
    }
    function createCommentHandler(e){
        let commentId = "";
        var createDate = new Date()
        createDate = createDate.getHours().toString() + ":" +createDate.getMinutes().toString() + " - " + createDate.getDate() + "." + createDate.getMonth() + "." + createDate.getFullYear();
        const data = {
            "userId":localStorage.getItem('userId'),
            "commentText":comment,
            "userNickname":user.nickname,
            "userAvatar":user.avatar,
            "createDate":createDate
        }
        get(child(dbRef, `posts/${id}/comments`)).then((snapshot) => {
            if (snapshot.exists()) {
                commentId = Object.keys(snapshot.val()).length + 1;
                update(child(dbRef, `posts/${id}/comments/${commentId}`),data).then()
                setComment("")
            } else {
                commentId = 1;
                set(child(dbRef, `posts/${id}/comments/${commentId}`),data).then((e)=>console.log(e))
                setComment("")
            }
        }).catch((error) => {
            console.error(error);
        });
        setIsCommentsLoaded(false);
    }
    return (
        <>
            <p className="page_title">{postInfo.postName}</p>
            <div className={styles.post_wrapper}>
                <div className={styles.post_img_wrapper}>
                    <div className={styles.post_info}>
                        <p>Автор: {postInfo.author}</p>
                        <p>Дата создания: {postInfo.postCreateDate}</p>
                    </div>
                    <img src={postInfo.postPicture} alt="post_img" className={styles.post_img} align="left"/>
                    <p className={styles.post_title}>{postInfo.postTitle}</p>
                    <p className={styles.post_text}>{postInfo.postText}</p>
                </div>
            </div>
            <div className={styles.comments_wrapper}>
                <p className={styles.comments_title}>Комментарии</p>
                {
                    comments.map((comment)=>{
                        return(<Comment commentText={comment.commentText} createDate={comment.createDate} userAvatar={comment.userAvatar} userNickname={comment.userNickname}/>)
                    })
                }
                <CreateComment createCommentHandler={createCommentHandler} onChangeCommentText={onChangeCommentText} comment={comment}/>
            </div>
        </>
    )
}

export default FullPost
