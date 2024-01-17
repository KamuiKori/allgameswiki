import styles from './style.module.css'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";

function Auth(){
    const [nickname,setNickname] = useState('');
    const [password,setPassword] = useState('');
    const [isError,setIsError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function clickHandler(nickname,password,e){
        const auth = getAuth();
        signInWithEmailAndPassword(auth,nickname,password)
            .then(({user})=>{
                dispatch(setUser({
                    email:user.email,
                    id:user.uid,
                    token:user.accessToken,
                }));
                localStorage.setItem('userId',user.uid);
                navigate('/');
            })
            .catch(()=>{
                setIsError(true);
            })
        e.preventDefault()
    }

    function ShowErrorMessage(){
        if(isError){
            return(
                <p className="error_message">Ошибка: Логин и/или пароль не совпадают</p>
            )
        }
    }

    return(
        <div className={styles.wrap}>
            <div className={styles.regauth_wrapper}>
                <form>
                    <p className="form_title">
                        Авторизация
                    </p>
                        <input type="text" name="nickname" placeholder="Никнейм" value={nickname} onChange={(e) =>setNickname(e.target.value)}/>
                        <input type="password" name="nickname" placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    {<ShowErrorMessage/>}
                    <button className="submit_btn" onClick={(e)=>clickHandler(nickname,password,e)}>
                        Авторизоваться
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Auth