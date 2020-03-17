import axios from "axios";
// import router from "../../router";

const state = {
  posts: []
};

const getters = {
  allPosts: state => state.posts
};

const actions = {
  async fetchPosts({ commit }) {
    const response = await axios.get(`http://localhost:4000/posts`);
    commit("setPosts", response.data);
  },

  fetchPostsWithSearch({ commit }, input) {
    console.log(input);
    if (input === "") {
      axios.get("http://localhost:4000/posts").then(res => {
        commit("filterPots", res.data);
      });
    } else if (state.posts.length > 0) {
      const filteredPosts = state.posts.filter(post => {
        return post.title.indexOf(input) > -1;
      });
      commit("filterPots", filteredPosts);
    }
  },

  deletePost({ commit }, post) {
    axios
      .delete(`http://localhost:4000/posts/${post._id}`)
      .then(res => {
        console.log(res);
        axios
          .get("http://localhost:4000/posts")
          .then(response => {
            console.log(response);
            commit("deletePost", response.data);
            //refresh the page (solves the problem)
            // router.go({});
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
      });
  },

  async postData({ commit }, data) {
    const response = await axios.post("http://localhost:4000/posts", {
      title: data.title,
      description: data.description,
      room: data.room,
      username: data.username,
      email: data.email,
      likes: data.likes
    });
    commit("postData", response.data);
  },

  async likePost({ commit }, data) {
    let dataToPost = null;
    console.log(data.userEmail);
    if (data.userEmail === null) {
      return;
    } else {
      axios
        .get(`http://localhost:4000/posts/${data._id}`)
        .then(res => {
          dataToPost = {
            title: res.data.title,
            description: res.data.description,
            room: res.data.room,
            username: res.data.username,
            email: res.data.email,
            likes: res.data.likes,
            likedBy: res.data.likedBy
          };

          if (!dataToPost.likedBy.includes(data.userEmail)) {
            axios
              .put(`http://localhost:4000/posts/${data._id}`, {
                title: dataToPost.title,
                description: dataToPost.description,
                room: dataToPost.room,
                username: dataToPost.username,
                email: dataToPost.email,
                likes: dataToPost.likes + 1,
                likedBy: res.data.likedBy.concat(data.userEmail)
              })
              .then(res => {
                console.log(res);
              });
          } else {
            console.log("exists");
          }
        })
        .catch(err => {
          console.log(err);
        });

      commit("likePost");
    }
  },

  async unlikePost({ commit }, data) {
    if (data.userEmail === null) {
      return;
    } else {
      let dataToPost = null;
      axios
        .get(`http://localhost:4000/posts/${data._id}`)
        .then(res => {
          dataToPost = {
            title: res.data.title,
            description: res.data.description,
            room: res.data.room,
            username: res.data.username,
            email: res.data.email,
            likes: res.data.likes,
            unlikedBy: res.data.unlikedBy
          };
          if (!dataToPost.unlikedBy.includes(data.userEmail)) {
            axios
              .put(`http://localhost:4000/posts/${data._id}`, {
                title: dataToPost.title,
                description: dataToPost.description,
                room: dataToPost.room,
                username: dataToPost.username,
                email: dataToPost.email,
                likes: dataToPost.likes - 1,
                unlikedBy: res.data.unlikedBy.concat(data.userEmail)
              })
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("exists");
          }
        })
        .catch(err => {
          console.log(err);
        });
      commit("unlikePost");
    }
  }
};

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  postData: (state, post) => state.posts.unshift(post),
  likePost: state => state,
  unlikePost: state => state,
  deletePost: (state, posts) => (state.posts = posts),
  filterPots: (state, filteredPosts) => (state.posts = filteredPosts)
};

export default {
  state,
  getters,
  actions,
  mutations
};
