<template>
  <div class="flex flex-col mx-auto my-auto mt-auto">
    <div class="mx-auto">
      <img loading="lazy" src="../assets/image/logo.png" alt="">
    </div>
    <form 
      action="login" 
      v-on:submit.prevent="authentification()"
      class="flex flex-col space-y-6"
    >
      <div class="flex flex-col space-y-4 text-black">
        <input 
          v-if="signUpOption" 
          type="text"
          v-model="username" 
          placeholder="Username" 
          class="bg-gray-200 mt-1 block w-full px-3 py-2 border border-gray-300 rounded text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"/>
        <input 
          type="email"
          v-model="email" 
          placeholder="Email"
          required="required"
          class="bg-gray-200 mt-1 block w-full px-3 py-2 border border-gray-300 rounded text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"/>
        <input 
          type="password" 
          v-model="password" 
          placeholder="Password" 
          required="required"
          class="bg-gray-200 mt-1 block w-full px-3 py-2 border border-gray-300 rounded text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"/>
        <input 
          v-if="signUpOption" 
          type="password"
          v-model="passwordVerification" 
          placeholder="Password Verification" 
          class="bg-gray-200 mt-1 block w-full px-3 py-2 border border-gray-300 rounded text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"/>
      </div>
      <div class="flex flex-col space-y-4">
        <button type="submit" class="bg-red-700 rounded py-2 text-white font-semibold"> {{ signUpOption? 'Sign Up':'Login' }} </button>
      </div>
    </form>
    <div class="py-5">
      <button @click="signUpOption=!signUpOption" class="text-center text-white hover:text-gray-700">
        {{ signUpOption? 'You have an account? Login':'You don\'t have an account? Register' }}
      </button>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    name: 'Authentification',
    data() {
      return {
        email: '',
        username: '',
        password: '',
        passwordVerification: '',
        signUpOption: false
      }
    },
    methods:{
      ...mapMutations([
          'SET_DATA_USER',
          'SET_TOKEN_USER',
      ]),

      ...mapGetters([
          'GET_DATA_USER',
          'GET_TOKEN_USER',
      ]),

      authentification(){
        if(this.signUpOption) {
          this.signUpAuthentification()
        } else {
          this.loginAuthentification()
        }
      },

      loginAuthentification(){
        this.$fire.auth.signInWithEmailAndPassword(this.email, this.password)
          .then(async (res)=>{
              this.$toast.success('You now are login', {duration:3000, position:'top-right'})
              if(res) {
                this.setStoreData(res.user.uid)
                this.closeModal()
              }
          })
          .catch(error => {
              console.error('Oops...connection error', error) 
              this.$toast.error('Error while authenticating', {duration:3000, position:'top-right'})
              this.$toast.error('Email/Password incorrect', {duration:3000, position:'top-right'})
          })
      },

      signUpAuthentification(){
        if(this.password === this.passwordVerification){
          this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              let data = {
                id: userCredential.user.uid,
                username: this.username,
                email: this.email
              }
              this.$axios.post('https://comeback-api.herokuapp.com/users/auth/signup2', data)
                .then((res) => {
                    if(res){
                      this.$toast.success('Successful signup', {duration:3000, position:'top-right'})
                      this.loginAuthentification()
                    }
                })
                .catch((error) => {
                  this.$toast.error('Oops...Something went wrong', {duration:3000, position:'top-right'})
                  console.error('Oops...connection error', error)
                  this.$toast.error(error.response.data.message, {duration:3000, position:'top-right'})
                })
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              this.$toast.error('Oops...Something went wrong', {duration:3000, position:'top-right'})
              console.error('Oops...connection error', error)
            });
        } else {
          this.$toast.error('Password and password verification are not the same', {duration:3000, position:'top-right'})
        }
      },

      async setStoreData(userId){
        const that = this

        this.$fire.auth.currentUser.getIdToken(true).then(function(idToken){
          that.SET_TOKEN_USER(idToken)
        }).catch(function(error) {
          console.log(error)
        })

        await this.$axios.get(`https://comeback-api.herokuapp.com/users/${userId}`).then((res) => {
          that.SET_DATA_USER(res.data)
        }).catch(function(error) {
          console.log(error)
        })
      },

      closeModal(){
        this.$emit('close')
      }
    }
  }
</script>