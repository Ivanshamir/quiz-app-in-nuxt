<template>
    <v-container>
        <v-layout>
            <v-flex xs6 offset-xs3>
                <v-card>
                    <v-card-title><h1 class="display-1">Admin Login</h1></v-card-title>
                    <v-card-text>
                        <v-flex xs12> 
                            <v-text-field label="Email" type="email" v-model="email" solo single-line></v-text-field>
                            <v-text-field label="Password" type="password" v-model="password" solo single-line></v-text-field>
                            <v-btn block class="indigo" dark @click="login">Login</v-btn>
                        </v-flex>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>   
</template>

<script>
export default {
    middleware: 'guest',
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods:{
        login(){
            this.$axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_KEY}`,{
                email: this.email,
                password: this.password,
                returnSecureToken:true
            })
            .then(res => this.handleToken(res.data.idToken))
        },
        handleToken(token){
            this.$cookies.set('token', token);
            this.$store.commit('auth/setLoggedIn', true);
            this.$router.push('/admin/quiz');
        }
    }
}
</script>

<style>

</style>