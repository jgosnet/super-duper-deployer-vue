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
        group="project")
        template(#item="{element}")
          v-card(elevation="3" ).my-2
            v-card-title
              v-icon.mr-3(size="x-small" ) fa-solid fa-bars
              | {{element.name}} ({{element.id}})
              v-icon.ml-5(size="x-small" icon="far fa-trash-alt" @click="deleteSilo(element)")

              input(type="checkbox" v-model="element.isSelected").float-right

            v-card-text
              | config
              //v-row.pt-2.px-5
              //  span.font-weight-bold Type:
              //  span.font-weight-medium.pl-2 {{element.type}}
              //v-row.pt-2.px-5(v-if="element.type=='local'" )
              //  span.font-weight-bold Path:
              //  span.font-weight-medium.pl-2 {{element.path}}
              //div(v-if="element.type=='github'")
              //  v-row.pt-2.px-5
              //    span.font-weight-bold Repo:
              //    span.font-weight-medium.pl-2 {{element.repo}}
              //  v-row.pt-2.px-5
              //    span.font-weight-bold Branch:
              //    span.font-weight-medium.pl-2 {{element.branch}}


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
    ...mapGetters('configuration', ['selectedSiloNames', 'siloErrorMessage']),
    silosList: {
      get(){
        console.log(this.$store.getters['configuration/silosList'])
        return this.$store.getters['configuration/silosList']
      },
      set(value){
        this.$store.dispatch('configuration/updateSilosList', value)
      }
    }
  },
  methods:{
    loadSilosList() {
      this.$store.dispatch('configuration/loadSilosList');
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
        this.$store.dispatch('configuration/deleteSilo', silo.id);
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

</style>