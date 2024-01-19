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
import Category from "../pages/Category";
import SearchResults from "../pages/SearchResults";
import AllPosts from "../pages/AllPosts";

export  const  PATHS = {
    MAIN:'/',
    CATEGORIES:'/categories',
    CREATENEW:'/create_new',
    POSTS:'/posts',
    NESTED_POST:'/posts/:id',
    CATEGORY:'/categories/:id',
    PROFILE:'/profile/:id',
    REG:'/reg',
    SEARCH:"/search",
    AUTH:'/auth',
    SEARCH_RESULTS:'/search-results/search/:searchValue',
    ALL_POSTS:'/all_posts',
}

export const router = (data) =>(
    <Routes>
        <Route path={PATHS.MAIN} element={<Homepage/>}/>
        <Route path={PATHS.CATEGORIES} element={<Categories categories={data.categories}/>}/>
        <Route path={PATHS.CREATENEW} element={<CreateNew categories={data.categories}/>}/>
        <Route path={PATHS.POSTS} element={<Posts/>}/>
        <Route path={PATHS.NESTED_POST} element={<FullPost/>}/>
        <Route path={PATHS.PROFILE} element={<Profile/>}/>
        <Route path={PATHS.AUTH} element={<Auth/>}/>
        <Route path={PATHS.REG} element={<Reg/>}/>
        <Route path={PATHS.SEARCH} element={<Search/>}/>
        <Route path={PATHS.CATEGORY} element={<Category/>}/>
        <Route path={PATHS.SEARCH_RESULTS} element={<SearchResults/>}/>
        <Route path={PATHS.ALL_POSTS} element={<AllPosts/>}/>
    </Routes>
)