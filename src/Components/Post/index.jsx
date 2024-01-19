import styles from './styles.module.css'
import {Link} from "react-router-dom";

function Post(props) {
    return (
        <Link to={/posts/ + props.id} className={styles.post_wrapper}>
            <img src={props.img} alt="" className={styles.post_picture}/>
            <div className={styles.post_text_wrapper}>
                <p className={styles.post_title}>
                    {props.name}
                </p>
                <p className={styles.post_text}>
                    {props.text.split(" ").slice(0,200).join(" ") + " ..."}
                </p>
            </div>
        </Link>
    )
}

export default Post