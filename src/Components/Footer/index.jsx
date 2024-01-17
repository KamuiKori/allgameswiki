import styles from './styles.module.css'
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useAuth} from "../../hooks/use-auth";
import {useDispatch} from "react-redux";
import {removeUser} from "../../store/slices/userSlice";

function Footer() {

    function scrollTop() {
        window.scroll({top: 0, behavior: "smooth"});
    }

    const {isAuth, email} = useAuth();
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(localStorage.getItem('userId'))

    function logOutHandler() {
        dispatch(removeUser())
        setUserId("");
        localStorage.removeItem('userId');
    }

    function SetBtns() {
        if (isAuth) {
            return (
                <>
                    <Link to="/" className={styles.link} onClick={logOutHandler}>Выйти</Link>
                    <Link to="/create_new" className={styles.link}>Создание</Link>
                    <Link to={"/profile/" + userId} className={styles.link}>Профиль</Link>
                </>
            )
        } else {
            return (
                <>
                    <Link to="/reg" className={styles.link}>Регистрация</Link>
                    <Link to="/auth" className={styles.link}>Авторизация</Link>
                </>
            )
        }
    }

    return (
        <>
            <div className={styles.footer_wrapper}>
                <div className={styles.left_side}>
                    <div className={styles.footer_links}>
                        <SetBtns/>
                        <Link to="/categories" className={styles.link}>Категории</Link>
                        <Link to="/search" className={styles.link}>Поиск</Link>
                    </div>
                    <p className={styles.copyrights}>
                        © 2024 All Games Wiki. Все права защищены.<br/>Перепечатка и любое использование материалов
                        возможно только при наличии ссылок на первоисточник
                    </p>
                </div>
                <div className={styles.right_side}>
                    <button className={styles.scroll_back} onClick={scrollTop} type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clipPath="url(#clip0_607_68)">
                                <path
                                    d="M0.266304 13.9026L9.35745 4.81165C9.52788 4.64117 9.75915 4.54541 10.0002 4.54541C10.2414 4.54541 10.4726 4.64123 10.6431 4.81171L19.7338 13.9026C20.0888 14.2577 20.0888 14.8332 19.7338 15.1883C19.3788 15.5432 18.8032 15.5433 18.4481 15.1883L10.0002 6.7402L1.55194 15.1883C1.37442 15.3658 1.14176 15.4545 0.909091 15.4545C0.676425 15.4545 0.443758 15.3658 0.266243 15.1882C-0.0887266 14.8332 -0.0887262 14.2576 0.266304 13.9026Z"
                                    fill="white" stroke="white" strokeWidth="0.606061"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_607_68">
                                    <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 1 20 0)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Footer