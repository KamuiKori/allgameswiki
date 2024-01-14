import styles from './style.module.css'
import Post from "../../Components/Post";
import {getDatabase, ref, child, get,update} from "firebase/database";
import { ref as sRef } from 'firebase/storage';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUserInfo} from "../../store/slices/userSlice";
import { getStorage, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";


function Profile() {
    const userId = localStorage.getItem("userId");
    const dbRef = ref(getDatabase());
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editUserAvatar, setEditUserAvatar] = useState();
    const [nickname, setNickname] = useState();
    const [userInfoState, setUserInfoState] = useState();
    const storage = getStorage();

        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(setUserInfo({
                    "nickname": snapshot.val().nickname,
                    "info": snapshot.val().info,
                    "avatar": snapshot.val().profilePicture,
                    "email": snapshot.val().email,
                    "id": snapshot.val().id,
                }));
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });


    function editProfileHandler(direction) {
        if (direction === "edit") {
            setIsEditing(true);
        } else if (direction === "cancel") {
            setIsEditing(false);
        }
    }

    function saveInfoHandler() {
        const avatarName = editUserAvatar.name.split(".")[0]
        const storageRef = sRef(storage, 'userAvatars/'+ userId + "/" + avatarName);
        const uploadTask = uploadBytesResumable(storageRef, editUserAvatar);
        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.error(error.code)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    writeUserDataToDatabase(downloadURL)
                    setIsEditing(false);
                });
            }
        );
    }

    function writeUserDataToDatabase(downloadURL){
        update(child(dbRef, `users/${userId}`),{"profilePicture":downloadURL}).then((e)=>console.log(e))
    }

    function avatarChangeHandler(e) {
        setEditUserAvatar(e.target.files[0])
    }

    function changeNicknameHandler(e) {
        setNickname(e.target.value)
    }
    function changeUserinfoHandler(e){
        setUserInfoState(e.target.value)
    }


    const posts = [
        {
            link: "#",
            img: "https://sun9-70.userapi.com/impg/gT-yrtQ5ixa88VjO-IOSVCjBi5P6kJGu2ADWtw/Yf1SYngM9ik.jpg?size=780x439&quality=96&sign=e263c3763b0fd36d9ac4a8dec5226df0&type=album",
            title: "Заголовок",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas feugiat. Etiam et elit nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam vulputate velit nec finibus porttitor. Pellentesque non libero sed orci ornare tempor. Etiam volutpat egestas arcu in dictum. Phasellus a eros nulla. Maecenas sit amet posuere ante. Donec auctor nunc et dignissim pharetra. Nulla facilisi. Suspendisse potenti. Nunc suscipit tincidunt mattis.\n" +
                "Duis molestie egestas pellentesque. Vivamus malesuada, ligula dapibus facilisis solli"
        },
        {
            link: "#",
            img: "https://sun9-70.userapi.com/impg/gT-yrtQ5ixa88VjO-IOSVCjBi5P6kJGu2ADWtw/Yf1SYngM9ik.jpg?size=780x439&quality=96&sign=e263c3763b0fd36d9ac4a8dec5226df0&type=album",
            title: "Заголовок",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas feugiat. Etiam et elit nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam vulputate velit nec finibus porttitor. Pellentesque non libero sed orci ornare tempor. Etiam volutpat egestas arcu in dictum. Phasellus a eros nulla. Maecenas sit amet posuere ante. Donec auctor nunc et dignissim pharetra. Nulla facilisi. Suspendisse potenti. Nunc suscipit tincidunt mattis.\n" +
                "Duis molestie egestas pellentesque. Vivamus malesuada, ligula dapibus facilisis solli"
        },
        {
            link: "#",
            img: "https://sun9-70.userapi.com/impg/gT-yrtQ5ixa88VjO-IOSVCjBi5P6kJGu2ADWtw/Yf1SYngM9ik.jpg?size=780x439&quality=96&sign=e263c3763b0fd36d9ac4a8dec5226df0&type=album",
            title: "Заголовок",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus egestas feugiat. Etiam et elit nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam vulputate velit nec finibus porttitor. Pellentesque non libero sed orci ornare tempor. Etiam volutpat egestas arcu in dictum. Phasellus a eros nulla. Maecenas sit amet posuere ante. Donec auctor nunc et dignissim pharetra. Nulla facilisi. Suspendisse potenti. Nunc suscipit tincidunt mattis.\n" +
                "Duis molestie egestas pellentesque. Vivamus malesuada, ligula dapibus facilisis solli"
        },
    ]
    return (
        <>
            <div className={styles.user_info_wrap}>
                <div className={styles.side_block}>
                    {
                        !isEditing ? <img src={user.avatar} alt="" id="avatar" className={styles.profile_pic}/> :
                            <input type="file" className={styles.profile_pic_input}
                                   onChange={(e) => avatarChangeHandler(e)} accept=".jpg, .jpeg, .png"/>
                    }
                    {
                        !isEditing ?
                            <button className={styles.edit} onClick={() => editProfileHandler("edit")}>Редактировать
                                профиль</button> :
                            <div className={styles.editing_btns}>
                                <button className={styles.edit_btn} onClick={saveInfoHandler}>Сохранить</button>
                                <button className={styles.edit_btn}
                                        onClick={() => editProfileHandler("cancel")}>Отменить
                                </button>
                            </div>
                    }

                </div>
                <div className={styles.user_info}>
                    {!isEditing ? <p className={styles.user_name}>{user.nickname}</p> :
                        <input type="text" name="user_nickname" className={styles.user_nickname_input} value={nickname}
                               onChange={(e) => changeNicknameHandler(e)}/>}
                    <p className={styles.descr}>
                        Описание профиля:
                    </p>
                    {!isEditing ? <p className={styles.user_text}>{user.info}</p> :
                        <textarea type="text" name="user_info" className={styles.user_info_input} value={userInfoState}
                                  onChange={(e)=>changeUserinfoHandler(e)}/>}
                </div>
            </div>
            <p className={styles.user_mat_title}>Материалы пользователя</p>
            <div className={styles.user_posts}>
                {posts.map((item) => {
                    return (
                        <Post link={item.link} img={item.img} text={item.text} title={item.title}/>
                    )
                })}
            </div>
        </>
    )
}

export default Profile