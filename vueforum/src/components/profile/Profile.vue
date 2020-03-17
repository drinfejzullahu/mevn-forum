<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4 col-md-12 col-sm-12" style="margin-top:20px">
        <div class="card">
          <img :src="`http://localhost:5000/images/${user.image}`" class="img-fluid" />
          <div class="card-body">
            <label class="label label-default">Username:</label>
            <h5 class="card-title">{{ user.username }}</h5>
            <label class="label label-default">Email:</label>

            <h5 class="card-text">{{ user.email }}.</h5>
          </div>
        </div>
      </div>

      <div class="col-lg-8 col-md-12 col-sm-12">
        <Post :posts="posts" class="cardstyle" />
      </div>
    </div>
  </div>
</template>

<script>
import Post from "../post/Post";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      user: {},
      posts: []
    };
  },
  created() {
    axios
      .get(`http://localhost:4000/users/email/${this.getUser}`)
      .then(response => {
        console.log(response);
        this.user = response.data;
      })
      .catch(e => {
        console.log(e);
      });

    //getPosts from vuex
    this.fetchPosts();
    //add to posts array only the posts that have the same email address as the user that is loged in
    this.allPosts.forEach(post => {
      if (post.email === this.getUser) {
        this.posts.push(post);
      }
    });
  },
  computed: {
    ...mapGetters({
      getUser: "getUser",
      allPosts: "allPosts"
    })
  },
  methods: {
    ...mapActions(["fetchPosts"])
  },
  components: {
    Post
  }
};
</script>

<style>
.cardstyle {
  margin: 20px 0px 10px 0px;
  border-radius: 25px;
}
</style>
