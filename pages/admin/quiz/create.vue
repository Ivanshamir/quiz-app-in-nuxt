<template>
  <v-container>
      <v-layout>
          <v-flex xs8 offset-xs2> 
              <v-card>
                  <v-card-title>
                      <h1 class="display-1">Add Question</h1>
                      <v-spacer></v-spacer>
                      <n-link to="/admin/quiz">
                        <v-btn small color="grey darken-2" dark>All Questions</v-btn>
                      </n-link>
                  </v-card-title>
                  <v-card-text>
                      <form @submit.prevent="store">
                          <v-text-field label="Question" v-model="quiz.question" solo></v-text-field>
                          <v-text-field label="Option 1" v-model="quiz.option1" solo></v-text-field>
                          <v-text-field label="Option 2" v-model="quiz.option2" solo></v-text-field>
                          <v-text-field label="Option 3" v-model="quiz.option3" solo></v-text-field>
                          <v-text-field label="Option 4" v-model="quiz.option4" solo></v-text-field>
                      <v-flex>
                          <v-radio-group v-model="correct" :mandatory="false" row>
                              <p>Choose Correct Answer</p>
                              <v-radio class="ml-4" label="Option 1" :value="quiz.option1"></v-radio>
                              <v-spacer></v-spacer>
                              <v-radio class="ml-4" label="Option 2" :value="quiz.option2"></v-radio>
                              <v-spacer></v-spacer>
                              <v-radio class="ml-4" label="Option 3" :value="quiz.option3"></v-radio>
                              <v-spacer></v-spacer>
                              <v-radio class="ml-4" label="Option 4" :value="quiz.option4"></v-radio>
                          </v-radio-group>
                          <v-btn class="indigo" block dark type="submit">Add</v-btn>
                      </v-flex>
                      </form>
                  </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
    middleware: 'auth',
    data(){
        return{
            quiz:{
                question:'',
                option1:'',
                option2:'',
                option3:'',
                option4:''
            },
            correct:''
        }
    },
    methods:{
        store(){
            this.$axios.post(`/question.json`, this.quiz)
            .then(res => {
                // console.log(res.data)
                this.storeAnswer(res.data.name)
            })
            .catch((err) => {
                console.log(error.response.data)
            })
        },
        storeAnswer(id){
            this.$axios.post(`/answer.json`,{
                question_id: id,
                answer:this.correct
            })
            .then((res) => {
                // console.log(res)
                this.$router.push('/admin/quiz')
            })
            .catch((err) => {
                console.log(error.response.data)
            })
        }
    }
}
</script>

<style>

</style>