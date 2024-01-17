import styles from './style.module.css'
import {useState} from "react";
import {child, get, getDatabase, ref, set} from "firebase/database";
import {useSelector} from "react-redux";
import {getDownloadURL, getStorage, ref as sRef, uploadBytesResumable} from "firebase/storage";
import {setUserInfo} from "../../store/slices/userSlice";
import {useNavigate} from "react-router-dom";
import createDateHook from "../../hooks/createDate";
function CreateNew({categories}){

    const [postName,setPostName] = useState("");
    const [postTitle,setPostTitle] = useState("");
    const [postText,setPostText] = useState("");
    const [postPicture,setPostPicture] = useState("");
    const [postCategory,setPostCategory] = useState("CS2");
    const user = useSelector((state) => state.user);
    const storage = getStorage();
    const navigate = useNavigate();
    let postId = "";
    function changePostNameHandler(e){
        setPostName(e.target.value)
    }
    function changePostTitleHandler(e){
        setPostTitle(e.target.value)
    }
    function changePostTextHandler(e){
        setPostText(e.target.value)
    }
    function changePostPicture(e){
        setPostPicture(e.target.files[0])
    }
    function changePostCategory(e){
        setPostCategory(e.target.value)
    }
    function submitHandler(e){
        e.preventDefault();
        let createDate = createDateHook()
        var data = {
            name: postName,
            title:postTitle,
            text:postText,
            category:postCategory.replaceAll(" ",""),
            userId:localStorage.getItem("userId"),
            authorNickname:user.nickname,
            createDate:createDate,
            comments:[],
        };
        saveInfoHandler(data);
    }
    function saveInfoHandler(data) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `posts/`)).then((snapshot) => {
            if (snapshot.exists()) {
                postId = Object.keys(snapshot.val()).length + 1
                data["id"] = postId
            } else {
                postId = 1
                data["id"] = postId
            }
        }).catch((error) => {
            console.error(error);
        });
        const postPictureName = postName + "picture"
        const storageRef = sRef(storage, 'postsPictures/' + postPictureName);
        const uploadTask = uploadBytesResumable(storageRef, postPicture);
        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.error(error.code)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    data["postPicture"] = downloadURL;
                    const db = ref(getDatabase());
                    set(child(db, `posts/${postId}`),data);
                }).then(()=>{
                    navigate(`/posts/${postId}`)
                });
            }
        );
    }

    return(
        <>
            <div className={styles.create_new_form_wrap}>
                <form action="" className={styles.create_new_form}>
                    <p className={styles.form_title}>
                        Создание материала
                    </p>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>
                            Название материала
                        </p>
                        <input type="text" name="name" required className={styles.input} id="name" onChange={(e)=>changePostNameHandler(e)} value={postName}/>
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>
                            Заголовок материала
                        </p>
                        <input type="text" name="title" required className={styles.input} id="title" onChange={(e)=>changePostTitleHandler(e)} value={postTitle}/>
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>
                            Текст материала
                        </p>
                        <textarea name="materialText" required className={styles.textarea} id="materialText" onChange={(e)=>changePostTextHandler(e)} value={postText}></textarea>
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>
                            Выбор категории
                        </p>
                        <select name="categories" required id="categories" className={styles.select_input} value={postCategory} onChange={(e)=>changePostCategory(e)}>
                            {
                                categories.map((category)=>{
                                    return(
                                        <option value={category.id} key={category.link}>{category.id}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>
                            Картинка
                        </p>
                        <input type="file" required name="picture" className={styles.input} id="picture" onChange={(e) => changePostPicture(e)} accept=".jpg, .jpeg, .png"/>
                    </div>
                    <button className="submit_btn" onClick={(e)=>submitHandler(e)}>
                        Создать материал
                    </button>
                </form>
            </div>
        </>
    )
}
export default CreateNew