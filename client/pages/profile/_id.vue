<template>
    <div class="text-white">
        <div class="background-top relative" :style="{ 'background-image': 'url(' + user.avatar + ')' }">
            <div class="h-full w-full bg-background bg-opacity-30 flex">
                <div class="flex flex-col lg:space-y-5 justify-start mt-auto lg:my-auto w-full px-2 md:px-5 lg:px-20 py-16">

                    <div class="flex space-y-5 lg:space-y-0 lg:space-x-10 z-50 mt-auto lg:my-auto">
                        <div class="relative releaseJacket">
                            <img class="h-72 w-72 rounded-xl shadowRelease object-cover object-center" :src="user.avatar" :alt="user.avatar"/>
                        </div>
                        <div class="flex mt-auto">
                            <div class="mt-auto py-5 space-y-5">
                                <div>
                                    <!--<span v-if="userConnected && userConnected.id == user.id" class="text-lg">Edit</span>-->
                                    <h1 class="cursor-default font-semibold filter tShadowRelease text-6xl xl:text-8xl">{{user.username}}</h1>
                                </div>
                                <div>
                                    <span class="bg-dark-gray py-2 px-5 rounded-3xl"> {{user.role}} </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row">
                        <ul class="flex flex-row flex-wrap space-x-5">
                            <li v-if="user.country">
                                <span class="font-semibold">Location :</span>
                                <span> {{user.country}} </span>
                            </li>
                            <li v-if="user.birthday">
                                <span class="font-semibold">Birthday :</span>
                                <span> {{new Date(user.birthday).toLocaleDateString('en-EN', {  month: 'long', day: 'numeric' })}} </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="gradient w-full h-32 font-bold absolute bottom-0"></div>
            </div>
        </div>
        <section>
            <div class="lg:px-20">
                <ul class="grid grid-cols-3 lg:text-2xl">
                    <NuxtLink :to="`/profile/${this.$route.params.id}/general`" class="justify-self-center text-center w-full cursor-pointer py-2" :class="$route.name == 'profile-id-general' ? 'border-b-2 border-red-500 z-50':'border-b border-main-gray'">General</NuxtLink>
                    <NuxtLink :to="`/profile/${this.$route.params.id}/artist`" class="justify-self-center text-center w-full cursor-pointer py-2" :class="$route.name == 'profile-id-artist' ? 'border-b-2 border-red-500 z-50':'border-b border-main-gray'">Artist</NuxtLink>
                    <NuxtLink :to="`/profile/${this.$route.params.id}/release`" class="justify-self-center text-center w-full cursor-pointer py-2" :class="$route.name == 'profile-id-release' ? 'border-b-2 border-red-500 z-50':'border-b border-main-gray'">Release</NuxtLink>
                    <!--<li @click="actualPage = 'Stats'" class="justify-self-center text-center w-full cursor-pointer" :class="actualPage == 'Stats' ? 'border-b-2 border-red-500 z-50':'border-b border-main-gray'">Stats</li>-->
                </ul>
                <NuxtChild />
            </div>
        </section>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        head() {
            return {
                title: this.user.username,
            }
        },

        data() {
            return {
                user: null,
                actualPage: 'General',
                userConnected: null,
            }
        },

        async asyncData({ $axios, params }){
            const user = await $axios.$get(`https://comeback-api.herokuapp.com/users/${params.id}`)
            return {user}
        },

        beforeCreate(){
            if(this.$router.currentRoute.name != 'profile-id-general' && this.$router.currentRoute.name != 'profile-id-artist' && this.$router.currentRoute.name != 'profile-id-release') this.$router.push(`/profile/${this.$route.params.id}/general`)
        },

        mounted(){
            this.userConnected = this.GET_DATA_USER()
        },

        methods:{
            ...mapGetters([
                'GET_DATA_USER',
            ]),
        },
    }
</script>

<style>
@media screen and (max-width: 1024px) {
    .releaseJacket {
        display: none !important;
    }
}

.tShadowRelease{
    text-shadow: 2px 2px 5px rgba(0,0,0,0.50);
}

.shadowRelease{
    --tw-shadow: 5px 5px 5px 5px rgba(0,0,0,0.30);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.background-top{
    height: 30rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-position: 50% 25%;
}
.gradient{
    background: rgb(0,0,0);
    background: -moz-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(31,29,29,1) 96%);
    background: -webkit-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(31,29,29,1) 96%);
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(31,29,29,1) 96%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#1f1d1d",GradientType=1);
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>