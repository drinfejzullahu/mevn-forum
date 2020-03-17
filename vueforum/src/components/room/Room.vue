<template>
  <div>
    <ul class="list-group">
      <router-link
        class="links list-group-item customlink"
        :class="{post:getChecked === false,postblack:getChecked ===true,}"
        v-for="room in rooms"
        :key="room.id"
        :to="'/room/' + room._id"
      >{{room.title}}</router-link>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Room",
  props: ["rooms"],
  computed: mapGetters(["getChecked"])
};
</script>

<style>
.listitem {
  cursor: pointer;
}
</style>