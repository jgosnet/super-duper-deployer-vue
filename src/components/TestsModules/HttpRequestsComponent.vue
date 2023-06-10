<template lang="pug">
v-card
  v-card-title {{result}}
  v-btn(@click="loadResults") test
</template>

<script>
import axios from 'axios';
import {flask_url} from "@/scripts/config";

export default {
  name: "HttpRequestsComponent",
  data(){
    return {
      result: ""
    }
  },
  methods: {
    loadResults(){
      // eslint-disable-next-line no-unused-vars
      const url = `${flask_url}/config/project`
      // eslint-disable-next-line no-unused-vars
      const results = axios.get(url)
          .then(function(response){
            if (response.statusText === 'OK'){
              console.log(response)
              return response.data
            }
            console.log(response.data)
          })
          .then(function(data){
            console.log(data)
              return data
          })
    }
  },
  mounted() {
    this.loadResults()
  }
}
</script>

<style scoped>

</style>