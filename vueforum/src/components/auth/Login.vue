<template>
  <div
    class="card mx-auto m-4 customwidth"
    :class="{post:getChecked === false,postblack:getChecked ===true,}"
  >
    <article class="card-body">
      <h4 class="card-title text-center mb-4 mt-1">Log In</h4>
      <hr />
      <p class="text text-center">{{error}}</p>
      <form>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-user"></i>
              </span>
            </div>
            <input name class="form-control" v-model="email" placeholder="Email " type="email" />
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
            <input class="form-control" placeholder="Password" v-model="password" type="password" />
          </div>
          <!-- input-group.// -->
        </div>
        <!-- form-group// -->
        <div class="form-group">
          <button
            @click="onLogin"
            :disabled="emailError || passwordError"
            type="submit"
            class="btn btn-block custombutton"
          >Login</button>
        </div>
        <!-- form-group// -->
        <p class="text-center">
          <router-link
            to="/signup"
            :class="{'whitetext' : getChecked === true, 'blacktext' : getChecked === false}"
            class="btn btn-default"
          >Dont have an account Sign Up</router-link>
        </p>
      </form>
    </article>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import router from "../../router";

import "firebase/auth";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      passwordError: true,
      emailError: true
    };
  },
  updated() {
    console.log("updated");
    this.validateEmail();
    this.validatePassword();
  },
  computed: mapGetters(["getLogedIn", "getChecked"]),
  methods: {
    ...mapActions(["logedInTrue"]),

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

    onLogin(e) {
      e.preventDefault();
      console.log("clicked");
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          this.logedInTrue(res);
          router.replace({ name: "MainPage" });
        })
        .catch(err => {
          console.log(err);
          this.error = err.message;
        });
    }
  }
};
</script>

<style>
.customwidth {
  width: 450px;
}

@media (max-width: 700px) {
  .customwidth {
    width: 96%;
  }
}

.whitetext {
  color: white;
}

.blacktext {
  color: black;
}
</style>
