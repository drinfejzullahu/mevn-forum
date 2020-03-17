<template>
  <div
    class="card mx-auto mt-4 customwidth"
    :class="{post:getChecked === false,postblack:getChecked ===true,}"
  >
    <article class="card-body">
      <h4 class="card-title text-center mb-4 mt-1">Sign Up</h4>
      <hr />
      <p class="text-success text-center">{{ error }}</p>
      <form>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-user"></i>
              </span>
            </div>
            <input
              v-model="username"
              id="username"
              class="form-control"
              placeholder="Username"
              type="text"
            />
          </div>
          <!-- input-group.// -->
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-user"></i>
              </span>
            </div>
            <input v-model="email" id="email" class="form-control" placeholder="Email" type="email" />
          </div>
          <!-- input-group.// -->
        </div>
        <!-- form-group// -->
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-lock"></i>
              </span>
            </div>
            <input
              v-model="password"
              id="password"
              placeholder="Password"
              class="form-control"
              type="password"
            />
          </div>
          <!-- input-group.// -->
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <input
                type="file"
                id="image"
                name="image"
                class="form-control-file"
                @change="onFileChange"
              />
            </div>
          </div>
        </div>
        <p class="text-center">
          <router-link
            to="/login"
            :class="{'whitetext' : getChecked === true, 'blacktext' : getChecked === false}"
            class="btn btn-default"
          >Already have an account Log In</router-link>
        </p>
        <!-- form-group// -->
        <div class="form-group">
          <button
            :disabled="emailError || passwordError || usernameError"
            type="submit"
            @click="onSignup"
            class="btn btn-block custombutton"
          >Sign Up</button>
        </div>
      </form>
    </article>
  </div>
</template>

<script>
// import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/auth";
import router from "../../router";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      image: "",
      admin: false,
      error: "",
      usernameError: true,
      passwordError: true,
      emailError: true
    };
  },

  computed: mapGetters(["getLogedIn", "getChecked"]),
  updated() {
    this.validateUsername();
    this.validateEmail();
    this.validatePassword();
  },
  methods: {
    validateUsername() {
      var re = new RegExp("^([a-z0-9]{5,})$");
      if (re.test(this.username)) {
        this.usernameError = false;
      } else {
        this.usernameError = true;
      }
    },

    validatePassword() {
      if (this.password.length > 5) {
        this.passwordError = false;
      } else {
        this.passwordError = true;
      }
    },

    validateEmail() {
      var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(this.email).toLowerCase())) {
        this.emailError = false;
      } else {
        this.emailError = true;
      }
    },

    onSignup(evt) {
      evt.preventDefault();
      console.log("clicked");
      //save in firebase for authentication
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
          console.log(res);
          // this.logedInTrue();
          // router.replace({ name: "Login" });
        })
        .catch(err => {
          this.error = err.message;
        });

      // evt.preventDefault();

      var bodyFormData = new FormData();
      let image = document.getElementById("image");
      // let imagesss = image.files[0].name;

      // console.log(imagesss);
      // const data = {
      //   username: this.username,
      //   email: this.email,
      //   password: this.password,
      //   admin: this.admin,
      //   image: imagesss
      // };
      bodyFormData.set("username", document.getElementById("username").value);
      bodyFormData.set("email", document.getElementById("email").value);
      bodyFormData.set("password", document.getElementById("password").value);
      bodyFormData.append("image", image.files[0]);
      bodyFormData.set("admin", false);

      console.log(bodyFormData);

      axios.post(`http://localhost:4000/users`, bodyFormData).then(response => {
        console.log(response);
        router.replace({ name: "Login" });

        // this.$router.push({
        //   name: "home"
        //   //params: { id: response.data._id }
        // });
      });
      //save in my local db
      //   if (this.error === "") {
      //     const data = {
      //       username: this.username,
      //       email: this.email,
      //       password: this.password,
      //       admin: this.admin,
      //       image:this.image
      //     };
      //     axios
      //       .post(`http://localhost:4000/users`, data)
      //       .then(function(response) {
      //         console.log(response);
      //         router.replace({ name: "Login" });
      //       })
      //       .catch(err => {
      //         this.error = err.message;
      //       });
      //   }
      // },
    },
    //image
    onFileChange(e) {
      const file = e.target.files[0];

      console.log(file);
    }
    // onSubmit(evt) {
    // evt.preventDefault();
    // var bodyFormData = new FormData();
    // let image = document.getElementById("image");
    // bodyFormData.set("username", document.getElementById("username").value);
    // bodyFormData.set("email", document.getElementById("email").value);
    // bodyFormData.set("password", document.getElementById("password").value);
    // bodyFormData.append("image", image.files[0]);
    // axios.post(`http://localhost:4000/users`, bodyFormData).then(response => {
    //   console.log(response);
    //   // this.$router.push({
    //   //   name: "home"
    //   //   //params: { id: response.data._id }
    //   // });
    // });
    // }
  }
};
</script>

<style></style>
