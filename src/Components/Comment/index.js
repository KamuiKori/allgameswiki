import styles from './styles.module.css'
import {Link} from "react-router-dom";

function Comment(commentData){
    return(
        <>
            <div className={styles.comment_wrapper}>
                <div className={styles.comment_info}>
                    <Link to={"/profile/" + commentData.userId}>
                        <div className={styles.wrap}>
                            <img src={commentData.userAvatar} alt="" className={styles.user_avatar}/>
                            <p className={styles.user_nickname}>{commentData.userNickname}</p>
                        </div>
                    </Link>
                    <p className={styles.comment_date}>{commentData.createDate}</p>
                </div>
                <p className={styles.comment_text}>{commentData.commentText}</p>
            </div>
        </>
    )
}
export default Comment