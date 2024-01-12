import styles from './style.module.css'
import {Link} from "react-router-dom";
function CategoryItem(props){
    return(
        <>
            <Link to={props.link} className={styles.category_item}>{props.name}</Link>
        </>
    )
}
export default CategoryItem