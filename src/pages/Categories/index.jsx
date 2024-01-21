import styles from './style.module.css'
import {useNavigate} from "react-router-dom";
import CategoryItem from "../../Components/CategoryItem";
import {useEffect, useState} from "react";
import {child, get, getDatabase, ref, set} from "firebase/database";
function Categories(){
    const navigate = useNavigate();
    const [isEditing,setIsEditing] = useState(false);
    const [catName,setCatName] = useState("");
    let cats = [];
    const dbRef = ref(getDatabase());
    const [categories,setCategories] = useState([]);
    const [isError,setIsError] = useState(false)

    function getCategories(){
        get(child(dbRef, `categories/`)).then((snapshot) => {
            if (snapshot.exists()) {
                if(cats.length === 0){
                    for(let key in snapshot.val()){
                        let link = snapshot.val()[key].link
                        let name = snapshot.val()[key].id
                        cats.push({"id":name,"link":link})
                    }
                    setCategories(cats)
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(()=>{
        getCategories();
    },[])
    function startEditHandler(){
        setIsEditing(true);
    }
    function addCategoryHandler(){
        if(catName){
            setIsError(false);
            let data = {
                id:catName,
                link:catName.replaceAll(" ","")
            }
            const db = ref(getDatabase());
            set(child(db, `categories/${data.link}`),data).then(()=>{
                let cats = categories;
                cats.push(data)
                setCategories(cats)
                setIsEditing(false);
                setCatName("")

            });
        }
        else{
            setIsError(true);
        }
    }
    function cancelHandler(){
        setIsEditing(false)
    }
    function onChangeCategoryName(e){
        setCatName(e.target.value);
    }

    function SetAddBtn(){
        if(JSON.parse(localStorage.getItem("isAdmin"))){
            return(
                <>
                    <button className={styles.add_cat_btn} onClick={startEditHandler}>Добавить категорию</button>
                </>
            )
        }
    }
    return(
        <>
            <p className={styles.page_title}>
                Категории
            </p>
            <div className={styles.categories_links}>
                {
                    categories.map((cat) =>{
                        return(
                            <CategoryItem link={cat.link} name={cat.id} key={cat.id}/>
                        )
                    })
                }
            </div>
            <SetAddBtn/>
            {
                isEditing?
                    <div className={styles.add_cat_wrap}>
                        <input type="text" onChange={(e)=>onChangeCategoryName(e)} value={catName} />
                        {
                            isError?<p className={styles.error_text}>Ошибка: все поля должны быть заполнены</p>:""
                        }
                        <div className={styles.buttons_wrapper}>
                            <button onClick={addCategoryHandler}>Добавить</button>
                            <button onClick={cancelHandler}>Отмена</button>
                        </div>

                    </div>
                    :""
            }
        </>
    )
}
export default Categories