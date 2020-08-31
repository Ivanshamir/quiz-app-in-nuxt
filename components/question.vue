<template>
  <v-card class="mt-4" >
    <v-card-title class="deep-purple lighten-3 white--text">
        <h1 class="headline">{{ item.question }}</h1>
    </v-card-title>

    <v-card-text>
        <v-container>
            <v-radio-group row style="display:block" v-model="choosen">
                <v-radio :label="item.option1" :color="handleColor()" :value="item.option1"></v-radio> <v-spacer></v-spacer>
                <v-radio :label="item.option2" :color="handleColor()" :value="item.option2"></v-radio> <v-spacer></v-spacer>
                <v-radio :label="item.option3" :color="handleColor()" :value="item.option3"></v-radio> <v-spacer></v-spacer>
                <v-radio :label="item.option4" :color="handleColor()" :value="item.option4"></v-radio> 
            </v-radio-group>
            <v-layout>
                <v-btn @click="handleAnswer" color="purple darken-2" dark small outlined>Submit</v-btn>
            </v-layout>
        </v-container>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    props: {
        item: {type: Object, default: () => {}},
        id: {type: String, default: ''}
    },
    data(){
        return{
            choosen: '',
            result: null
        }
    },
    methods:{
        handleAnswer(){
            this.$axios.get(`/answer.json?orderBy="question_id"&startAt="${this.id}"&endAt="${this.id}"`)
            .then(res => {
                this.verifyAnswer(Object.values(res.data)[0].answer)
            })
            .catch((err) => {
                console.log(error.response.data)
            })
        },
        verifyAnswer(res){
            this.result = (res === this.choosen)
            if(this.result){
                this.$notify({
                    group: 'notify',
                    title: 'Success',
                    text: 'Yeee! Correct Answer!!'
                });
            }
        },
        handleColor(){
            if(this.result === null){
                return 'black';
            }
            return this.result ? 'green' : 'red';
        }
    }
}
</script>

<style>

</style>