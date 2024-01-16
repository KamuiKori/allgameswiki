import styles from './styles.module.css'
import {useState} from "react";
import {useParams} from "react-router-dom";
import {child, get, getDatabase, ref, set,update} from "firebase/database";
import {useSelector} from "react-redux";
function CreateComment(props){

    return(
        <>
            <div className={styles.create_comment_wrapper}>
                <p className={styles.title}>
                    Оставить комментарий
                </p>
                <textarea className={styles.comment_text} placeholder="Текст комментария" onChange={(e)=>props.onChangeCommentText(e)} value={props.comment}></textarea>
                <button className={styles.btn} onClick={(e)=>props.createCommentHandler(e)}>Оставить комментарий</button>
            </div>
        </>
    )
}
export default CreateComment;