// import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/auth";
import router from "../../router";
import axios from "axios";

export const state = {
  users: [],
  logedIn: false,
  userData: null
};

export const getters = {
  allUsers: state => state.users,
  getLogedIn: state => state.logedIn,
  getUser: state => state.userData
};

const actions = {
  logedInTrue({ commit }, data) {
    // console.log(data);
    commit("setLogedInToTrue");
    if (data) {
      localStorage.setItem("email", JSON.stringify(data.user.email));
      commit("setUser", data);
    } else {
      commit("setUser", null);
    }
  },

  getEmailFromLocalStorage({ commit }) {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      const data = {
        user: {
          email: email
        }
      };

      commit("setUser", data);
    }
  },

  logedInFalse({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(res => {
        console.log(res);
        localStorage.removeItem("email");
        commit("setLogedInToFalse");
        state.userData = null;
        router.replace({ name: "Login" });
      })
      .catch(err => {
        console.log(err);
      });
  },

  getAllUsers({ commit }) {
    axios
      .get("http://localhost:4000/users")
      .then(res => {
        console.log(res);
        commit("setUsers", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  deleteUsr({ commit }, user) {
    axios
      .delete("http://localhost:4000/users/" + user._id)
      .then(res => {
        console.log(res);
        axios
          .get("http://localhost:4000/users")
          .then(res => {
            console.log(res);
            commit("deleteUser", res.data);
            // commit("setUsers", res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  setLogedInToTrue: state => (state.logedIn = true),
  setLogedInToFalse: state => (state.logedIn = false),
  setUser: (state, data) => {
    state.userData = data.user.email;
  },
  deleteUser: (state, users) => (state.users = users)
};

export default {
  state,
  getters,
  actions,
  mutations
};
