import styles from './style.module.css'
function CreateNew(){
    return(
        <>
            <div className={styles.create_new_form_wrap}>
                <form action="" className={styles.create_new_form}>
                    <p className={styles.form_title}>
                        Создание материала
                    </p>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>
                            Название материала
                        </p>
                        <input type="text" name="name" className={styles.input} id="name"/>
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>
                            Заголовок материала
                        </p>
                        <input type="text" name="name" className={styles.input} id="title"/>
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>
                            Текст материала
                        </p>
                        <textarea name="materialText" className={styles.textarea} id="materialText"></textarea>
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>
                            Выбор категории
                        </p>
                        <select name="categories" id="categories" className={styles.select_input}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>
                            Картинка
                        </p>
                        <input type="file" name="picture" className={styles.input} id="picture" accept="image/*"/>
                    </div>
                    <button className="submit_btn">
                        Создать материал
                    </button>
                </form>
            </div>
        </>
    )
}
export default CreateNew