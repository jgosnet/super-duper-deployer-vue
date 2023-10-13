<template lang="pug">
v-row.my-3.mx-2
  h2 Silos
    NewSiloForm
  v-spacer
  v-btn.ml-3(icon="fa-solid fa-arrows-rotate" size="small" @click="loadSilosList")
  ConfirmDialog(ref="confirmDialogue")

v-row
  v-col(cols="12")
    div(v-if="this.isLoading" )
      v-progress-circular(v-show="this.isLoading" indeterminate
        color="primary")
    div(v-else-if="siloErrorMessage")
      v-icon(color="red") fa-solid fa-triangle-exclamation
      | {{siloErrorMessage}}
    div(v-else)
      draggable(v-model="silosList"
        item-key="name"
        group="silo"
        handle=".handle"
        animation="150"
        ghost-class="sortable-ghost"
        fallback-class="fallbackStyleClass"
        :force-fallback="true")
        template(#item="{element}")
          v-card(elevation="3" ).my-2.handle
            v-card-title
              v-icon.mr-3(size="x-small" ) fa-solid fa-bars
              | {{element.name}}
              v-icon.ml-5(size="x-small" icon="far fa-trash-alt" @click="deleteSilo(element)")

              input(type="checkbox" v-model="element.isSelected").float-right

            v-card-text
              v-row.pt-2.px-5
                span.font-weight-bold ID:
                span.font-weight-medium.pl-2 {{element.id}}
              v-row.pt-2.px-5
                span.font-weight-bold Name:
                span.font-weight-medium.pl-2 {{element.name}}
              v-row.pt-2.px-5
                span.font-weight-bold Customer:
                span.font-weight-medium.pl-2 {{element.customer}}
              v-row.pt-2.px-5
                span.font-weight-bold Base URL:
                span.font-weight-medium.pl-2 {{element.base_url}}


</template>

<script>
import draggable from "vuedraggable";
import {mapGetters} from "vuex";
import ConfirmDialog from "@/components/utils/ConfirmDialog";
import NewSiloForm from "@/components/PushToRally/Forms/Silo/NewSiloForm";

export default {
  name: "GeneralSiloProject",
  components: {
    NewSiloForm,
    ConfirmDialog,
    draggable
  },
  data(){
    return {
      isLoading: false,
      localSelectedSilos: this.selectedSiloNames,
    }
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSiloNames', 'siloErrorMessage']),
    silosList: {
      get(){
        console.log(this.$store.getters['siloConfiguration/silosList'])
        return this.$store.getters['siloConfiguration/silosList']
      },
      set(value){
        this.$store.dispatch('siloConfiguration/updateSilosList', value)
      }
    }
  },
  methods:{
    loadSilosList() {
      this.$store.dispatch('siloConfiguration/loadSilosList');
    },
    async deleteSilo(silo) {
      const ok = await this.$refs.confirmDialogue.show({
          title: 'Delete Page',
          message: `Are you sure you want to delete this Silo ? [${silo.name}
          (id: ${silo.id})]`,
      })
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        console.log('Trying to delete this project')
        this.$store.dispatch('siloConfiguration/deleteSilo', silo.id);
      } else {
        console.log('You chose not to delete this page. Doing nothing now.')
      }
    },
  },
  watch:{
  },
  mounted() {
  }
}
</script>

<style scoped>
.sortable-ghost {
  opacity: 20%;
  border: 1px dashed grey;
  font-size: 0;
  overflow: hidden;
}

.fallbackStyleClass{
  opacity: 70%;
}
</style>