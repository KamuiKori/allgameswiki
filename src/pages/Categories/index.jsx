import styles from './style.module.css'
import {useNavigate} from "react-router-dom";
import CategoryItem from "../../Components/CategoryItem";
function Categories({categories}){
    const navigate = useNavigate();

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
        </>
    )
}
export default Categories