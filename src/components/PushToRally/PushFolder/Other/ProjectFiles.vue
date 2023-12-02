<template lang="pug">
v-container(class="mx-1" fluid).files.ml-5
  v-icon.pt-3.float-right(@click="this.showContainer = !this.showContainer" size="large" ) {{showContainerIcon}}
  v-row.mx-4.my-1
    h3.py-2.px-3.float-left(align="left" @click="this.showContainer = !this.showContainer") Generic files
    span.py-2.pr-5 {{this.filesCount}}

  v-data-table(v-show="this.showContainer"
    v-model:items-per-page="itemsPerPage"
    :headers="fileHeaders"
    :items="localFilesList"
    item-value="name"
    class="elevation-1"
    density="compact"
    :item-class="ruleInSiloClass"
    color="grey-lighten-4"
    return-object
  )

    template(v-slot:item.existsInSilo="{ item }")
      div.float-left
        //| --{{item}}--
        v-icon(v-if="item.existsInSilo === undefined" ) fa-solid fa-question
        v-icon(v-else-if="!item.existsInSilo" ) fa-solid fa-xmark
        v-icon(v-else) fa-solid fa-check

    template(v-slot:item.name="{ item }")
      div.float-left
        //# fa-regular fa-eye
        FilePreview(:item="item.value")

    template(v-slot:item.modified="{ item }")
      div.float-left
        | {{this.toLocalDate(item.value.modified) }}

</template>

<script>
import {VDataTable} from "vuetify/lib/labs/VDataTable";
import {mapGetters} from "vuex";
import FilePreview from "@/components/PushToRally/PushFolder/Other/FilePreview";

export default {
  name: "ProjectFiles",
  props: {
    files: Array,
  },
  components:{
    VDataTable,
    FilePreview
  },
  data() {
    return {
      showContainer: true,
      uploadDialog: false,
      selectedRules: [],
      itemsPerPage: 5,
      fileHeaders: [
        {
          title: 'Name',
          align: 'start',
          sortable: false,
          key: 'name'
        },
        {
          title: 'Extension',
          align: 'start',
          sortable: false,
          key: 'extension'
        },
        {
          title: 'Last modified',
          align: 'start',
          sortable: false,
          key: 'modified'
        }
      ],
      localFilesList: []
    }
  },
  computed: {
    ...mapGetters('siloConfiguration', ['selectedSilos', 'preSelectedSilos']),
    formattedSiloSelection(){
      return `[${this.preSelectedSilos.join(", ")}]`
    },
    showContainerIcon(){
      if (this.showContainer){
        return "fa-solid fa-caret-right"
      }
      return "fa-solid fa-caret-down"
    },
    filesCount(){
      if (this.showContainer){
        return ""
      }
      return `(${this.files.length})`
    }
  },
  mounted() {
    console.log(`loaded headers: `);
    this.loadFilesList();
  },
  methods: {
    toLocalDate(value){
      const dateString = new Date(value * 1000).toLocaleString();
      return dateString;
    },
    loadFilesList(){
      this.localFilesList = []

      for (const item of this.files){
        console.log('file found: ')
        console.log(item)
        let newRule = {
          name: item.name,
          id: item.id,
          key: item.name,
          type: item['type'],
          extension: item.ext,
          modified: item['modified'],
        }

        this.localFilesList.push(newRule)
      }
    }
  },
}
</script>

<style scoped>

.files{
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  margin-left: 5px;
  margin-top: 14px;
  margin-bottom: 14px;

  background-color: #BDC3C7;
  border-style: dashed;
  border-width: 1px;
  border-radius: 5px;
  color: darkslategrey;
}
</style>