import styles from './style.module.css'
import {child, get, getDatabase, ref} from "firebase/database";
import {useEffect, useState} from "react";
import Post from "../../Components/Post";
import ReactPaginate from 'react-paginate';
import convertObjToArray from "../../hooks/convertObjToArray";
import Pagination from "../../Components/Pagination";
function AllPosts(){
    const dbRef = ref(getDatabase());
    const [posts,setPosts] = useState([]);
    function getPosts(){
        get(child(dbRef, `posts/`)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = convertObjToArray(snapshot.val()).reverse();
                setPosts(data)
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
    return(
        <>
            <p className="page_title">Все материалы</p>
            {posts.map((item) => {
                if(!item.isDeleted){
                    return (
                        <Post id={item.id} img={item.postPicture} text={item.text} name={item.name} key={item.id}/>
                    )
                }
            })}
            {/*<Pagination currentPage={currentPage} onChangePage={onChangePage}/>*/}
        </>
    )
}
export default AllPosts;