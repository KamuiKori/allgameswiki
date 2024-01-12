import {Route,Routes} from "react-router-dom";
import Homepage from "../pages/Homepage";
import Categories from "../pages/Categories";
import CreateNew from "../pages/CreateNew";
import Posts from "../pages/Posts";
import FullPost from "../pages/FullPost";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import EmptyPost from "../Components/EmptyPost";
import Auth from "../pages/Auth";
import Reg from "../pages/Reg";

export  const  PATHS = {
    MAIN:'/',
    CATEGORIES:'/categories',
    CREATENEW:'/create_new',
    POSTS:'/posts',
    NESTED_POST:'/posts/:id',
    PROFILE:'/profile',
    REG:'/reg',
    SEARCH:"/search",
    AUTH:'/auth'
}

export const router = () =>(
    <Routes>
        <Route path={PATHS.MAIN} element={<Homepage/>}/>
        <Route path={PATHS.CATEGORIES} element={<Categories/>}/>
        <Route path={PATHS.CREATENEW} element={<CreateNew/>}/>
        <Route path={PATHS.POSTS} element={<Posts/>}/>
        <Route path={PATHS.NESTED_POST} element={<FullPost/>}/>
        <Route path={PATHS.PROFILE} element={<Profile/>}/>
        <Route path={PATHS.AUTH} element={<Auth/>}/>
        <Route path={PATHS.REG} element={<Reg/>}/>
        <Route path={PATHS.SEARCH} element={<Search/>}/>
    </Routes>
)