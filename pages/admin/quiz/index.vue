<template>
  <v-container>
      <v-layout>
          <v-flex xs12>
              <v-card>
                  <v-card-title>
                      <h1 class="display-1">All Questions</h1>
                      <v-spacer></v-spacer>
                      <n-link to="/admin/quiz/create">
                          <v-btn small color="grey darken-2" dark>Add</v-btn>
                      </n-link>    
                  </v-card-title>
                  <v-card-text>
                       <v-data-table
                            :headers="headers"
                            :items="questions"
                            :items-per-page="5"
                            class="elevation-1"
                        >
                        <template v-slot:item.action="{ item }">
                            <v-icon small @click="destroy(item.id)">mdi-delete</v-icon>
                            <n-link :to="`/admin/quiz/${item.id}`">
                            <v-icon small color="orange">mdi-pencil</v-icon>
                            </n-link>
                        </template>
                        </v-data-table>
                  </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
  export default {
      middleware: 'auth',
    data () {
      return {
        headers: [
          { text: 'Question', value: 'question' },
          { text: 'Option 1', value: 'option1' },
          { text: 'Option 2', value: 'option2' },
          { text: 'Option 3', value: 'option3' },
          { text: 'Option 4', value: 'option4' },
          { text: 'Action', value: 'action' }
        ],
        questions: [],
      }
    },
    created(){
        this.fetchQuestions();
    },
    methods:{
        fetchQuestions(){
            this.$axios.get(`/question.json`)
            .then(res => (
                this.questions = Object.keys(res.data).map((key, index) => {
                    res.data[key].id = key
                    return res.data[key]
                })
            ))
            .catch((err) => {
                console.log(error.response.data)
            })
        },
        destroy(key){
            this.$axios.delete(`/question/${key}.json`)
            .then(res => {
                this.$axios.get(`/answer.json?orderBy="question_id"&startAt="${key}"&endAt="${key}"`)
                .then(res => {
                    const answer_id = Object.keys(res.data)[0]
                    this.$axios.delete(`/answer/${answer_id}.json`)
                    .then(res => this.questions.splice(key))
                })
            })
        }
    }
  }
</script>

<style>

</style>