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
    const [loading,setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [postPerPage,setPostPerPage] = useState(5)
    function getPosts(){
        setLoading(true)
        get(child(dbRef, `posts/`)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = convertObjToArray(snapshot.val()).reverse();
                data = data.filter((post)=>!post.isDeleted)
                setPosts(data)
                setLoading(false)
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
    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = posts.slice(firstPostIndex, lastPostIndex)
    const paginate = pageNumber =>setCurrentPage(pageNumber)
    if(loading){
        return <>
            <img className="loader" src="https://firebasestorage.googleapis.com/v0/b/allgameswiki-b3ce4.appspot.com/o/postsPictures%2Floading.gif?alt=media&token=d1e259f2-cbcf-4633-ba85-20f004bcda7f" alt=""/>
        </>
    }
    return(
        <>
            <p className="page_title">Все материалы</p>
            {currentPost.map((item) => {
                    return (
                        <Post id={item.id} img={item.postPicture} text={item.text} name={item.name} key={item.id}/>
                    )
            })}
            <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginate={paginate}/>
            {/*<Pagination currentPage={currentPage} onChangePage={onChangePage}/>*/}
        </>
    )
}
export default AllPosts;