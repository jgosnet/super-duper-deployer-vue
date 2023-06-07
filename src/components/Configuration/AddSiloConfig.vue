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
      v-toolbar-title Add new Silo
      v-spacer
      v-toolbar-items
        v-btn(variant="text" @click="closeDialog" icon="")

    v-list
      v-list-item
        v-form(validate-on="submit lazy"
              @submit.prevent="submit")
          v-text-field() test
          | 123
</template>

<script>
export default {
  name: "ConfigurationAddSilo",
  props: {
    dialog: Boolean
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
  data() {
    return {
      localDialog: false,
      loading: false,
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