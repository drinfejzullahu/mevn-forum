<template>
  <div
    class="card mx-auto mt-3 p-3 post setWidth"
    :class="{post:getChecked === false,postblack:getChecked ===true,}"
  >
    <form>
      <div class="form-group">
        <label for="exampleFormControlInput1">Title</label>
        <input
          required
          v-model="title"
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
        />
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1">Body</label>
        <textarea
          required
          v-model="description"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>

      <div class="input-group mb-3">
        <select v-model="room" class="custom-select" id="inputGroupSelect03">
          <!-- <option  selected>Choose...</option> -->
          <option v-for="room in allRooms" :key="room.id" :value="room.title">{{room.title}}</option>
          <!-- <option value="2">Two</option>
          <option value="3">Three</option>-->
        </select>
      </div>

      <button
        :disabled="descriptionError||titleError||roomError"
        @click="onSubmit"
        class="btn custombutton mt-3 mb-2"
        style="width:100%"
      >Post</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "../../router";
import axios from "axios";

export default {
  name: "EditPost",
  data() {
    return {
      title: "",
      description: "",
      room: "",
      postId: window.location.pathname.split("/")[2],
      titleError: false,
      descriptionError: false,
      roomError: false
    };
  },

  computed: mapGetters(["allRooms", "getUser", "getChecked"]),

  updated() {
    console.log(this.title, this.description);
    this.validateTitle();
    this.validateDescription();
    this.validateRoom();
  },

  created() {
    this.fetchRooms();
    axios
      .get(
        "http://localhost:4000/posts/" + window.location.pathname.split("/")[2]
      )
      .then(res => {
        this.title = res.data.title;
        this.description = res.data.description;
        this.room = res.data.room;
      });
  },

  methods: {
    ...mapActions(["postData", "fetchRooms"]),

    validateTitle() {
      if (this.title !== "") {
        this.titleError = false;
      } else {
        this.titleError = true;
      }
    },

    validateDescription() {
      if (this.description !== "") {
        this.descriptionError = false;
      } else {
        this.descriptionError = true;
      }
    },

    validateRoom() {
      if (this.room !== "") {
        this.roomError = false;
      } else {
        this.roomError = true;
      }
    },

    onSubmit(evt) {
      evt.preventDefault();
      let data = null;
      axios
        .get(`http://localhost:4000/users/email/${this.getUser}`)
        .then(res => {
          data = {
            title: this.title,
            description: this.description,
            room: this.room,
            email: this.getUser,
            username: res.data.username,
            likes: res.data.likes
          };
          axios
            .put(`http://localhost:4000/posts/${this.postId}`, data)
            .then(res => {
              console.log(res);
            })
            .catch(res => {
              console.log(res);
            });
          router.replace({ name: "MainPage" });
        });
    }
  }
};
</script>

<style></style>
