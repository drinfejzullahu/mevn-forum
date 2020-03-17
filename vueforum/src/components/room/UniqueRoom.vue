<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-lg-3 col-md-1 col-sm-0"></div>
      <div class="col-lg-6 col-md-10 col-sm-12">
        <div
          class="card m-2"
          v-if="room != null"
          :class="{post:getChecked === false,postblack:getChecked ===true,}"
        >
          <div class="card-body">
            <h5 class="card-title text-center">{{room.title}}</h5>

            <div class="card-header" :class="{cardblack:getChecked===true}">Posts:</div>
            <ul
              v-if="posts.length>0"
              class="list-group list-group-flush"
              :class="{ulborder:getChecked===false,ulborderblack:getChecked===true}"
            >
              <div
                style="height:400px; overflow-y: scroll "
                :class="{post:getChecked === false,postblack:getChecked ===true,}"
              >
                <li
                  :class="{post:getChecked === false,postblack:getChecked ===true,}"
                  v-for="post in posts"
                  :key="post._id"
                  class="links post list-group-item customlink"
                >
                  <h6 class="mt-2 mr-2">
                    <router-link
                      class="links"
                      :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
                      :to="'/post/' + post._id"
                    >{{post.title}}</router-link>
                  </h6>
                </li>
              </div>
            </ul>
            <h4 v-else class="text-center mt-4">There are no posts on this room</h4>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-1 col-sm-0"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      roomId: window.location.pathname.split("/")[2],
      room: null,
      posts: []
    };
  },
  computed: mapGetters(["getChecked"]),
  created() {
    //getRoom
    axios
      .get(`http://localhost:4000/rooms/${this.roomId}`)
      .then(res => {
        console.log(res.data);
        this.room = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //getPosts
    axios
      .get(`http://localhost:4000/posts`)
      .then(res => {
        console.log(res);
        res.data.forEach(post => {
          if (post.room === this.room.title) {
            this.posts.push(post);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });

    console.log(this.posts);
  }
  //   methods: {
  // commentHandler() {
  //   const data = {
  //     comment: this.comment,
  //     roomId: this.roomId
  //   };
  //   axios
  //     .room("http://localhost:4000/comments", data)
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  //   }
};
</script>

<style>
.ulborder {
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.ulborderblack {
  border: 1px solid black;
}
</style>