<template lang="pug">
v-card
  v-row(no-gutters)
    v-text-field(v-model="goal" label="goal" clearable density="compact" @keyup.enter="addGoal()")
    v-btn(@click="addGoal()") add
  v-row(no-gutters)
    v-col
      v-file-input(webkitdirectory)
      v-card
        div(v-if="goals.length === 0")
          v-card-title No goals
        div(v-else)
          v-card-title GOALS:
          v-list
            v-list-item(v-for="(item, index) in goals" :key="item")
              v-list-item-title {{item}}
              v-btn(@click="deleteGoal(index)") Delete
              v-text-field(label="test" clearable density="compact" )
</template>

<script>
export default {
  name: "TestModule",
  data() {
    return {
      goal: "",
      goals: []
    }
  },
  methods: {
    addGoal(){
      this.goals.push(this.goal)
      this.goal = ""
    },
    deleteGoal(index){
      this.goals.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>