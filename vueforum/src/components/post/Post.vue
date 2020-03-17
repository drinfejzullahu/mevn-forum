<template>
  <div>
    <div
      class="card mt-2"
      :class="{post:getChecked === false,postblack:getChecked ===true,}"
      v-for="post in posts"
      :key="post._id"
    >
      <div class="card-body">
        <h6 class="card-title">{{ post.username }}</h6>
        <hr />
        <h5 class="card-subtitle mb-2 text-muted">{{ post.title }}</h5>

        <p class="card-text">{{ post.description }}</p>
        <span class="mr-2">{{post.likes}}</span>
        <router-link
          :to="path"
          class="card-link"
          :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
        >
          <hr />
          <a @click="likePostAction(post)">Like</a>
        </router-link>

        <router-link
          :to="path"
          class="card-link"
          :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
        >
          <a @click="unLikePostAction(post)">Unlike</a>
        </router-link>
        <a class="card-link">
          <router-link
            class="links"
            :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
            :to="'/post/' + post._id"
          >ShowPost</router-link>
        </a>

        <span v-if="location === true" class="ml-3">
          <a class="card-link">
            <router-link
              class="links"
              :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
              :to="'/editpost/' + post._id"
            >Edit</router-link>
          </a>
          <router-link
            to="/"
            class="card-link"
            :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
          >
            <a @click="deletePostHandler(post)">Delete</a>
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import router from "../../router";

export default {
  name: "Post",
  data() {
    return {
      likes: [],
      likedPostId: "",
      comment: "",
      location: false,
      user: null,
      updated: false,
      path: ""
    };
  },

  props: ["posts"],
  methods: {
    ...mapActions(["likePost", "unlikePost", "deletePost"]),
    likePostAction(post) {
      const postWithEmail = { ...post, userEmail: this.getUser };
      this.likePost(postWithEmail);
    },

    unLikePostAction(post) {
      const postWithEmail = { ...post, userEmail: this.getUser };

      this.unlikePost(postWithEmail);
    },

    deletePostHandler(post) {
      this.deletePost(post);
      router.replace({ name: "MainPage" });
    },

    commentHandler() {
      const data = {
        comment: this.comment,
        postId: this.postId
      };
      axios
        .post("http://localhost:4000/comments", data)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  computed: mapGetters(["getUser", "getLogedIn", "getChecked"]),
  created() {
    console.log(this.getLogedIn, this.getUser);
    if (this.getUser !== null || this.getLogedIn === true) {
      this.path = "";
    } else {
      this.path = "/login";
    }
    axios
      .get(`http://localhost:4000/users/email/${this.getUser}`)
      .then(res => {
        console.log(res);
        this.user = res.data;
        if (
          this.user.admin === true ||
          window.location.pathname === "/profile"
        ) {
          this.location = true;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.post {
  background-color: #fafcfc;
}
.postblack {
  background-color: #343635;
  color: white;
}
</style>
