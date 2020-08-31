<template>
  <v-container>
          <h1 class="display-1 text-center">Weather App</h1>
          <v-flex xs-12>
              <v-card color="blue-grey darken-2" dark> 
                <v-card-text>
                    <v-layout justify-center>
                        <v-flex xs-4 >
                            <h4 class="text-center">Temperature</h4>
                            <h1 class="display-1 text-center">
                                {{ weather.name }}
                                 <img :src="icon" alt="weather-icon">
                            </h1>
                            <p>
                                <span class="display-1">{{ temp() }} &deg;C
                                </span>
                                <span class="caption ml-4">
                                    {{weather.weather[0].description}}
                                </span>
                            </p>     
                        </v-flex>
                        <v-flex xs-4 >
                            <h4 class="text-center">Wind & Pressure:</h4>
                            <h3 class="headline">
                                Wind: {{weather.wind.speed}} m/s ({{weather.wind.deg}} &deg;C)
                            </h3>   
                            <h3 class="headline mt-4">
                                Humidity: {{weather.main.humidity}} %
                            </h3>   
                            <h3 class="headline mt-4">
                                Pressure: {{weather.main.pressure}} hPa   
                            </h3>   
                        </v-flex>
                        <v-flex xs-4 >
                            <h4 class="text-center">Other:</h4>
                            <h3 class="headline mt-4">
                                Max Temperature: {{ Math.round(weather.main.temp_max - 273)}} &deg;C
                            </h3>   
                            <h3 class="headline mt-4">
                                Min Temperature: {{ Math.round(weather.main.temp_min - 273)}} &deg;C
                            </h3>   
                        </v-flex>
                    </v-layout>
                </v-card-text>
              </v-card>
          </v-flex>
          <v-flex xs12>
              <v-form @submit.prevent="getWeatherInfo">        
                <v-text-field v-model="city" label="Enter City Name" solo></v-text-field>
              </v-form>
          </v-flex>
  </v-container>
</template>

<script>
import {mapState} from 'vuex';
export default {
    // data(){
    //     return{
    //         city: "london",
    //         // weather: {}
    //     }
    // },
    fetch ({ store, $axios }) {
        return store.dispatch('weather/getWeatherInfo');
    },
    computed:{
        // weather(){
        //     return this.$store.state.weather.weather
        // },
        ...mapState('weather', ['weather']),
        city:{
            get(){
                return this.$store.state.weather.city
            },
            set(value){
                this.$store.commit('weather/setCity', value);
            }
        },
        icon(){
            return `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}.png`
        }
    },
    methods:{
        getWeatherInfo(){
            this.$store.dispatch('weather/getWeatherInfo');
        },
        temp(){
            return Math.round(this.weather.main.temp - 273);
        }
    }
}
</script>

<style>

</style>