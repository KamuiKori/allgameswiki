import styles from './style.module.css'

function Search() {
    return (
        <form id="search" className={styles.search_form}>
            <p className="form_title">Поиск</p>
            <input type="text" id="search_input" className={styles.search_input} placeholder="Введите запрос"/>
            <button className={styles.btn_search}>
                Найти
            </button>
        </form>
    )
}

export default Search