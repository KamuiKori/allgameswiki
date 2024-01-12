import {useSelector} from "react-redux";

export function useAuth(){
    const {email,id} = useSelector(state => state.user);
    if(localStorage.getItem('userId')){
        return {
            isAuth: !!localStorage.getItem('userId'),
            email,
            id
        }
    }
    else{
        return {
            isAuth: !!localStorage.getItem('userId'),
            email,
            id
        }
    }
}