<template>
  <div
    class="card mx-auto m-3 p-3 setWidth"
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
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          required
          v-model="description"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1">Room</label>

        <div class="input-group mb-3">
          <select v-model="room" class="custom-select" id="inputGroupSelect03">
            <!-- <option  selected>Choose...</option> -->
            <option v-for="room in allRooms" :key="room.id" :value="room.title">{{room.title}}</option>
            <!-- <option value="2">Two</option>
            <option value="3">Three</option>-->
          </select>
        </div>
      </div>

      <button
        :disabled="descriptionError||titleError||roomError"
        @click="onSubmit"
        class="btn mt-3 mb-2 custombutton"
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
  name: "AddAPost",
  data() {
    return {
      title: "",
      description: "",
      room: "",
      titleError: true,
      descriptionError: true,
      roomError: true
    };
  },

  computed: mapGetters(["allRooms", "getUser", "getChecked"]),

  created() {
    this.fetchRooms();
  },

  updated() {
    this.validateTitle();
    this.validateDescription();
    this.validateRoom();
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
      axios
        .get(`http://localhost:4000/users/email/${this.getUser}`)
        .then(res => {
          const data = {
            title: this.title,
            description: this.description,
            room: this.room,
            email: this.getUser,
            username: res.data.username,
            likes: 0
          };
          this.postData(data);
          router.replace({ name: "MainPage" });
        });
    }
  }
};
</script>

<style>
.setWidth {
  width: 600px;
}
@media (max-width: 700px) {
  .setWidth {
    width: 96%;
  }
}
</style>
