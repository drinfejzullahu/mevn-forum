import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "../components/mainpage/MainPage.vue";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import AddAPost from "../components/post/AddAPost";
import Profile from "../components/profile/Profile";
import AddARoom from "../components/room/AddARoom";
import UniquePost from "../components/post/UniquePost";
import UniqueRoom from "../components/room/UniqueRoom";
import EditPost from "../components/post/EditPost";
import Users from "../components/user/Users";
import { state } from "../store/modules/users";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: MainPage, name: "MainPage" },
  {
    path: "/login",
    component: Login,
    name: "Login",
    beforeEnter: (to, from, next) => {
      if (state.userData !== null) {
        next("/");
      } else next();
    }
  },
  { path: "/signup", component: SignUp, name: "Signup" },
  {
    path: "/addapost",
    component: AddAPost,
    name: "AddPost",
    beforeEnter: (to, from, next) => {
      if (state.userData === null) {
        next("/login");
      } else next();
    }
  },
  {
    path: "/profile",
    component: Profile,
    name: "Profile",
    beforeEnter: (to, from, next) => {
      if (state.userData === null) {
        next("/login");
      } else next();
    }
  },
  {
    path: "/addaroom",
    component: AddARoom,
    name: "AddRoom",
    beforeEnter: (to, from, next) => {
      if (state.userData === null) {
        next("/login");
      } else next();
    }
  },
  {
    path: "/userslist",
    component: Users,
    name: "Users",
    beforeEnter: (to, from, next) => {
      console.log(state.userData);
      if (state.userData !== "admin@gmail.com") {
        next("/");
      } else next();
    }
  },
  { path: "/post/:id", component: UniquePost, name: "UniquePost" },
  { path: "/room/:id", component: UniqueRoom, name: "UniqueRoom" },
  { path: "/editpost/:id", component: EditPost, name: "EditPost" }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
