import Posts from "../pages/Posts";
import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Login from '../pages/Login';

export const privateRoutes = [
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/posts/:id",
    name: "PostIdPage",
    component: PostIdPage,
  },
];

export const publicRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];