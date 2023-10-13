// eslint-disable-next-line no-unused-vars
import VueCookies from 'vue-cookies'
import {api} from "@/scripts/axios_config";

export default {
  async login(context, payload){
    const url = `auth/session`
    context.commit('updateLoginLoading', true)
    const formatted_payload = {
      username: payload.login,
      password: payload.password
    }
    // console.log(url)
    // console.log(JSON.stringify(formatted_payload))
    return api.post(url, JSON.stringify(formatted_payload))
      .then((response) => {
        if (response.statusText === 'OK'){
          console.log("change loggedin to true")
          console.log(response.headers)

          localStorage.setItem('username', payload.login)
          localStorage.setItem('isLoggedIn', true)
          localStorage.setItem('access_token', "test")

          context.commit('updateAuth', {
            token: null,
            tokenExpiration: null,
            username: payload.login,
            isLoading: false,
            isLoggedIn: true
          });
        }
        console.log(response.data);
        console.log("loading project");
        // await context.dispatch('projectConfiguration/loadProjectsList', null, {root:true});
        console.log("loaded")
      })
      .catch((error) => {
        console.error(error)
        const errorMessage = 'Failed to login'
        context.dispatch('snackbar/showMessage', {
            message: errorMessage
          },
          { root: true }
        )
      })
      .finally(() => {
        console.log("finished logging in action")
        context.commit('updateLoginLoading', false)
      })

  },

  autoLogin(){
    // eslint-disable-next-line no-unused-vars
    const username = localStorage.getItem('username')
    // eslint-disable-next-line no-unused-vars
    const isLoggedIn = localStorage.getItem('isLoggedIn')
  },
  // eslint-disable-next-line no-unused-vars
  logout(context){
    const url = `auth/logout`
    context.commit('updateAuth', {
      token: null,
      tokenExpiration: null,
      username: null,
      isLoading: false,
      isLoggedIn: false
    });
    api.post(url)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        const errorMessage = 'Failed to log out'
        context.dispatch('snackbar/showMessage', {
            message: errorMessage
          },
          { root: true }
        )
      })
      .finally(() => {
        this.$cookies.remove('access_token_cookie');
      })

  }
};