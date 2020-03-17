<template>
  <div class="m-3">
    <table
      :class="{
        'table table-bordered table-light': getChecked === false,
        'table table-dark': getChecked === true
      }"
    >
      <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Admin</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in allUsers" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.admin }}</td>
          <td @click="deleteUser(user)" class="deleteicn">
            <i class="fas fa-trash"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "../../router";

export default {
  name: "Users",
  data() {
    return {};
  },
  computed: mapGetters(["allUsers", "getChecked"]),
  methods: {
    ...mapActions(["getAllUsers", "deleteUsr"]),

    deleteUser(user) {
      this.deleteUsr(user);
      router.replace({ name: "Users" });
    }
  },
  created() {
    this.getAllUsers();
    console.log(this.allUsers, "allusr");
  }
};
</script>

<style>
.deleteicn {
  cursor: pointer;
}
</style>
