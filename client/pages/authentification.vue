<template>
  <div class="w-full px-5">
    <div class="mx-auto max-w-md translate-y-2/3">
      <div>
        <icons-comeback class="h-33 mx-auto" />
      </div>
      <client-only>
        <form class="mt-8 space-y-6" @submit.prevent="authentification()">
          <input type="hidden" name="remember" value="true" />
          <div class="-space-y-px rounded-md shadow-sm">
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
                class="
                  relative
                  block
                  w-full
                  appearance-none
                  rounded-none rounded-t-md
                  border border-gray-300
                  px-3
                  py-2
                  text-gray-900
                  placeholder-gray-500
                  focus:z-10
                  focus:border-red-500
                  focus:outline-none
                  focus:ring-red-500
                  sm:text-sm
                "
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
                class="
                  relative
                  block
                  w-full
                  appearance-none
                  rounded-none
                  border border-gray-300
                  px-3
                  py-2
                  text-gray-900
                  placeholder-gray-500
                  focus:z-10
                  focus:border-red-500
                  focus:outline-none
                  focus:ring-red-500
                  sm:text-sm
                "
                :class="{ 'rounded-b-md': !signUpOption }"
              />
            </div>
            <div v-if="signUpOption">
              <label for="password-verification" class="sr-only"
                >Password Verification</label
              >
              <input
                id="password-verification"
                v-model="passwordVerification"
                name="password-verification"
                type="password"
                required
                placeholder="Password Verification"
                class="
                  relative
                  block
                  w-full
                  appearance-none
                  rounded-none rounded-b-md
                  border border-gray-300
                  px-3
                  py-2
                  text-gray-900
                  placeholder-gray-500
                  focus:z-10
                  focus:border-red-500
                  focus:outline-none
                  focus:ring-red-500
                  sm:text-sm
                "
              />
            </div>
          </div>

          <div class="space-y-2">
            <button
              type="submit"
              class="
                hover:bg-primary
                group
                relative
                flex
                w-full
                justify-center
                rounded-md
                border border-transparent
                bg-red-500
                py-2
                px-4
                text-sm
                font-medium
                text-tertiary
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
                focus:ring-offset-2
              "
            >
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  class="h-5 w-5 text-tertiary group-hover:text-red-400"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              {{ signUpOption ? 'Sign Up' : 'Sign In' }}
            </button>
            <div class="flex items-center justify-center">
              <div class="flex gap-2 text-sm text-red-500">
                <button
                  type="button"
                  class="
                    hover:text-bg-primary hover-underline-animation
                    font-medium
                  "
                  @click="signUpOption = !signUpOption"
                >
                  {{
                    signUpOption
                      ? "You've an account? Sign in"
                      : 'No Account? Sign up'
                  }}
                </button>
                <p class="font-medium">|</p>
                <a
                  href="#"
                  class="
                    hover:text-bg-primary hover-underline-animation
                    font-medium
                  "
                >
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
import { mapGetters } from 'vuex'

export default {
  name: 'Authentification',

  data() {
    return {
      email: '',
      password: '',
      passwordVerification: '',
      signUpOption: false,
    }
  },

  head() {
    return {
      title: 'Comeback - Authentification',
    }
  },

  methods: {
    ...mapGetters(['GET_USER']),

    authentification() {
      if (this.signUpOption) {
        this.signUp()
      } else {
        this.signIn()
      }
    },

    signIn() {
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          this.$router.push('/')
        })
    },

    signUp() {
      this.$fire.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          const createUser = this.$fire.functions.httpsCallable('createUser')
          createUser({
            id: res.user.uid,
            name: res.user.uid,
            email: res.user.email,
          })
            .then((result) => {
              this.$toast.success('Thank you, Your account has been created', {
                duration: 5000,
                position: 'top-right',
              })
              this.$router.push('/')
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error)
            })
        })
    },
  },
}
</script>
