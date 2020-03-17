<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-8 col-md-12 col-sm-12">
        <h5 :class="{header:getChecked===false,headerblack:getChecked===true}">Most upvoted posts</h5>
        <Post :posts="allPosts" class="cardstyle" />
      </div>
      <div class="col-lg-4 col-md-12 col-sm-12">
        <h5 :class="{header:getChecked===false,headerblack:getChecked===true}">Best Rooms</h5>

        <Room :rooms="allRooms" class="roomstyle" />
      </div>
    </div>
  </div>
</template>

<script>
import Room from "../room/Room";
import Post from "../post/Post";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainPage",
  components: {
    Room,
    Post
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchPosts", "fetchRooms"])
  },
  computed: mapGetters(["allPosts", "allRooms", "getChecked"]),
  created() {
    this.fetchPosts();
    this.fetchRooms();
  }
};
</script>

<style>
.cardstyle {
  margin: 20px 0px 10px 0px;
  border-radius: 25px;
}
.roomstyle {
  margin: 20px 0px 10px 0px;
}
.header {
  margin: 20px 0px 0px 30px;
}

.headerblack {
  color: white;
  margin: 20px 0px 0px 30px;
}
</style>
