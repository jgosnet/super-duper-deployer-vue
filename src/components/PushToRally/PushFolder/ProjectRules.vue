<template lang="pug">
v-container(class="mx-1" fluid).rule.ml-5
  //| {{selectedSilos}}
  v-row.mx-4.my-1
    h2.py-2.px-3.float-left(align="left") Rules
    v-btn.float-right(@click="refreshRules()" size="x-small" icon="fa-solid fa-arrows-rotate")
    div(v-if="this.selectedRules.length > 0" )
      v-btn.ml-3(prepend-icon="fa-solid fa-file-arrow-down" @click="uploadDialog = true"
      :disabled="this.preSelectedSilos.length == 0").ml-5 Push selection
      div(v-show="this.preSelectedSilos.length == 0" )
        span.text-red() Please select a silo first
      v-dialog(v-model="uploadDialog"
            width="auto"
            min-width="500" )
        template(v-slot:activator="{ props }")
        v-card
          v-card-title
            | Push rules to
            b.pl-2 {{formattedSiloSelection}}
          v-card-text
            | You 'bout to push some rules to a silo mate, ya sure 'bout dat ?
            ul
              li(v-for="item in this.selectedRules" :key="item.id")
                | {{item.name}}
          v-card-actions
            v-spacer
            v-btn(color="primary" @click="uploadDialog = false") Cancel
            v-btn(color="primary"  @click="uploadSelection") Confirm
</template>

<script>
import {VDataTable} from "vuetify/lib/labs/VDataTable";
import {mapGetters} from "vuex";

export default {
  name: "ProjectRules",
  props: {
    rulesList: Array,
  },
    data() {
    return {
      uploadDialog: false,
      selectedRules: [],
      itemsPerPage: 5,
      baseHeaders: [
          {
          title: 'name',
          align: 'start',
          sortable: false,
          key: 'name'
        },
        {
          title: 'id',
          align: 'start',
          sortable: false,
          key: 'id'
        }
      ],
      ruleHeaders: [],
      localRulesList: []
    }
  },
  watch: {
    selectedSilos(newValue, oldValue){
      console.log(`Silo selection changed: old -> ${oldValue}`);
      // this.refreshRulesHeaders();
    }
  },
  components:{
    VDataTable
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSilos', 'preSelectedSilos']),
    formattedSiloSelection(){
      return `[${this.preSelectedSilos.join(", ")}]`
    }
  },
  methods:{
    async uploadSelection(){

    },
    refreshRules(){

    }
  }
}
</script>

<style scoped>
.not-in-silo {
  background-color: grey;
}

.in-silo {
  background-color: lightgreen;
}

.rule{
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  margin-left: 5px;
  margin-top: 14px;
  margin-bottom: 14px;

  background-color: #F8F9F9;
  border-style: dashed;
  border-width: 2px;
  border-radius: 5px;
  color: darkslategrey;
}
</style>