import React, {useState} from "react";
import styles from './header.module.css'
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";
import {useDispatch} from "react-redux";
import {removeUser} from "../../store/slices/userSlice";


function Header(){

    const {isAuth, email} = useAuth();
    const dispatch = useDispatch();
    const [userId,setUserId] = useState(localStorage.getItem('userId'))

    function logOutHandler(){
        dispatch(removeUser())
        setUserId("");
        localStorage.removeItem('userId');
    }
    function SetBtns(){
        if(isAuth){
            return(
                <>
                    <Link to="/" className={styles.link} onClick={logOutHandler}>Выйти</Link>
                    <Link to="/create_new" className={styles.link}>Создание</Link>
                    <Link to="/profile" className={styles.link}>Профиль</Link>
                </>
                )
        }
        else{
            return(
                <>
                    <Link to="/reg" className={styles.link}>Регистрация</Link>
                    <Link to="/auth" className={styles.link}>Авторизация</Link>
                </>
            )
        }
    }

    return(
            <div className={styles.header}>
                <div className={styles.wrap}>
                    <Link to="/">
                        <img src="https://sun9-22.userapi.com/impg/g7jbRCSmsuHZVI9jq6HWOjwi7K_VM880BWwEkQ/yWwtgQsb5XE.jpg?size=1760x558&quality=96&sign=396365ec7397553698cd6154f395967f&type=album" alt="" className={styles.logo}/>
                    </Link>
                    <div className={styles.header_links}>
                        <SetBtns/>
                        <Link to="/categories" className={styles.link}>Категории</Link>
                        <Link to="/search" className={styles.link}>Поиск</Link>
                    </div>
                </div>
            </div>
    )
}

export default Header