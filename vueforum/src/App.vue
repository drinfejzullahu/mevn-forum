<template>
  <div id="app" :class="{body:getChecked === false,bodyblack:getChecked ===true}">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/navbar/NavBar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  methods: {
    ...mapActions(["getEmailFromLocalStorage"])
  },
  computed: mapGetters(["getChecked"]),

  created() {
    this.getEmailFromLocalStorage();
  },
  components: {
    NavBar
  }
};
</script>

<style>
#app {
  margin: 0px;
  padding: 0px;
  min-height: 980px;
}
.body {
  background-color: #e4e8eb;
}

.bodyblack {
  background-color: black;
}
</style>
