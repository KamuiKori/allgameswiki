import logo from './logo.svg';
import './App.css';
import Header from "./Components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import {router} from "./router";
import Footer from "./Components/Footer";
import {useEffect, useState} from "react";
import {child, get, getDatabase, ref} from "firebase/database";
import {useDispatch} from "react-redux";
import {setUserInfo} from "./store/slices/userSlice";


function App() {
    const [posts, setPosts] = useState([]);
    const [isLoadingPosts,setIsLoadingPosts] = useState(false)
    const [isErrorLoading,setIsLoadingError] = useState(false);

    const [categories,setCategories] = useState([]);
    let cats = [];
    const dbRef = ref(getDatabase());
    const dispatch = useDispatch();

    useEffect(()=>{
        if(localStorage.getItem('userId')){
            get(child(dbRef, `users/${localStorage.getItem('userId')}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(setUserInfo({
                        "nickname": snapshot.val().nickname,
                        "info": snapshot.val().info,
                        "avatar": snapshot.val().profilePicture,
                        "email": snapshot.val().email,
                        "id": localStorage.getItem('userId'),
                    }));
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        get(child(dbRef, `categories/`)).then((snapshot) => {
            if (snapshot.exists()) {
                if(cats.length === 0){
                    for(let key in snapshot.val()){
                        let link = snapshot.val()[key].link
                        let name = snapshot.val()[key].id
                        cats.push({"id":name,"link":link})
                    }
                    setCategories(cats)
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    },[])

    const data = {
        categories:categories
    }

  return (
      <BrowserRouter>
          <div className="wrapper">
              <Header/>
              <div className="content">
                  {router(data)}
              </div>
              <Footer/>
          </div>
      </BrowserRouter>
  );
}

export default App;
