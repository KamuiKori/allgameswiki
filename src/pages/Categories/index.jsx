import styles from './style.module.css'
import CategoryItem from "../../Components/CategoryItem";
function Categories(){

    const categories = [
        {
            id:"1",
            link:"#",
            name:"Escape from Tarkov"
        },
        {
            id:"2",
            link:"#",
            name:"Dota 2"
        },
        {
            id:"3",
            link:"#",
            name:"CS2"
        },
    ]

    return(
        <>
            <p className={styles.page_title}>
                Категории
            </p>
            <div className={styles.categories_links}>
                {
                    categories.map((category) =>{
                        return(
                            <CategoryItem link={category.link} name={category.name}/>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Categories