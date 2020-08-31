<template>
  <v-container>
      <v-layout>
          <v-flex xs8 offset-xs2> 
              <v-card>
                  <v-card-title>
                      <h1 class="display-1">Update Question</h1>
                      <v-spacer></v-spacer>
                      <n-link to="/admin/quiz">
                        <v-btn small color="grey darken-2" dark>Back</v-btn>
                      </n-link>
                  </v-card-title>
                  <v-card-text>
                      <form @submit.prevent="update">
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
            correct:'',
            answer_id:''
        }
    },
    created(){
        this.get();
        this.getAnswer();
    },
    methods:{
        get(){
            this.$axios.get(`/question.json`, this.$route.params.edit)
            .then(res => this.quiz = res.data[this.$route.params.edit])
            .catch((err) => {
                console.log(error.response.data)
            })
        },
        getAnswer(){
            this.$axios.get(`/answer.json?orderBy="question_id"&startAt="${this.$route.params.edit}"&endAt="${this.$route.params.edit}"`)
            .then(res => {
                this.correct = Object.values(res.data)[0].answer,
                this.answer_id = Object.keys(res.data)[0]
            })
            .catch((err) => {
                console.log(error.response.data)
            })
        },
        update(){
            this.$axios.patch(`/question/${this.$route.params.edit}.json`,this.quiz)
            .then((res) => {
                this.updatecorrect()
            })
            .catch((err) => {
                console.log(error.response.data)
            })
        },
        updatecorrect(){
             this.$axios.patch(`/answer/${this.answer_id}.json`,{
                 'answer': this.correct
             })
            .then((res) => {
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