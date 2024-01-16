import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {child, get, getDatabase, ref} from "firebase/database";
import styles from "../Categories/style.module.css";

function Category(){
    const {id} = useParams();

    const dbRef = ref(getDatabase());
    const [categoryName,setCategoryName] = useState("");

    useEffect(()=>{
        get(child(dbRef, `categories/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setCategoryName(snapshot.val().id)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    },[]);
    return(
        <>
            <p className={styles.page_title}>
                {categoryName}
            </p>
        </>
    )
}
export default Category;