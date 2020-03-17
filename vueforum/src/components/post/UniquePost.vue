<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-lg-3 col-md-1 col-sm-0"></div>
      <div class="col-lg-6 col-md-10 col-sm-12">
        <div
          class="card m-2 p-1"
          :class="{post:getChecked === false,postblack:getChecked ===true,}"
          v-if="post != null"
        >
          <div class="card-header">{{post.username}}</div>
          <div class="card" :class="{cardblack:getChecked===true}">
            <div class="card-body">
              <h5 class="card-title">{{post.title}}</h5>
              <p class="card-text">{{post.description}}</p>
            </div>
            <ul class="list-group list-group-flush">
              <div
                class="card"
                style="height:400px; overflow-y: scroll "
                :class="{post:getChecked === false,postblack:getChecked ===true,}"
              >
                <li
                  :class="{post:getChecked === false,postblack:getChecked ===true,}"
                  v-for="comment in comments"
                  class="links post list-group-item customlink"
                  :key="comment._id"
                >
                  <div style="display:flex;flex-direction:row">
                    <h6 class="mt-2 mr-2">{{comment.username}}</h6>
                    <h6 class="ml-4 mt-2" style="font-weight:normal">{{comment.comment}}</h6>
                    <td
                      v-if="getUser === 'admin@gmail.com'"
                      @click="deleteComment(comment)"
                      style="margin-left:auto"
                      class="deleteicn"
                    >
                      <i class="fas fa-trash"></i>
                    </td>
                  </div>
                </li>
              </div>
              <div style="display:flex;flex-direction:row; width:100%" class="mt-2">
                <input style="width:65%" type="text" required v-model="comment" />
                <button style="width: 35%; " class="btn custombutton" @click="commentHandler">
                  <router-link style="text-decoration:none" :to="path" class="custombutton">Comment</router-link>
                </button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-1 col-sm-0"></div>
  </div>
  <!-- </div> -->
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import router from "../../router";
export default {
  data() {
    return {
      postId: window.location.pathname.split("/")[2],
      post: null,
      comment: "",
      comments: [],
      path: "",
      user: null
    };
  },
  computed: mapGetters(["getUser", "getChecked"]),

  created() {
    if (this.getUser !== null || this.getLogedIn === true) {
      this.path = "";
    } else {
      this.path = "/login";
    }

    //getPost
    axios
      .get(`http://localhost:4000/posts/${this.postId}`)
      .then(res => {
        console.log(res.data);
        this.post = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //getComments
    // axios
    //   .get(`http://localhost:4000/comments`)
    //   .then(res => {
    //     res.data.forEach(comment => {
    //       if (comment.postId === this.postId) {
    //         this.comments.push(comment);
    //       }
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // console.log(this.comments);
    this.getComments();
  },
  methods: {
    getComments() {
      axios
        .get(`http://localhost:4000/comments`)
        .then(res => {
          res.data.forEach(comment => {
            if (comment.postId === this.postId) {
              this.comments.push(comment);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });

      console.log(this.comments);
    },

    commentHandler() {
      if (this.getUser === null) {
        router.replace({ name: "Login" });
      }
      let data = {
        comment: this.comment,
        postId: this.postId
      };
      if (data.comment !== "") {
        axios
          .get(`http://localhost:4000/users/email/${this.getUser}`)
          .then(res => {
            console.log(res);
            data = {
              ...data,
              username: res.data.username
            };
            axios
              .post("http://localhost:4000/comments", data)
              .then(res => {
                console.log(res.data);
                this.comments.unshift(res.data);
                this.comment = "";
              })
              .catch(err => {
                console.log(err);
              });
          });
      }
    },
    deleteComment(comment) {
      axios
        .delete("http://localhost:4000/comments/" + comment._id)
        .then(res => {
          console.log(res);
          this.comments = [];
          this.getComments();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.commentbutton {
  color: white;
}
.commentbutton:hover {
  color: #84898c;
}
.cardblack {
  background-color: black;
}
</style>