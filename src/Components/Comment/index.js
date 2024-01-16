import styles from './styles.module.css'
function Comment(commentData){
    return(
        <>
            <div className={styles.comment_wrapper}>
                <div className={styles.comment_info}>
                    <div className={styles.wrap}>
                        <img src={commentData.userAvatar} alt="" className={styles.user_avatar}/>
                        <p className={styles.user_nickname}>{commentData.userNickname}</p>
                    </div>
                    <p className={styles.comment_date}>{commentData.createDate}</p>
                </div>
                <p className={styles.comment_text}>{commentData.commentText}</p>
            </div>
        </>
    )
}
export default Comment