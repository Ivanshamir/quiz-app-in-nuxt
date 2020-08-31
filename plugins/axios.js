// export default ({ app: { $axios, $cookies } }) => {
//     const token = $cookies.get('token')
//     // if (token) {
//     //   $axios.defaults.params = {}
//     //   $axios.defaults.params.auth = token
//     // }

//         if (token) {
//             $axios.defaults.headers.common['Authorization'] = token;
//     }
   
    
//   }

export default function ({ $axios, $cookies }) {
    const token = $cookies.get('token')
    $axios.interceptors.request.use((config) => {
        config.params = {auth: token}
        return config
      })
  }