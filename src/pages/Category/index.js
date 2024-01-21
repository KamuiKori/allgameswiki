import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {child, get, getDatabase, ref} from "firebase/database";
import styles from "../Category/style.module.css";
import {setUserInfo} from "../../store/slices/userSlice";
import Post from "../../Components/Post";
import {logDOM} from "@testing-library/react";
import convertObjToArray from "../../hooks/convertObjToArray";

function Category() {
    const {id} = useParams();

    const dbRef = ref(getDatabase());
    const [filtredPosts, setFiltredPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function getPosts() {
        setIsLoading(true);
        get(child(dbRef, `posts/`)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = convertObjToArray(snapshot.val());
                var filtredPosts = data.filter((post) => post.category === id).reverse();
                setFiltredPosts(filtredPosts);
                setIsLoading(false);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const [categoryName, setCategoryName] = useState("");


    useEffect(() => {
        get(child(dbRef, `categories/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setCategoryName(snapshot.val().id)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    useEffect(() => {
        getPosts();
    }, [])

    if (isLoading) {
        return <>
            <img className="loader"
                 src="https://firebasestorage.googleapis.com/v0/b/allgameswiki-b3ce4.appspot.com/o/postsPictures%2Floading.gif?alt=media&token=d1e259f2-cbcf-4633-ba85-20f004bcda7f"
                 alt=""/>
        </>
    }

    return (
        <div className={styles.category_post_wrapper}>
            <p className="page_title">
                {
                    categoryName
                }
            </p>
            {
                filtredPosts.map((item) => {
                    if (!item.isDeleted) {
                        return (
                            <Post id={item.id} img={item.postPicture} text={item.text} name={item.name} key={item.id}/>
                        )
                    }
                })
            }
        </div>
    )
}

export default Category;