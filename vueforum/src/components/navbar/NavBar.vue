<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    v-bind:class="{ navcustomstyle: getChecked===false,navcustomstyleblack :getChecked===true }"
  >
    <a class="navbar-brand">
      <router-link to="/">
        <!-- <img
          class="mb-1"
          style="cursor:pointer ;background-color:white "
          src="../../assets/home-3x.png"
          alt="home"
        />-->
        <i class="fas fa-gem"></i>
      </router-link>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-divide changecolor"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-4">
        <li class="nav-item">
          <a class="nav-link">
            <router-link
              class="links"
              :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
              to="/addapost"
            >Add a Post</router-link>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <router-link
              class="links"
              :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
              to="/addaroom"
            >Add a Room</router-link>
          </a>
        </li>
        <li class="nav-item" v-if="getUser === 'admin@gmail.com'">
          <a class="nav-link">
            <router-link
              class="links"
              :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
              to="/userslist"
            >Users</router-link>
          </a>
        </li>
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0"> -->
      <input
        class="form-control"
        style="width:340px"
        v-model="search"
        type="search"
        @change.prevent="filterPosts($event)"
        placeholder="Search"
        aria-label="Search"
      />

      <!-- </form> -->
      <ul class="navbar-nav ml-auto mr-4">
        <li class="nav-item">
          <div class="nav-link custom-control custom-switch">
            <input
              style="background-color:black"
              type="checkbox"
              class="custom-control-input"
              @click="handleChecked"
              id="customSwitch1"
              :checked="getChecked"
            />
            <label
              style="cursor:pointer"
              class="custom-control-label ml-4"
              for="customSwitch1"
              :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
            >Night Mode</label>
          </div>
        </li>
        <li v-if="getLogedIn === false && getUser===null" class="nav-item active">
          <a class="nav-link">
            <router-link
              class="links"
              :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
              to="/signup"
            >Sign Up</router-link>

            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li v-if="getLogedIn === false &&  getUser===null" class="nav-item">
          <a class="nav-link">
            <router-link
              class="links"
              :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
              to="/login"
            >Log In</router-link>
          </a>
        </li>

        <li
          v-if="getLogedIn === true || getUser!==null && getUser.length>0 "
          @click="logedInFalse"
          class="nav-item"
        >
          <a class="nav-link">
            <router-link
              class="links"
              :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
              to="/login"
            >Sign Out</router-link>
          </a>
        </li>
        <li v-if="getLogedIn === true || getUser!==null && getUser.length>0" class="nav-item">
          <a class="nav-link">
            <router-link
              class="links"
              :class="{customlinkblack:getChecked === true , customlink:getChecked === false}"
              to="/profile"
            >Profile</router-link>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      search: ""
      // checked: false
    };
  },
  updated() {
    // console.log(this.checked);
    console.log(this.getChecked);
  },
  computed: mapGetters(["getUser", "getLogedIn", "getChecked"]),
  methods: {
    ...mapActions(["logedInFalse", "fetchPostsWithSearch", "setChecked"]),
    handleChecked() {
      // this.checked = !this.checked;
      this.setChecked();
    },
    filterPosts($event) {
      console.log($event, "event");
      console.log(this.search);
      this.fetchPostsWithSearch(this.search);
    }
  }
};
</script>

<style>
.links:hover {
  text-decoration: none;
}

.customlink {
  color: black;
}

.customlinkblack {
  color: white;
}

.customlinkblack:hover {
  color: #babfbc;
}

.customlink:hover {
  color: grey;
}
.navcustomstyle {
  background-color: #edf5f3;
  box-shadow: 0px 0px 5px 0px;
}
.navcustomstyleblack {
  background-color: #1a1a1b;
  box-shadow: 0px 0px 5px 0px;
}

.changecolor {
  color: #007bff;
}
.changecolor:hover {
  color: #0056b3;
}
</style>
