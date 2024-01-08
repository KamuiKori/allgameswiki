import {Route,Routes} from "react-router-dom";
import Homepage from "../pages/Homepage";
import Categories from "../pages/Categories";
import CreateNew from "../pages/CreateNew";
import Posts from "../pages/Posts";
import FullPost from "../Components/FullPost";
import Profile from "../pages/Profile";
import RegAuth from "../pages/RegAuth";
import Search from "../pages/Search";
import EmptyPost from "../Components/EmptyPost";

export  const  PATHS = {
    MAIN:'/',
    CATEGORIES:'/categories',
    CREATENEW:'/create_new',
    POSTS:'/posts',
    NESTED_POST:'/posts:id',
    PROFILE:'/profile',
    REGAUTH:'/regauth',
    SEARCH:"/search"
}

export const router = () =>(
    <Routes>
        <Route path={PATHS.MAIN} element={<Homepage/>}/>
        <Route path={PATHS.CATEGORIES} element={<Categories/>}/>
        <Route path={PATHS.CREATENEW} element={<CreateNew/>}/>
        <Route path={PATHS.POSTS} element={<Posts/>}/>
        <Route path={PATHS.NESTED_POST} element={<EmptyPost/>}/>
        <Route path={PATHS.PROFILE} element={<Profile/>}/>
        <Route path={PATHS.REGAUTH} element={<RegAuth/>}/>
        <Route path={PATHS.SEARCH} element={<Search/>}/>
    </Routes>
)