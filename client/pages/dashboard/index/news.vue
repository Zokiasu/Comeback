<template>
    <div class="p-5 px-10 space-y-3">
        <section id="searchbar" class=" flex w-full justify-start" :class="search ? '':'mb-5'">
            <div id="search-icon" class="bg-opacity-20 bg-gray-500 pr-1 pl-2 rounded-none rounded-l py-1.5">
                <svg class="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path></g></g></svg>
            </div>
            <input @change="updateDateList(true)" id="search-input" type="text" placeholder="Search by username or artistname" v-model="search" class="w-full pl-2 focus:outline-none rounded-r rounded-none bg-opacity-20 bg-gray-500 text-white placeholder-white">
        </section>
        <button v-if="search" @click="search=''; updateDateList(true); " class="text-red-700 focus:outline-none mb-5">Reset</button>
        <section id="page-body" class="flex flex-wrap justify-center">
            <div v-for="(element, index) in this.news" :key="element.id" class="flex flex-col m-2 bg-black-four min-h-full text-white rounded-sm relative p-5 overflow-hidden">
                <div class="flex w-full justify-between mb-2 relative">
                    <div class="flex flex-col">
                        <span class="font-semibold">Created At {{new Date(element.createdAt).toLocaleDateString('en-US', {  month: 'numeric', day: 'numeric', year: 'numeric' })}}</span>
                        <span class="text-sm">{{element.id}}</span>
                    </div>
                    <div class="flex space-x-2 absolute top-0 right-0">
                        <img @click="verifiedNews(element)" class="w-5 h-5 cursor-pointer" src="https://img.icons8.com/material/20/ffffff/checked-2--v2.png"/>
                        <img @click="openEditView(element)" class="w-5 h-5 cursor-pointer" src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/>
                        <img @click="removeNews(element, index)" class="w-5 h-5 cursor-pointer" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                    </div>
                </div>
                <NewsCard class="m-auto" :element="element"/>
            </div>
        </section>

        <InfiniteLoading spinner="spiral" @infinite="infiniteScroll"></InfiniteLoading>
        <div v-if="news.length < 1" class="px-5">
            <span style="background-color: #6B728033" class="text-white w-full flex justify-center rounded p-2">No News found.</span>
        </div>
        
        <Modal
            v-model="editNews" 
            title="Edit News"
            wrapper-class="animate__animated modal-wrapper"
            :modal-style="{'background':'#1F1D1D', 'border-radius': '0.25rem', 'color':'white'}"
            :in-class="`animate__fadeInDown`"
            :out-class="`animate__bounceOut`"
            bg-class="animate__animated"
            :bg-in-class="`animate__fadeInUp`"
            :bg-out-class="`animate__fadeOutDown`">
            <div class="flex flex-col justify-center space-y-2">
                <multiselect
                    v-model="objectModify.artist"
                    placeholder="Please select an artists" 
                    label="name" 
                    track-by="id" 
                    :options="artistList"
                    :close-on-select="true"
                    :clear-on-select="true"
                    :preserve-search="false">
                    <template slot="singleLabel" slot-scope="props">
                        <div class="flex space-x-1">
                            <img v-if="props.option.image" class="option__image w-14 h-14 object-cover" :src="props.option.image">
                            <div class="option__desc flex flex-col space-y-1">
                                <span class="option__title">{{ props.option.name }}</span>
                                <div class="flex space-x-1"><div class="space-x-1"><span v-for="(group, index) in props.option.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                            </div>
                        </div>
                    </template>
                    <template slot="option" slot-scope="props">
                        <div class="flex space-x-1">
                            <img v-if="props.option.image" class="option__image w-14 h-14 object-cover" :src="props.option.image">
                            <div class="option__desc flex flex-col space-y-1">
                                <span class="option__title">{{ props.option.name }}</span>
                                <div class="flex space-x-1"><div class="space-x-1"><span v-for="(group, index) in props.option.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{group.name}}</span></div></div>
                            </div>
                        </div>
                    </template>
                </multiselect>
                <t-datepicker
                    class="text-black"
                    v-model="objectModify.date"
                    placeholder="Date"
                    initial-view="month" dateFormat='Y-m-d' clearable>
                </t-datepicker>
                <t-input class="w-full" type="text" v-model="objectModify.message"/>
                <button @click="editObjectNews(objectModify)" class="bg-red-700 hover:bg-red-900 text-white py-2">Confirm</button>
            </div>
        </Modal>
    </div>
</template>

<script>

    export default {
        name:'ArtistList',

        data() {
            return {
                search: '',
                news: [],
                maxObjectDisplay:0,
                enough: false,

                editNews: false,

                objectModify:{},

                artistList:[],
            }
        },
    
        computed: {
            userId(){
                let utmp = this.$store.state.dataUser
                return utmp.id
            },
        },

        async asyncData({ $axios }){
            const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists/groups?sortby=name:asc')
            return {artistList}
        },

        methods:{
            infiniteScroll($state) {
                let artTmp = []
                setTimeout(() => {
                    artTmp = artTmp.concat(this.news)
                    this.$axios.get(`https://comeback-api.herokuapp.com/infos?sortby=createdAt:desc&limit=10&offset=${this.maxObjectDisplay}`).then(response => {
                        if(response.data.length > 0) {
                            artTmp = artTmp.concat(response.data)
                            this.news = [...new Set(artTmp)]
                            this.maxObjectDisplay = this.maxObjectDisplay + 10
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
                if(reset) {
                    this.maxObjectDisplay = 0
                    const {data: response} = await this.$axios.get(`https://comeback-api.herokuapp.com/infos?sortby=createdAt:desc&limit=5&offset=${this.maxObjectDisplay}`)
                    if(response.length > 0) {
                        artTmp = artTmp.concat(response)
                        this.news = [...new Set(artTmp)] //Remove all double entry
                        if(response.length < 20) {
                            this.enough = true
                        } else {
                            this.maxObjectDisplay = this.maxObjectDisplay + 20
                        }
                    } else {
                        this.enough = true
                    }
                } else {
                    artTmp = artTmp.concat(this.news)
                    const {data: response} = await this.$axios.get(`https://comeback-api.herokuapp.com/infos?sortby=createdAt:desc&limit=5&offset=${this.maxObjectDisplay}`)
                    if(response.length > 0) {
                        artTmp = artTmp.concat(response) //Add next element into actual list
                        this.news = [...new Set(artTmp)] //Remove all double entry
                        this.maxObjectDisplay = this.maxObjectDisplay + 20
                    } else {
                        this.enough = true
                    }
                }
            },

            openEditView(object){
                this.objectModify = object
                this.editNews = !this.editNews
            },

            async verifiedNews(object){
                object.verified = !object.verified
                await this.$axios.put(`https://comeback-api.herokuapp.com/infos/${object.id}`, object).then(response=>{
                    this.$toast.error('News verified has been changed', {duration:2000, position:'top-right'})
                })
            },

            async editObjectNews(object){
                await this.$axios.put(`https://comeback-api.herokuapp.com/infos/${object.id}`, object).then(response => {
                    this.$toast.error('News has been edited', {duration:2000, position:'top-right'})
                })
                this.editNews = !this.editNews
            },
            
            async removeNews(object, index){
                await this.$axios.delete(`https://comeback-api.herokuapp.com/infos/${object.id}`, object).then(response=>{
                    this.$toast.error('News has been deleted', {duration:2000, position:'top-right'})
                    this.news.splice(index, 1)
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