import styles from './style.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Post from "../../Components/Post";
import Footer from "../../Components/Footer";

function Homepage() {
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

    const posts = [
        {
            link:"#",
            img:"https://sun9-70.userapi.com/impg/gT-yrtQ5ixa88VjO-IOSVCjBi5P6kJGu2ADWtw/Yf1SYngM9ik.jpg?size=780x439&quality=96&sign=e263c3763b0fd36d9ac4a8dec5226df0&type=album",
            title:"Заголовок",
            text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas feugiat. Etiam et elit nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam vulputate velit nec finibus porttitor. Pellentesque non libero sed orci ornare tempor. Etiam volutpat egestas arcu in dictum. Phasellus a eros nulla. Maecenas sit amet posuere ante. Donec auctor nunc et dignissim pharetra. Nulla facilisi. Suspendisse potenti. Nunc suscipit tincidunt mattis.\n" +
                "Duis molestie egestas pellentesque. Vivamus malesuada, ligula dapibus facilisis solli"
        },
        {
            link:"#",
            img:"https://sun9-70.userapi.com/impg/gT-yrtQ5ixa88VjO-IOSVCjBi5P6kJGu2ADWtw/Yf1SYngM9ik.jpg?size=780x439&quality=96&sign=e263c3763b0fd36d9ac4a8dec5226df0&type=album",
            title:"Заголовок",
            text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas feugiat. Etiam et elit nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam vulputate velit nec finibus porttitor. Pellentesque non libero sed orci ornare tempor. Etiam volutpat egestas arcu in dictum. Phasellus a eros nulla. Maecenas sit amet posuere ante. Donec auctor nunc et dignissim pharetra. Nulla facilisi. Suspendisse potenti. Nunc suscipit tincidunt mattis.\n" +
                "Duis molestie egestas pellentesque. Vivamus malesuada, ligula dapibus facilisis solli"
        },
        {
            link:"#",
            img:"https://sun9-70.userapi.com/impg/gT-yrtQ5ixa88VjO-IOSVCjBi5P6kJGu2ADWtw/Yf1SYngM9ik.jpg?size=780x439&quality=96&sign=e263c3763b0fd36d9ac4a8dec5226df0&type=album",
            title:"Заголовок",
            text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas feugiat. Etiam et elit nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam vulputate velit nec finibus porttitor. Pellentesque non libero sed orci ornare tempor. Etiam volutpat egestas arcu in dictum. Phasellus a eros nulla. Maecenas sit amet posuere ante. Donec auctor nunc et dignissim pharetra. Nulla facilisi. Suspendisse potenti. Nunc suscipit tincidunt mattis.\n" +
                "Duis molestie egestas pellentesque. Vivamus malesuada, ligula dapibus facilisis solli"
        },
    ]
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
                {posts.map((item)=>{
                    return(
                        <Post link={item.link} img={item.img} text={item.text} title={item.title}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Homepage