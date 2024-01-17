import styles from './style.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Post from "../../Components/Post";
import Footer from "../../Components/Footer";
import {useEffect, useState} from "react";
import {child, get, getDatabase, ref} from "firebase/database";

function Homepage() {
    const [posts,setPosts] = useState([]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000
    };
    const sliderItems = [
        {
            link: "#",
            img: "https://sun9-34.userapi.com/impg/FeUac2j2Qolxyw0ruXoG5wJAUHi57PJTYSt7Ww/ANyPtNmORno.jpg?size=1102x620&quality=96&sign=483dd193d27694b54dcdc2cad12275e2&type=album"
        },
        {
            link: "#",
            img: "https://sun9-34.userapi.com/impg/FeUac2j2Qolxyw0ruXoG5wJAUHi57PJTYSt7Ww/ANyPtNmORno.jpg?size=1102x620&quality=96&sign=483dd193d27694b54dcdc2cad12275e2&type=album"
        },
        {
            link: "#",
            img: "https://sun9-34.userapi.com/impg/FeUac2j2Qolxyw0ruXoG5wJAUHi57PJTYSt7Ww/ANyPtNmORno.jpg?size=1102x620&quality=96&sign=483dd193d27694b54dcdc2cad12275e2&type=album"
        },
    ]
    const dbRef = ref(getDatabase());

    function getPosts(){
        get(child(dbRef, `posts/`)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val().reverse().slice(0,3);
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
    return (
        <div className={styles.home_wrapper}>
            <div className={styles.slider_wrapper}>
                <Slider {...settings}>
                    {sliderItems.map((item) => {
                        return (
                            <a href={item.link} target="_blank">
                                <img src={item.img} alt=""/>
                            </a>
                        )
                    })}
                </Slider>
            </div>
            <div className={styles.newest_posts}>
                <p className="page_title">Последние посты</p>
                {posts.map((item)=>{
                    return(
                        <Post id={item.id} img={item.postPicture} text={item.text} title={item.title} key={item.id}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Homepage