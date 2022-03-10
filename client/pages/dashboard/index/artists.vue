<template>
    <div class="p-5 px-10 space-y-5">
        <section id="searchbar" class=" flex w-full justify-start" :class="search ? '':'mb-5'">
            <div id="search-icon" class="bg-opacity-20 bg-gray-500 pr-1 pl-2 rounded-none rounded-l py-1.5">
                <svg class="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path></g></g></svg>
            </div>
            <input @change="updateDateList(true)" id="search-input" type="text" placeholder="Search" v-model="search" class="w-full pl-2 focus:outline-none rounded-r rounded-none bg-opacity-20 bg-gray-500 text-white placeholder-white">
        </section>
        <div class="flex space-x-5 text-white">
            <button @click="filterType('')">ALL</button>
            <button @click="filterType('GROUP')">GROUP</button>
            <button @click="filterType('SOLO')">SOLIST</button>
        </div>
        <button v-if="search" @click="search=''; updateDateList(true); " class="text-red-700 focus:outline-none mb-5">Reset</button>
        <section v-if="artists.length > 0" id="page-body" class="pb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            <div v-for="(artist, index) in this.artists" :key="index" style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden">
                <span class="absolute text-white bottom-0 right-0 bg-gray-900 px-2">{{index}}</span>
                <div class="flex absolute right-2 top-3 space-x-2">
                    <NuxtLink :to="`/edit/artist/${artist.id}`" target="_blank"><img loading="lazy" src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>
                    <img v-if="adminCheck" loading="lazy" class="cursor-pointer" @click="removeArtist(artist, index)" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                </div>
                <div class="flex space-x-2 mb-2">
                    <img loading="lazy" :src="artist.releases ? artist.releases[0].image : artist.image" class="w-20 h-20 object-cover" alt="">
                    <div class="flex flex-col justify-between">
                        <div class="flex space-x-2">
                            <span class="font-semibold text-xl"><NuxtLink :to="`/artist/${artist.id}`" target="_blank" class="hover:underline">{{artist.name}} <span v-if="artist.groups.length > 0">[{{artist.groups[0].name}}]</span></NuxtLink> -</span>
                            <span class="text-base mt-1">{{((artist.type).charAt(0).toUpperCase() + (artist.type).slice(1))}} </span>
                        </div>
                        <div class="flex space-x-2">
                            <a v-for="(social, index) in artist.socials" :key="index" :href="social" target="_blank"><img class="w-4" :src="`https://www.google.com/s2/favicons?domain=${social}`"/></a>
                            <span v-if="!artist.socials" class="text-red-500"> No Social Media </span>
                        </div>
                        <div class="flex space-x-2">
                            <a v-for="(platforms, index) in artist.platforms" :key="index" :href="platforms" target="_blank"><img class="w-4" :src="`https://www.google.com/s2/favicons?domain=${platforms}`"/></a>
                            <span v-if="!artist.platforms" class="text-red-500"> No Streaming Platforms </span>
                        </div>
                    </div>
                </div>
                <div class="space-x-1">
                    <span v-for="(style, index) in artist.styles" :key="index" class="bg-gray-500 p-1 px-2 rounded text-xs"> {{style.name}} </span>
                    <span v-if="artist.styles.length < 1" class="text-red-500"> No styles </span>
                </div>
                <div>
                    <span v-if="artist.description" class="truncate hover:overflow-ellipsis break-words overflow-wrap block"> {{artist.description}} </span>
                    <span v-if="!artist.description" class="text-red-500"> No description </span>
                </div>
            </div>
        </section>
        <InfiniteLoading :identifier="infiniteId" spinner="spiral" @infinite="infiniteScroll"></InfiniteLoading>
        <!--<div v-if="maxObjectDisplay <= artists.length" class="w-full flex justify-center mb-5 text-white">
            <button class=" focus:outline-none" @click="updateDateList(false)">More</button>
        </div>-->
        <div v-if="artists.length < 1" class="px-5">
            <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">No Artist found.</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'ArtistList',

        data() {
            return {
                search: '',
                typeFilter: '',
                artists: [],
                maxObjectDisplay:0,
                enough: false,
                infiniteId: +new Date(),
            }
        },
    
        computed: {
            adminCheck(){
                return this.adminChecker()
            }
        },

        methods:{
            changeType() {
                this.infiniteId += 1;
            },

            filterType(filter){
                this.typeFilter = filter
                this.updateDateList(true)
            },

            infiniteScroll($state) {
                let artTmp = []
                let url = ''
                setTimeout(() => {
                    if(this.artists.length >= 20) artTmp = artTmp.concat(this.artists)
                    url = `https://comeback-api.herokuapp.com/artists/groups?sortby=name&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxObjectDisplay}`
                    if(this.typeFilter != '') url = `https://comeback-api.herokuapp.com/artists/groups?sortby=name&type=${this.typeFilter}&limit=20&offset=${this.maxObjectDisplay}`
                    this.$axios.get(`${url}`).then(response => {
                        if(response.data.length > 0) {
                            artTmp = artTmp.concat(response.data)
                            this.artists = [...new Set(artTmp)]
                            this.maxObjectDisplay = this.maxObjectDisplay + 20
                            $state.loaded();
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

            async updateDateList(reset){
                let artTmp = []
                let url = ''
                if(reset) {
                    this.maxObjectDisplay = 0
                    url = `https://comeback-api.herokuapp.com/artists/groups?sortby=name&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxObjectDisplay}`
                    if(this.typeFilter != '') url = `https://comeback-api.herokuapp.com/artists/groups?sortby=name&type=${this.typeFilter}&limit=20&offset=${this.maxObjectDisplay}`
                    const {data: response} = await this.$axios.get(`${url}`)
                    if(response.length > 0) {
                        artTmp = artTmp.concat(response)
                        this.artists = [...new Set(artTmp)] //Remove all double entry
                        if(response.length < 20) {
                            this.enough = true
                        } else {
                            this.maxObjectDisplay = this.maxObjectDisplay + 20
                        }
                    } else {
                        this.enough = true
                    }
                } else {
                    artTmp = artTmp.concat(this.artists)
                    url = `https://comeback-api.herokuapp.com/artists/groups?sortby=name&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxObjectDisplay}`
                    if(this.typeFilter != '') url = `https://comeback-api.herokuapp.com/artists/groups?sortby=name&type=${this.typeFilter}&limit=20&offset=${this.maxObjectDisplay}`
                    const {data: response} = await this.$axios.get(`${url}`)
                    if(response.length > 0) {
                        artTmp = artTmp.concat(response) //Add next artist into actual list
                        this.artists = [...new Set(artTmp)] //Remove all double entry
                        this.maxObjectDisplay = this.maxObjectDisplay + 20
                    } else {
                        this.enough = true
                    }
                }
                this.changeType()
            },
            
            async removeArtist(object, index){
                await this.$axios.delete(`https://comeback-api.herokuapp.com/artists/${object.id}`, object).then(response=>{
                    this.$toast.error(this.artists[index].name + ' has been deleted', {duration:2000, position:'top-right'})
                    this.artists.splice(index, 1)
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