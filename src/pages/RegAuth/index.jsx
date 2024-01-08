import styles from './style.module.css'
function RegAuth(){
    return(
        <div className={styles.wrap}>
            <div className={styles.regauth_wrapper}>
                <form>
                    <p className={styles.form_title}>
                        Регистрация/авторизация
                    </p>
                        <input type="text" name="nickname" placeholder="Никнейм"/>
                        <input type="text" name="nickname" placeholder="Пароль"/>
                    <button className={styles.submit_btn}>
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    )
}
export default RegAuth