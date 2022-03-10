<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full my-auto">
      <div>
        <icons-comeback class="h-33 mx-auto" />
      </div>
      <client-only>
        <form class="mt-8 space-y-6" v-on:submit.prevent="authentification()">
          <input type="hidden" name="remember" value="true"/>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input 
                id="email-address" 
                v-model="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                placeholder="Email address"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input 
                id="password" 
                v-model="password" 
                name="password" 
                type="password"
                required 
                placeholder="Password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                :class="{'rounded-b-md': !signUpOption}" 
              />
            </div>
            <div v-if="signUpOption">
              <label for="password-verification" class="sr-only">Password Verification</label>
              <input 
                id="password-verification" 
                v-model="passwordVerification" 
                name="password-verification" 
                type="password" 
                required 
                placeholder="Password Verification"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div class="space-y-2">
            <button 
              type="submit" 
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  aria-hidden="true"
                  class="h-5 w-5 text-white group-hover:text-red-400">
                  <path 
                    fill-rule="evenodd" 
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              {{ signUpOption? 'Sign Up':'Sign In' }}
            </button>
            <div class="flex items-center justify-center">
              <div class="text-sm flex gap-2 text-red-500">
                <button type="button" @click="signUpOption = !signUpOption" class="font-medium hover:text-red-700 hover-underline-animation">
                  {{ signUpOption ? 'You\'ve an account? Sign in' : 'No Account? Sign up' }}
                </button>
                <p class="font-medium">|</p>
                <a href="#" class="font-medium hover:text-red-700 hover-underline-animation">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
        </form>
      </client-only>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    name: 'Authentification',

    head() {
      return {
        title: "Student Exchange Finder - Authentification.",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Trouver l\'université dont vous avez besoin et devenez un Studeler.',
          }
        ]
      }
    },

    data () {
      return {
        email: '',
        password: '',
        passwordVerification: '',
        signUpOption: false
      }
    },

    mounted() {
      console.log('GET_USER', this.GET_USER())
    },

    methods: {
      ...mapMutations([
          'SET_USER',
      ]),

      ...mapGetters([
          'GET_USER',
      ]),

      authentification(){
        if(this.signUpOption) {
          this.signUp()
        } else {
          this.signIn()
        }
      },

      async signIn () {
        this.$fire.auth.signInWithEmailAndPassword(this.email, this.password).then((res) => {
          console.log(res)
        })
      },

      async signUp () {
        this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password).then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>