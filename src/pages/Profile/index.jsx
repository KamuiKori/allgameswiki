import styles from './style.module.css'
import Post from "../../Components/Post";
import {getDatabase, ref, child, get,update} from "firebase/database";
import { ref as sRef } from 'firebase/storage';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUserInfo, setUserNickname,setUserDesc,setUserAvatar} from "../../store/slices/userSlice";
import { getStorage, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import convertObjToArray from "../../hooks/convertObjToArray";
import {useParams} from "react-router-dom";


function Profile() {
    //const userId = localStorage.getItem("userId");
    const dbRef = ref(getDatabase());
    //const user = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editUserAvatar, setEditUserAvatar] = useState(null);
    const [nickname, setNickname] = useState("");
    const [userInfoState, setUserInfoState] = useState("");
    const storage = getStorage();
    const userId = useParams().id;
    const [user, setUser] = useState({});
    const [editable,setEditable] = useState(true)
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true)
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUser(snapshot.val());
                setIsLoading(false);
                if(userId !== localStorage.getItem('userId')){
                    setEditable(false);
                }
                else{
                    setEditable(true)
                }
            } else {

            }
        }).catch((error) => {
            console.error(error);
        });
    },[userId,isEditing])

    function editProfileHandler(direction) {
        if (direction === "edit") {
            setIsEditing(true);
        } else if (direction === "cancel") {
            setIsEditing(false);
        }
    }

    function saveInfoHandler() {
        let data = {};

        if(user.nickname !== nickname && nickname !== ""){
            data["nickname"] = nickname;
            dispatch(setUserNickname({
                "nickname":nickname
            }))
        }
        if(user.info !== userInfoState && userInfoState !== ""){
            data["info"] = userInfoState;
            dispatch(setUserDesc({
                "info":userInfoState
            }))
        }
        writeUserDataToDatabase(data);
    }

    function writeUserDataToDatabase(data){
        if(editUserAvatar !== null){
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
                        data["profilePicture"] = downloadURL;
                        dispatch(setUserAvatar({
                            "avatar":downloadURL
                        }));
                        update(child(dbRef, `users/${userId}`),data).then((e)=>setIsEditing(false))
                    });
                }
            );
        }
        else{
            update(child(dbRef, `users/${userId}`),data).then((e)=>setIsEditing(false))
        }
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
    const [posts,setPosts] = useState([]);

    function getPosts(){
        setIsLoading(true)
        get(child(dbRef, `posts/`)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = convertObjToArray(snapshot.val());
                data = data.filter((post)=>post.userId.toString() === userId.toString()).reverse();
                setPosts(data)
                setIsLoading(false)
            } else {
                setPosts([])
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    useEffect(()=>{
        getPosts();
    },[userId])

    if (isLoading) {
        return <>
            <img className="loader"
                 src="https://firebasestorage.googleapis.com/v0/b/allgameswiki-b3ce4.appspot.com/o/postsPictures%2Floading.gif?alt=media&token=d1e259f2-cbcf-4633-ba85-20f004bcda7f"
                 alt=""/>
        </>
    }
    return (
        <>
            <div className={styles.user_info_wrap}>
                <div className={styles.side_block}>
                    {
                        !isEditing ? <img src={user.profilePicture} alt="" id="avatar" className={styles.profile_pic}/> :
                            <input type="file" className={styles.profile_pic_input}
                                   onChange={(e) => avatarChangeHandler(e)} accept=".jpg, .jpeg, .png"/>
                    }
                    {
                        !isEditing ?
                            editable?<button className={styles.edit} onClick={() => editProfileHandler("edit")}>Редактировать
                                профиль</button>:"" :
                            <div className={styles.editing_btns}>
                                <button className={styles.edit_btn} onClick={saveInfoHandler}>Сохранить</button>
                                <button className={styles.edit_btn}
                                        onClick={() => editProfileHandler("cancel")}>Отменить
                                </button>
                            </div>
                    }

                </div>
                <div className={styles.user_info}>
                    <p className={styles.role}>Роль: {user.isAdmin?"администратор":"пользователь"}</p>
                    {!isEditing ? <p className={styles.user_name}>{user.nickname}</p> :
                        <input type="text" name="user_nickname" className={styles.user_nickname_input} value={nickname} placeholder="Введи свой никнейм"
                               onChange={(e) => changeNicknameHandler(e)}/>}
                    <p className={styles.descr}>
                        Описание профиля:
                    </p>
                    {!isEditing ? <p className={styles.user_text}>{user.info}</p> :
                        <textarea type="text" name="user_info" className={styles.user_info_input} value={userInfoState} placeholder="Здесь описание твоего профиля"
                                  onChange={(e)=>changeUserinfoHandler(e)}/>}
                </div>
            </div>
            <p className={styles.user_mat_title}>Материалы пользователя</p>
            <div className={styles.user_posts}>
                {posts.map((item) => {
                    if(!item.isDeleted){
                        return (
                            <Post id={item.id} img={item.postPicture} text={item.text} name={item.name} key={item.id}/>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default Profile