import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import posts from "./modules/posts";
import rooms from "./modules/rooms";
import global from "./modules/global";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    posts,
    rooms,
    global
  }
});
