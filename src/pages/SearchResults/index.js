import {useParams} from "react-router-dom";
import styles from './styles.module.css'
import {useEffect, useState} from "react";
import {child, get, getDatabase, ref} from "firebase/database";
import post from "../../Components/Post";
import Post from "../../Components/Post";
import convertObjToArray from "../../hooks/convertObjToArray";
function SearchResults(){
    const {searchValue} = useParams();
    const [posts,setPosts] = useState([]);
    const dbRef = ref(getDatabase());

    function getPosts(){
        get(child(dbRef, `posts/`)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = convertObjToArray(snapshot.val());
                let filteredPosts = [];
                data.forEach(function (post){
                    if(post.text.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || post.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1){
                        filteredPosts.push(post)
                    }
                })
                setPosts(filteredPosts)
            } else {
                setPosts([])
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    useEffect(()=>{
        getPosts();
    },[])
    function PostsNotFound(){
        if(posts.length === 0){
            return(
                <p className="page_subtitle">Ничего не найдено</p>
            )
        }
    }

    return(
        <>
            <p className="page_title">Результаты поиска по запросу: {searchValue}</p>
            {
                posts.map((item)=>{
                    if(!item.isDeleted){
                        return (
                            <Post id={item.id} img={item.postPicture} text={item.text} name={item.name} key={item.id}/>
                        )
                    }
                })
            }
            {
                <PostsNotFound/>
            }
        </>
    )
}
export default SearchResults