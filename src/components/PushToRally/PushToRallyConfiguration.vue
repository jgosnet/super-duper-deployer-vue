<template lang="pug">
v-card
  v-card-title(class="pb-5")
    span(class="pr-2") Configuration
    v-btn(@click.stop="openDialog" icon="fas fa-edit" size="small" variant="outlined" align="left")
  v-card-text
    v-row(text-align="left")
      b(class="pr-2") Selected Silo:
      | {{this.computedSilo}}
    v-row(text-align="left")
      b(class="pr-2") Selected Project:
      | {{this.computedProject}}

v-dialog(v-model="localDialog"

      transition="dialog-top-transition"
      @keyup.esc="closeDialog")
  template(v-slot:activator="{ props }")
  v-card
    v-toolbar(color="surface-variant")
      v-toolbar-title Export Configuration
      v-spacer
      v-toolbar-items
        v-btn(variant="text" @click="closeDialog" icon="fa-solid fa-xmark")

    v-card-text(v-show="this.loading")
      v-progress-linear(indeterminate
            color="black"
            class="mb-0")
      | Data loading..
    v-card-text(v-show="!this.loading")
      v-list
        v-list-item
          v-form(validate-on="submit lazy"
                @submit.prevent="submit")
            v-text-field() test
            | 123
    v-card-actions(v-show="!this.loading")
      v-spacer
      v-btn(color="blue-darken-1"
              variant="text"
              @click="closeDialog") Close
      v-btn(color="blue-darken-1"
          variant="text"
          @click="closeDialog") Save

</template>

<script>
export default {
  name: "PushToRallyConfiguration",
  props:{
  },
  computed: {
    show: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    computedProject(){
      return "project1"
    },
    computedSilo(){
      return "silo1"
    }
  },
  data(){
    return {
      localSelectedProject: null,
      localSelectedSilo: null,
      localDialog: false,
      loading: true,
      timeout: null,
      availableProjects: [],
    }
  },
  methods: {
    openDialog(){
      this.localDialog = true
    },
    closeDialog(){
      console.log("closing modal")
      this.localDialog = false
    },
    async submit(event){
      this.loading = true
      const results = await event
      this.loading = false
      alert(JSON.stringify(results, null, 2))
    }
  }
}
</script>

<style scoped>

</style>