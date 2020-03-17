<template>
  <div
    class="card mx-auto mt-3 p-3 setWidth"
    :class="{post:getChecked === false,postblack:getChecked ===true,}"
  >
    <form>
      <div class="form-group">
        <label for="exampleFormControlInput1">Name</label>
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

      <button
        @click="onSubmit"
        :disabled="descriptionError|| titleError"
        class="btn mt-3 mb-2 custombutton"
        style="width:100%"
      >Post</button>
    </form>
  </div>
</template>

<script>
// import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import router from "../../router";

export default {
  name: "AddARoom",
  data() {
    return {
      title: "",
      description: "",
      descriptionError: true,
      titleError: true
    };
  },

  updated() {
    this.validateDescription();
    this.validateTitle();
  },
  computed: mapGetters(["getChecked"]),

  methods: {
    ...mapActions(["postRoom"]),

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

    onSubmit(evt) {
      evt.preventDefault();
      const data = {
        title: this.title,
        description: this.description
      };

      this.postRoom(data);
      router.replace({ name: "MainPage" });
    }
  }
};
</script>

<style>
.custombutton {
  background-color: #363a3d;
  color: white;
}
.custombutton:hover {
  color: #84898c;
}
.custombutton:disabled {
  background-color: #84898c;
  color: white;
}
</style>
