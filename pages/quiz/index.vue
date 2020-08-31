<template>
  <v-layout justify-center class="mt-3 mb-5">
      <v-flex xs8>
          <h1 class="display-1">Quiz App</h1>
          <question v-for="(item, index) in questions" :key="index" :item=item :id=index></question>  
      </v-flex>
  </v-layout>
</template>

<script>
import Question from '../../components/question';
export default {
    components: {Question},
    data(){
        return {
            questions: {}
        }
    },
    created(){
        this.getQuestions()
    },
    methods:{
        getQuestions(){
            this.$axios.get(`/question.json`)
            .then(res => this.questions = res.data)
            .catch((err) => {
                console.log(error.response.data)
            })
        }
    }
}
</script>

<style>

</style>