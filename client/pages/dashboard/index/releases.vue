<template>
    <div class="p-5 px-10 space-y-5">
        <section id="searchbar" class=" flex w-full justify-start" :class="search ? '':'mb-5'">
            <div id="search-icon" class="bg-opacity-20 bg-gray-500 pr-1 pl-2 rounded-none rounded-l py-1.5">
                <svg class="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path></g></g></svg>
            </div>
            <input @change="updateDateList()" id="search-input" type="text" placeholder="Search" v-model="search" class="w-full pl-2 focus:outline-none rounded-r rounded-none bg-opacity-20 bg-gray-500 text-white placeholder-white">
        </section>
        <button @click="test()" class="p-5 border border-white">DELETE</button>
        <button v-if="search" @click="search=''; updateDateList(); " class="text-red-700 focus:outline-none mb-5">Reset</button>
        <section v-if="releases.length > 0" id="releases-body" class="pb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
            <div v-for="(release, index) in this.releases" :key="index" style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden">
                <span class="absolute text-white bottom-0 right-0 bg-gray-900 px-2 z-50">{{index}}</span>
                <div class="flex 2xl:absolute mb-2 2xl:mb-0 right-2 top-3 space-x-2">
                    <NuxtLink :to="`/edit/release/${release.id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>
                    <img v-if="adminCheck" class="cursor-pointer" @click="removeRelease(release.id, releases[release.place], index)" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                </div>
                <div class="flex space-x-2">
                    <img :src="release.releases ? release.releases[0].image : release.image" class="w-20 h-20 object-cover" alt="">
                    <div class="flex flex-col -mt-1">
                        <div class="flex space-x-2 mb-1.5">
                            <span class="font-semibold text-lg"><NuxtLink :to="`/release/${release.id}`" target="_blank" class="hover:underline">{{release.name}}</NuxtLink></span>
                        </div>
                        <div class="mb-1.5">
                            <span>{{((release.type).charAt(0).toUpperCase() + (release.type).slice(1))}} - {{new Date(release.date).toLocaleDateString('en-EN', {  month: 'long', day: 'numeric', year: 'numeric' })}} </span>
                        </div>
                        <div class="flex space-x-2">
                            <a v-for="(platforms, index) in release.platforms" :key="index" :href="platforms" target="_blank"><img class="w-4" :src="`https://www.google.com/s2/favicons?domain=${platforms}`"/></a>
                            <span v-if="!release.platforms" class="text-red-500"> No Streaming Platforms </span>
                        </div>
                    </div>
                </div>
                <div class="mb-2">
                    <span v-for="(style, index) in release.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{style.name}} </span>
                    <span v-if="!release.styles" class="text-red-500"> No styles </span>
                </div>
                <span class="font-semibold text-gray-400">Artists :</span>
                <div class="mb-5">
                    <span v-for="(artist, index) in release.artists" :key="index" class="rounded">{{artist.name}}<span v-if="index < release.artists.length-1">, </span></span>
                    <span v-if="!release.artists" class="text-red-500"> No Artists </span>
                </div>
                <span class="font-semibold text-gray-400">Tracklist :</span>
                <div v-if="release.musics" class="grid grid-cols-1 gap-y-1">
                    <span v-for="(music, index) in release.musics" :key="index" class="rounded truncate text-sm">{{music.name}}</span>
                </div>
                <div v-else class="grid grid-cols-1 gap-y-1">
                    <span class="text-red-500"> No Musics </span>
                </div>
            </div>
        </section>
        <InfiniteLoading spinner="spiral" @infinite="infiniteScroll"></InfiniteLoading>
        <div v-if="releases.length < 1" class="px-5">
            <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">No Release found.</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'ReleaseList',

        data() {
            return {
                search: '',
                releases: [],
                maxObjectDisplay: 20,
                enough: false,
            }
        },
    
        computed: {
            userId(){
                let utmp = this.$store.state.dataUser
                return utmp.id
            },

            adminCheck(){
                return this.adminChecker()
            }
        },

        methods:{
            infiniteScroll($state) {
                let artTmp = []
                setTimeout(() => {
                    artTmp = artTmp.concat(this.releases)
                    this.$axios.get(`https://comeback-api.herokuapp.com/releases/full?sortby=date&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxObjectDisplay}`).then(response => {
                        if(response.data) {
                            artTmp = artTmp.concat(response.data)
                            this.releases = [...new Set(artTmp)]
                            this.maxObjectDisplay = this.maxObjectDisplay + 20
                            $state.loaded();
                        } else if (!response.data && !artTmp && this.search){
                            this.enough = true
                            $state.complete();
                            this.releases = []
                        } else {
                            this.enough = true
                            $state.complete();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }, 500);
            },

            async updateDateList(){
                let artTmp = []
                this.maxObjectDisplay = 0
                const {data: response} = await this.$axios.get(`https://comeback-api.herokuapp.com/releases/full?sortby=date&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxObjectDisplay}`)
                if(response) {
                    artTmp = artTmp.concat(response)
                    this.releases = [...new Set(artTmp)] //Remove all double entry
                    this.maxObjectDisplay = this.maxObjectDisplay + 20
                    if(response.length < 20) {
                        this.enough = true
                    }
                } else {
                    this.enough = true
                }
            },

            async test(){
                const {data:tests} = await this.$axios.get(`https://comeback-api.herokuapp.com/releases`)
                console.log(tests)
                tests.forEach(async element =>  {
                    await this.$axios.delete(`https://comeback-api.herokuapp.com/releases/${element.id}`).then(response => {
                        console.log(response)
                    })      
                });
            },

            removeRelease(id, object, index){
                this.$axios.delete(`https://comeback-api.herokuapp.com/releases/${id}`, object)
                .then(response=>{
                    this.releases.splice(index, 1)
                })
            },

            async adminChecker(){
                let that = this
                await this.$fire.auth.onAuthStateChanged(async function (user) {
                    if (user != null) {
                        let userData = await that.$axios.$get(`https://comeback-api.herokuapp.com/users/${user.uid}`)
                        if(userData.role != "NONE") {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                })
            },
        },
    }
</script>