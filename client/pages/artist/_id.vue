<template>
    <div class="p-5 lg:p-10 space-y-5 text-white">
        <section class="flex space-x-2 justify-between border-b border-white">
            <h1 class="text-3xl">{{artist.name}}</h1>
            <NuxtLink v-if="userInfo != null" :to="`/edit/artist/${$route.params.id}`" class="mt-auto">Edit</NuxtLink>
        </section>

        <section class="space-y-5 px-3">
            <section id="img-media-streaming-group" class="flex flex-col space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0 relative">
                <div id="image">
                    <img loading="lazy" class="w-full lg:w-96 aspect-video object-cover" :src="artist.image" :alt="artist.name">
                </div>
                <div id="media-streaming-group" class="flex flex-col space-y-3">
                    <div id="social-media" class="space-y-1" v-if="artist.socials.length">
                        <h3 class="text-white text-xl">Social Media</h3>
                        <div id="link-social" class="flex flex-wrap space-x-2">
                            <LinkImg v-for="(media, index) in artist.socials" :key="index" :url="media" :name="media"/>
                        </div>
                    </div>
                    <div id="streaming-platforms" class="space-y-1" v-if="artist.platforms.length">
                        <h3 class="text-white text-xl">Streaming Platforms</h3>
                        <div id="link-streaming" class="flex flex-wrap space-x-2">
                            <LinkImg v-for="(stream, index) in artist.platforms" :key="index" :url="stream" :name="stream"/>
                        </div>
                    </div>
                    <div id="style" class="space-y-2" v-if="artist.styles.length">
                        <h3 class="text-white text-xl">Styles</h3>
                        <div class="space-x-1"><span v-for="(style, index) in artist.styles" :key="index" class="bg-gray-500 text-white p-1 px-2 rounded">{{style.name}}</span></div>
                    </div>
                </div>
                <div v-if="userInfo != null && displayLike" id="button" class="absolute lg:right-0 top-0">
                    <button @click="liked ? unfollowArtist() : followArtist()" :class="liked ? '':''" class="flex space-x-0.5 px-2 focus:outline-none rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:font-bold">
                        <svg v-if="!liked" class="cursor-pointer mt-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#fff"><path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667zM106.1455,115.455c-1.2685,1.14667 -2.37217,2.14283 -3.268,2.98133c-5.38217,5.01667 -11.74617,10.7715 -16.8775,15.3725c-5.13133,-4.601 -11.5025,-10.363 -16.8775,-15.3725c-0.903,-0.8385 -2.00667,-1.84183 -3.268,-2.98133c-10.17667,-9.19483 -37.18783,-33.61883 -37.18783,-54.53833c0,-13.83167 11.25167,-25.08333 25.08333,-25.08333c13.0935,0 20.683,9.1375 20.88367,9.374l11.36633,12.126l11.36633,-12.126c0.07167,-0.09317 7.79017,-9.374 20.88367,-9.374c13.83167,0 25.08333,11.25167 25.08333,25.08333c0,20.9195 -27.01117,45.3435 -37.18783,54.53833z"></path></g></g></svg>
                        <svg v-if="liked" class="cursor-pointer mt-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#fff"><path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667z"></path></g></g></svg>
                    </button>
                </div>
            </section>
            <section class="space-y-5">
                <div id="description" class="space-y-2" v-if="artist.description">
                    <h3 class="text-xl">Description</h3>
                    <v-read-more-box bg-color="#1F1D1D">
                        <button slot="readMore" class="focus:outline-none font-semibold">SHOW MORE</button>
                        <button slot="readLess" class="focus:outline-none font-semibold">SHOW LESS</button>
                        <p class="text-base whitespace-pre-line"> {{artist.description}} </p>
                    </v-read-more-box>
                </div>
                <div id="member" class="space-y-2" v-if="memberslist.length">
                    <h3 class="text-white text-xl">Members ({{memberslist.length}})</h3>
                    <div class="text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-5">
                        <NuxtLink :to="`/artist/${members.id}`" class="p-3 rounded flex flex-col justify-center" v-for="(members, index) in memberslist" :key="index">
                            <div class="mb-0.5">
                                <img loading="lazy" class="Card rounded-full h-10 lg:h-20 w-10 lg:w-20 object-cover mx-auto" :src="members.image" alt="">
                            </div>
                            <span class="w-full h-full text-center xl:text-xl"> {{members.name}} </span>
                        </NuxtLink>
                    </div>
                </div>
                <div id="subunit" class="space-y-2" v-if="subunitlist.length">
                    <h3 class="text-white text-xl">Subunit ({{subunitlist.length}})</h3>
                    <div class="text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-5">
                    <NuxtLink :to="`/artist/${member.id}`" class="Card p-3 rounded flex flex-col justify-center" v-for="(member, index) in subunitlist" :key="index">
                        <div class="mb-0.5">
                        <img loading="lazy" class="rounded h-20 object-cover mx-auto" :src="member.image" alt="">
                        </div>
                        <span class="w-full h-full text-center xl:text-xl"> {{member.name}} </span>
                    </NuxtLink>
                    </div>
                </div>
                <div id="group-unit" class="space-y-1" v-if="artist.groups.length">
                    <h3 class="text-white text-xl">Group's Unit</h3>
                    <div class="flex flex-row">
                        <NuxtLink :to="`/artist/${group.id}`" v-for="(group, index) in artist.groups" :key="index" class="Card p-3 rounded flex flex-col justify-center">
                            <div class="mb-0.5">
                                <img loading="lazy" class="rounded w-20 h-20 object-cover mx-auto" :src="group.image" alt="">
                            </div>
                            <span class="w-full h-full text-center"> {{group.name}} </span>
                        </NuxtLink>
                    </div>
                </div>
                <div id="release-section" class="space-y-2" v-if="artist.releases.length">
                    <h3 class="text-white text-xl">Lastest Releases</h3>
                    <div id="release-list" class="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                    <LazyArtistReleaseCard 
                    v-for="(release, index) in artist.releases" 
                    :key="index" 
                    :release="release" 
                    :imageDefault="artist.image"/>
                    </div>
                </div> 
            </section>
        </section>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        name:"Artist",

        head() {
            return {
                title: this.artist.name,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.artist.description
                    }
                ]
            }
        },

        data(){
            return {
                liked: false,
                displayLike: false,
                seeDescription: false,
                artist: [],
                memberlist: [],
                subunitlist: [],
                userInfo: null,
            }
        },

        async asyncData({ $axios, params }){
            let artist = await $axios.$get(`https://comeback-api.herokuapp.com/artists/${params.id}`)

            artist.releases?.sort(function(a,b){
                if(a.date?.toLowerCase() > b.date?.toLowerCase()) {return -1}
                if(a.date?.toLowerCase() < b.date?.toLowerCase()) {return 1}
                return 0;
            })
            if(artist.socials == null) artist.socials = []
            if(artist.platforms == null) artist.platforms = []
 
            let memberslist = await $axios.$get(`https://comeback-api.herokuapp.com/artists/${params.id}/members?sortby=name`)

            return { artist, memberslist }
        },

        created(){
            this.artist.members.forEach(element => {
                if(element.type === "GROUP") {
                    this.subunitlist.push(element)
                }
            });
        },

        mounted(){
            this.userInfo = this.GET_DATA_USER()
            if(this.userInfo) {
                this.displayLike = true
                this.artist.followers.forEach(element => {
                    if(element.id == this.userInfo.id) {
                        this.liked = true
                    }
                })
            } else {
                const that = this
                this.$fire.auth.onAuthStateChanged(async function (users) {
                    if (users != null) {
                        that.displayLike = true
                        await that.setStoreData(users.uid)
                        that.artist.followers.forEach(element => {
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

            async followArtist() {
                this.liked = true
                await this.$axios.put(`https://comeback-api.herokuapp.com/users/${this.userInfo.id}`, { artists: [this.artist] }).then(response => {
                    this.$toast.info('You are now following ' + this.artist.name, {duration:2000, position:'bottom-left'})
                }).catch(function (error) {
                    console.log(error);
                });
            },

            async unfollowArtist() {
                this.liked = false
                await this.$axios.delete(`https://comeback-api.herokuapp.com/users/${this.userInfo.id}/artists/${this.artist.id}`, this.artist).then(response => {
                    this.$toast.info('You are now following ' + this.artist.name, {duration:2000, position:'bottom-left'})
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
        }
    }
</script>