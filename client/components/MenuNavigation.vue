<template>
  <div>
    <nav class="relative bg-gray-500 bg-opacity-10">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button @click="navMenu = !navMenu" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- PC Navigation -->
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <NuxtLink :to="`/`" class="flex-shrink-0 flex items-center">
              <img loading="lazy" class="block lg:hidden h-8 w-auto" src="../assets/image/mini-logo.png" alt="Comeback">
              <img loading="lazy" class="hidden lg:block h-8 w-auto" src="../assets/image/logo.png" alt="Comeback">
            </NuxtLink>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4" @click="userMenu=false">
                <NuxtLink :to="`/`" class="px-3 py-2 rounded-md text-sm font-medium"
                  :class="$route.name != 'index' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
                  Home
                </NuxtLink>
                <NuxtLink :to="`/calendar`" class="px-3 py-2 rounded-md text-sm font-medium"
                  :class="$route.name != 'calendar' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
                  Calendar
                </NuxtLink>
                <NuxtLink :to="`/artist`" class="px-3 py-2 rounded-md text-sm font-medium"
                  :class="$route.name != 'artist' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
                  Artists
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- PC User Menu -->
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div v-if="userConnected" class="hidden lg:flex">
              <button @click="newsModal=true" class="bg-red-700 Card px-3 py-2 rounded-md focus:outline-none text-white flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 my-auto mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>New Comeback</span>
              </button>
            </div>
            <div v-else class="text-white">
              <button @click="authentificationModal=!authentificationModal" class="font-semibold">Login</button>
            </div>
            <!-- Profile dropdown -->
            <div v-if="userConnected" class="ml-3 relative">
              <div>
                <button @click="userMenu = !userMenu" type="button" class="bg-gray-500 bg-opacity-10 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <img loading="lazy" class="h-8 w-8 rounded-full" :src="userAvatar" alt="User avatar">
                </button>
              </div>
              <!--
                Dropdown menu, show/hide based on menu state.
                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
              <div v-if="userMenu" @click="userMenu=false" class="animate__animated animate__pulse origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-black-one text-white focus:outline-none" role="menu">
                <NuxtLink :to="`/profile/${user.id}/general`" class="block px-4 py-2 text-sm hover:bg-gray-700">
                  Your Profile
                </NuxtLink>
                <NuxtLink :to="`/add/artist`" class="block px-4 py-2 text-sm hover:bg-gray-700">
                  Add New Artist
                </NuxtLink>
                <!--<NuxtLink :to="`/calendar`" class="block px-4 py-2 text-sm hover:bg-gray-700">
                  Settings
                </NuxtLink>-->
                <NuxtLink v-if="userConnected && userRole != 'NONE'" :to="`/dashboard`" class="block px-4 py-2 text-sm hover:bg-gray-700">
                  Dashboard
                </NuxtLink>
                <button @click="newsModal=true" class="block px-4 py-2 text-sm hover:bg-gray-700 w-full h-full text-left">
                  New Comeback
                </button>
                <button @click="logout()" class="block px-4 py-2 text-sm hover:bg-gray-700 w-full h-full text-left">
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-if="navMenu" class="animate__animated animate__fadeInDown animate__faster origin-top-right absolute bg-black-one w-full sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1" @click="navMenu=false">
          <NuxtLink :to="`/`" class="block px-3 py-2 rounded-md text-base font-medium"
            :class="$route.name != 'index' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
            Home
          </NuxtLink>
          <NuxtLink :to="`/calendar`" class="block px-3 py-2 rounded-md text-base font-medium"
            :class="$route.name != 'calendar' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
            Calendar
          </NuxtLink>
          <NuxtLink :to="`/artist`" class="block px-3 py-2 rounded-md text-base font-medium"
            :class="$route.name != 'artist' ? 'text-gray-300 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-600 text-white'">
            Artists
          </NuxtLink>
        </div>
      </div>
    </nav>
    <Modal
        v-model="authentificationModal" 
        title="Authentification"
        wrapper-class="animate__animated modal-wrapper"
        :modal-style="{'background':'#1F1D1D', 'border-radius': '0.25rem', 'color':'white'}"
        :in-class="`animate__fadeInDown`"
        :out-class="`animate__bounceOut`"
        bg-class="animate__animated"
        :bg-in-class="`animate__fadeInUp`"
        :bg-out-class="`animate__fadeOutDown`">
        <LazyAuthentification @close="closeAuthentificationModal"/>
    </Modal>
    <Modal
        v-model="newsModal"
        title="Add a News"
        wrapper-class="animate__animated modal-wrapper"
        :modal-style="{'background':'#1F1D1D', 'border-radius': '0.25rem', 'color':'white'}"
        :in-class="`animate__fadeInDown`"
        :out-class="`animate__bounceOut`"
        bg-class="animate__animated"
        :bg-in-class="`animate__fadeInUp`"
        :bg-out-class="`animate__fadeOutDown`">
        <NewsCreation 
          @close="closeNewsModal" 
          :artistList="artist"
        />
    </Modal>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    name:'MenuNavigation',
    
    data() {
      return {
        navMenu: false,
        userMenu: false,
        userConnected: false,

        authentificationModal: false,
        newsModal:false,

        user: null,
        userRole: 'NONE',
        userAvatar: require('@/assets/image/artist.png'),

        artist: null,
      }
    },
    
    async fetch(){
      const { data : tmpArtist } = await this.$axios.get('https://comeback-api.herokuapp.com/artists/groups?sortby=name:asc')
      this.artist = tmpArtist
    },

    async created(){
      let that = this
      await this.$fire.auth.onAuthStateChanged(async function (user) {
        if (user != null) {
          if(user.uid) {
            that.userConnected = true
            await that.setStoreData(user.uid)
          }
        }
      })
    },

    async mounted() {
      this.$toast.info("This website is currently under development, so you may encounter some bugs while using it.", {duration:3000, position:'top-left'})
    },

    methods:{
        ...mapMutations([
            'SET_DATA_USER',
            'SET_TOKEN_USER',
        ]),

        ...mapGetters([
            'GET_DATA_USER',
        ]),

        logout(){
            this.$fire.auth.signOut().then(() => {
                this.$router.push('/')
                this.userConnected = false
                this.userRole = 'NONE'
                this.$toast.error('You are log out!', {duration:3000, position:'top-right'})
                this.SET_DATA_USER(null)
                this.SET_TOKEN_USER(null)
            }).catch((error) => {
                console.log(error)
            })
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
                that.user = that.GET_DATA_USER()
                if(that.user != null) {
                    if(that.user.avatar) that.userAvatar = that.user.avatar
                    that.userRole = that.user.role
                }
            })
        },

        closeAuthentificationModal(){
            this.authentificationModal = false
        },

        closeNewsModal(){
            this.newsModal = false
        },
    },
  }
</script>

<style>
  .modal-custom{background:#1F1D1D; border-radius: 0.25rem; color:white;}
</style>