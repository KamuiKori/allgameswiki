import styles from './style.module.css'
import {useState} from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import {logDOM} from "@testing-library/react";

function Search() {
    const[searchValue,setSearchValue] = useState("");
    const[isError,setIsError] = useState(false);
    const navigate = useNavigate();
    function searchOnChangeHandler(e){
        setSearchValue(e.target.value)
    }
    function searchHandler(e){
        e.preventDefault();
        if(searchValue){
            navigate('/search-results/search/' + searchValue)
        }
        else{
            setIsError(true)
        }
    }
    function ShowErrorMessage(){
        if(isError){
            return(
                <>
                    <p className="error_message">Ошибка: поле поиска должно быть заполнено</p>
                </>
            )
        }
    }
    return (
        <form id="search" className={styles.search_form}>
            <p className="form_title">Поиск</p>
            <input type="text" id="search_input" className={styles.search_input} placeholder="Введите запрос" value={searchValue} onChange={(e)=>searchOnChangeHandler(e)}/>
            <ShowErrorMessage/>
            <button className={styles.btn_search} onClick={(e)=>searchHandler(e)}>
                Найти
            </button>
        </form>
    )
}

export default Search