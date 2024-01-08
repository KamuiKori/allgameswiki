import styles from './styles.module.css'

function Post(props) {
    return (
        <>
            <div className={styles.post_wrapper}>
                <a href={props.link} target="_blank">
                    <img src={props.img} alt=""/>
                </a>
                <div className={styles.post_text_wrapper}>
                    <a href={props.link} target="_blank" className={styles.post_link}>
                        <p className={styles.post_title}>
                            {props.title}
                        </p>
                    </a>
                    <p className={styles.post_text}>
                        {props.text}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Post