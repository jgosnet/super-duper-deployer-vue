<template lang="pug">
v-row(justify="center" align="center")
  v-form(@submit.prevent="submitForm" v-model="formIsValid" v-show="!isLoggedIn" ).w-50.pt-4
    v-card
      v-card-text
        v-text-field(density="compact"
            placeholder="Login"
            v-model="login"
            :rules="loginRules")
        v-text-field(density="compact"
            :rules="passwordRules"
            placeholder="Password"
            v-model="password"
            prepend-inner-icon="fa-solid fa-lock"
            :append-inner-icon="visible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
            @click:append-inner="visible = !visible"
            :type="visible ? 'text' : 'password'")
        //p(v-if="!formIsValid" ) Please enter a valid login and password
        div(v-if="!isLoading" )
          v-btn.mb-3(type="submit" block size="large" :disabled="!formIsValid") Log in
        div(v-else )
          v-progress-circular(indeterminate color="primary")


</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "UserAuth",
  data() {
    return {
      visible: false,
      login: "admin",
      loginRules: [
          v => !!v || 'Login is required'
      ],
      password: "admin",
      passwordRules: [
          v => !!v || 'Password is required'
      ],
      formIsValid: false
    }
  },
    computed: {
      ...mapGetters('auth', ['isLoading', 'isLoggedIn'])
    },
  methods: {
    async submitForm(){
      console.log(`Log in attempt: ${this.login}`)
      try {
        await this.$store.dispatch('auth/login', {
          login: this.login,
          password: this.password
          })
        await this.$store.dispatch('projectConfiguration/loadProjectsList');
        await this.$store.dispatch('siloConfiguration/loadSilosList');
        this.$router.replace('/export')
        // this.$store.dispatch('configuration/loadConfiguration');
      } catch (err) {
        console.log(`There was an error trying to log in`)
      }

    }
  }
}
</script>

<style scoped>

</style>