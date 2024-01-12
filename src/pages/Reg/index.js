import styles from './style.module.css'
import {useDispatch} from "react-redux";
import {setUser} from "../../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, set,ref } from "firebase/database";

function Reg() {
    const [nickname,setNickname] = useState('');
    const [password,setPassword] = useState('');
    const [userInfo,setUserInfo] = useState('');
    const [avatar,setUserAvatar] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function writeUserData(userId, email) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            id:userId,
            email: email,
            nickname:"",
            info:"",
            profilePicture:"https://sun9-43.userapi.com/impg/BwgB6HGhSb9QFMM3JuL4Ws_HaLoHbKZSi0Rs0g/sOhV0NLsSsM.jpg?size=295x295&quality=96&sign=f315d8710f3195fc3950cbbfc6448da5&type=album"
        });
    }

    function clickHandler(e){
        e.preventDefault();
        if(nickname && password){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, nickname, password)
                .then(({user})=>{
                    dispatch(setUser({
                        email:user.email,
                        id:user.uid,
                        token:user.accessToken
                    }));
                    localStorage.setItem("userId",user.uid);
                    writeUserData(user.uid,user.email)
                    navigate('/')
                })
                .catch(console.error)
        }
    }

    return (
        <div className="wrap">
            <div className="regauth_wrapper">
                <form>
                    <p className="form_title">
                        Регистрация
                    </p>
                    <div className="input_wrap">
                        <p className={styles.input_title}>
                            Email
                        </p>
                        <input type="email" name="email" placeholder="Email" onChange={(e) =>setNickname(e.target.value)} value={nickname}/>
                    </div>
                    <div className="input_wrap">
                        <p className={styles.input_title}>
                            Пароль
                        </p>
                        <input type="password" name="nickname" placeholder="Пароль" onChange={(e) =>setPassword(e.target.value)} value={password}/>
                    </div>
                    <div className="input_wrap">
                        <p className={styles.input_title}>
                            Описание профиля
                        </p>
                        <textarea className={styles.user_info} placeholder="Описание профиля" value={userInfo} onChange={(e) =>setUserInfo(e.target.value)}></textarea>
                    </div>
                    <div className="input_wrap">
                        <p className={styles.input_title}>
                            Аватар
                        </p>
                        <input type="file" placeholder="Аватар" accept="image/*" id="avatar" value={avatar} className={styles.avatar} onChange={(e) =>setUserAvatar(e.target.value)}/>
                    </div>
                    <button className="submit_btn" onClick={(e)=>clickHandler(e)}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Reg