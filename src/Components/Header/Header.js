import React from "react";
import styles from './header.module.css'
import {Link} from "react-router-dom";


function Header(){
    return(
            <div className={styles.header}>
                <Link to="/">
                    <img src="https://sun9-22.userapi.com/impg/g7jbRCSmsuHZVI9jq6HWOjwi7K_VM880BWwEkQ/yWwtgQsb5XE.jpg?size=1760x558&quality=96&sign=396365ec7397553698cd6154f395967f&type=album" alt="" className={styles.logo}/>
                </Link>
                <div className={styles.header_links}>
                    <Link to="/regauth" className={styles.link}>Авторизация/регистрация</Link>
                    <Link to="/create_new" className={styles.link}>Создание</Link>
                    <Link to="/profile" className={styles.link}>Профиль</Link>
                    <Link to="/categories" className={styles.link}>Категории</Link>
                    <Link to="/search" className={styles.link}>Поиск</Link>
                </div>
            </div>
    )
}

export default Header