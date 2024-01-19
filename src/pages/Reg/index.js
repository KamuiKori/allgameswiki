import styles from './style.module.css'
import {useDispatch} from "react-redux";
import {setUser,setUserInfo} from "../../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, set,ref } from "firebase/database";

function Reg() {
    const [nickname,setNickname] = useState('');
    const [password,setPassword] = useState('');
    const [avatar,setUserAvatar] = useState('');
    const [isError,setIsError] = useState(false);
    const [errorText,setErrorText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function writeUserData(userId, email) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            id:userId,
            email: email,
            nickname:"Пользователь №" + userId,
            info:"Описание профиля",
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
                    localStorage.setItem("isAdmin",false.toString());
                    dispatch(setUserInfo(
                        {
                            nickname:"Пользователь №" + user.uid,
                            info : "Описание профиля",
                            avatar:'https://sun9-43.userapi.com/impg/BwgB6HGhSb9QFMM3JuL4Ws_HaLoHbKZSi0Rs0g/sOhV0NLsSsM.jpg?size=295x295&quality=96&sign=f315d8710f3195fc3950cbbfc6448da5&type=album',
                            id:user.uid,
                            email:user.email,
                            isAdmin:false
                        }
                    ))
                    writeUserData(user.uid,user.email)
                    navigate('/')
                })
                .catch((error)=> {
                    setIsError(true);
                    let errorText = "";
                    if(error.code === "auth/invalid-email"){
                        setErrorText("Email должен содержать @ и доменное имя")
                    }
                    if(error.code === "auth/weak-password"){
                        setErrorText("Длинна пароля должна быть более 5 символов")
                    }
                    if(error.code === "auth/email-already-in-use"){
                        setErrorText("Пользователь с таким email уже зарегистрирован")
                    }
                })
        }
    }

    function ShowErrorMessage(props){
        if(isError){
            return(
                <>
                    <p className="error_message">Ошибка: {props.text}</p>
                </>
            )
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
                    <ShowErrorMessage text={errorText}/>
                    <button className="submit_btn" onClick={(e)=>clickHandler(e)}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Reg