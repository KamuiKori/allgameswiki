import styles from './styles.module.css'
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {child, get, getDatabase, ref, update} from "firebase/database";

function Comment(commentData){
    const dbRef = ref(getDatabase());
    const [userAvatar,setUserAvatar] = useState("");
    const [userName,setUserName] = useState("");
    const {id} = useParams();
    useEffect(()=>{
        get(child(dbRef, `users/${commentData.userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUserAvatar(snapshot.val().profilePicture);
                setUserName(snapshot.val().nickname)
            }
        }).catch((error) => {
            console.error(error);
        });
    },[])
    function deleteCommentHandler(){
        let data = {};
        data["isDeleted"] = true;
        const db = ref(getDatabase());
        update(child(db, `posts/${id}/comments/${commentData.id}`),data).then(()=>{
            commentData.setIsCommentDeletedFunc(true);
        });
    }
    function RenderDeleteBtn(){
        if(commentData.userId === localStorage.getItem("userId") || JSON.parse(localStorage.getItem("isAdmin"))){
            return(
                <>
                <button className={styles.delete_btn} onClick={deleteCommentHandler}>Удалить</button>
                </>
            )
        }
    }

    return(
        <>
            {
                !commentData.isDeleted?
                    <div className={styles.comment_wrapper}>
                        <div className={styles.comment_info}>
                            <Link to={"/profile/" + commentData.userId}>
                                <div className={styles.wrap}>
                                    <img src={userAvatar} alt="" className={styles.user_avatar}/>
                                    <p className={styles.user_nickname}>{userName}</p>
                                </div>
                            </Link>
                            <p className={styles.comment_date}>{commentData.createDate}</p>
                        </div>
                        <p className={styles.comment_text}>{commentData.commentText}</p>
                        <RenderDeleteBtn/>
                    </div>
                    :""
            }
        </>
    )
}
export default Comment