<template>
    <div class="text-white">
        <div class="background-top relative" :style="{ 'background-image': 'url(' + release.image + ')' }">
            <div class="h-full w-full bg-background bg-opacity-30 flex">
                <div class="flex lg:space-x-10 mt-auto lg:my-auto w-full px-5 md:px-10 lg:px-20 z-50">
                    <div class="relative releaseJacket min-w-max">
                        <img class="h-80 w-80 shadowRelease object-cover object-center" :src="release.image" :alt="release.name"/>
                        <div v-if="userInfo != null && displayLike" id="button" class="absolute right-0 top-0">
                            <button @click="liked ? unfollowRelease() : followRelease()" :class="liked ? '':''" class="flex space-x-0.5 px-2 focus:outline-none rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">
                                <svg v-if="!liked" class="cursor-pointer mt-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#fff"><path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667zM106.1455,115.455c-1.2685,1.14667 -2.37217,2.14283 -3.268,2.98133c-5.38217,5.01667 -11.74617,10.7715 -16.8775,15.3725c-5.13133,-4.601 -11.5025,-10.363 -16.8775,-15.3725c-0.903,-0.8385 -2.00667,-1.84183 -3.268,-2.98133c-10.17667,-9.19483 -37.18783,-33.61883 -37.18783,-54.53833c0,-13.83167 11.25167,-25.08333 25.08333,-25.08333c13.0935,0 20.683,9.1375 20.88367,9.374l11.36633,12.126l11.36633,-12.126c0.07167,-0.09317 7.79017,-9.374 20.88367,-9.374c13.83167,0 25.08333,11.25167 25.08333,25.08333c0,20.9195 -27.01117,45.3435 -37.18783,54.53833z"></path></g></g></svg>
                                <svg v-if="liked" class="cursor-pointer mt-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#fff"><path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667z"></path></g></g></svg>
                            </button>
                        </div>
                    </div>
                    <div class="mt-auto">
                        <NuxtLink v-if="userInfo != null" :to="`/edit/release/${$route.params.id}`" class="mt-auto">Edit</NuxtLink>
                        <h2 class="cursor-default font-semibold filter tShadowRelease text-xl md:text-2xl">{{release.type}} - <span v-for="(artist, index) in release.artists" :key="index"><NuxtLink :to="`/artist/${artist.id}`" class="hover:underline cursor-pointer">{{artist.name}}</NuxtLink><span v-if="index < release.artists.length-1">, </span></span></h2>
                        <h1 class="cursor-default font-semibold filter tShadowRelease text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl">{{release.name}}</h1>
                        <div id="link-social" class="flex flex-row lg:space-x-10 pt-3">
                            <LinkImg class="tShadowRelease" v-for="(platforms, index) in release.platforms" :key="index" :url="platforms" :name="platforms"/>
                        </div>
                    </div>
                </div>
                <div class="gradient w-full h-32 font-bold absolute bottom-0"></div>
            </div>
        </div>
        <div class="py-5 lg:p-10">
            <div class="flex justify-between border-b border-white px-5 pr-8 pb-1">
                <span>TITLE</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 15.5842V8.41583C9.5 8.02025 9.93762 7.78133 10.2704 7.99524L15.8458 11.5794C16.1519 11.7762 16.1519 12.2238 15.8458 12.4206L10.2704 16.0048C9.93762 16.2187 9.5 15.9798 9.5 15.5842Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="white"/>
                </svg>
            </div>
            <div class="space-y-1">
                <TitleRelease v-for="title in release.musics" :key="title.id" :title="title" ref="title"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {

        head() {
            return {
                title: this.release.name,
            }
        },

        data() {
            return {
                release: null,
                liked:false,
                displayLike: false,
                userInfo: null,
            }
        },

        async asyncData({ $axios, params }){
            const release = await $axios.$get(`https://comeback-api.herokuapp.com/releases/${params.id}`)
            return {release}
        },

        mounted(){
            this.userInfo = this.GET_DATA_USER()

            if(this.userInfo) {
                this.release.followers.forEach(element => {
                    if(element.id == this.userInfo.id) {
                        this.liked = true
                    }
                })
                this.displayLike = true
            } else {
                const that = this
                this.$fire.auth.onAuthStateChanged(async function (users) {
                    if (users != null) {
                        this.displayLike = true
                        await that.setStoreData(users.uid)
                        that.userInfo = that.GET_DATA_USER()
                        that.release.followers.forEach(element => {
                            if(element.id == users.uid) {
                                that.liked = true
                            }
                        })
                    }
                })
            }
        },

        methods:{
            ...mapMutations([
                'SET_DATA_USER',
                'SET_TOKEN_USER',
            ]),

            ...mapGetters([
                'GET_DATA_USER',
            ]),

            async followRelease() {
                this.liked = true
                this.userInfo = this.GET_DATA_USER()
                await this.$axios.put(`https://comeback-api.herokuapp.com/users/${this.userInfo.id}`, { releases: [this.release] }).then(response => {
                    this.$toast.info('You are now following ' + this.release.name, {duration:2000, position:'bottom-left'})
                }).catch(function (error) {
                    console.log(error);
                });
            },

            async unfollowRelease() {
                this.liked = false
                this.userInfo = this.GET_DATA_USER()
                await this.$axios.delete(`https://comeback-api.herokuapp.com/users/${this.userInfo.id}/releases/${this.release.id}`, this.release).then(response => {
                    this.$toast.info('You are now unfollowing ' + this.release.name, {duration:2000, position:'top-center'})
                }).catch(function (error) {
                    console.log(error);
                });
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
                    that.userInfo = that.GET_DATA_USER()
                })
            },
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
    background-position: 50% 5%;
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
