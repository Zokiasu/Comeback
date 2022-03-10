<template>
    <div class="p-5 px-10 space-y-5">
        <section id="pending-page" class="pb-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div v-for="(pending, index) in this.pendings.slice(0,maxObjectDisplay)" :key="index" style="background-color: #6B728033" class="flex flex-col text-white rounded-sm relative p-3 overflow-hidden space-y-2">
                <section id="pending-type">
                    <span v-if="pending.method == 'POST'">Creation</span>
                    <span v-if="pending.method == 'PUT'">Edition</span>
                    <span v-if="pending.user">by {{pending.user.username}} </span>
                </section>
                <PendingArtist :pending="pending" v-if="pending.body.type === 'SOLO' || pending.body.type === 'GROUP' || pending.currentData.type === 'SOLO' || pending.currentData.type === 'GROUP'"/>
                <PendingRelease :pending="pending" v-else-if="pending.body.type === 'SINGLE' || pending.body.type === 'ALBUM' || pending.body.type === 'EP' || pending.currentData.type === 'SINGLE' || pending.currentData.type === 'ALBUM' || pending.currentData.type === 'EP'"/>
                <PendingMusic :pending="pending" v-else-if="!pending.body.type && !pending.currentData.type && (pending.body.clip || pending.currentData.clip)"/>
                <section v-else>
                    <div class="flex flex-col">
                        <span>Artist to Add : {{pending.body.newArtistName}} </span>
                        <span>News : {{pending.body.message}} </span>
                    </div>
                </section>
                <section id="pending-button" class="flex space-x-3 justify-end">
                    <button @click="editOpen(index)" class="bg-blue-500 px-2 py-1 focus:outline-none hover:bg-blue-700">Edit</button>
                    <button @click="accepted(pending, index)" class="bg-green-500 px-2 py-1 focus:outline-none hover:bg-green-700">Accepted</button>
                    <button @click="refused(pending, index)" class="bg-red-500 px-2 py-1 focus:outline-none hover:bg-red-700">Refused</button>
                </section>
            </div>

            <div v-if="this.pendings.length < 1" style="background-color: #6B728033" class="w-full text-white lg:col-span-2 py-2 rounded-sm flex justify-center">
                <span class="w-full text-center">No new pending</span>
            </div>
        </section>
        <InfiniteLoading spinner="spiral" @infinite="infiniteScroll"></InfiniteLoading>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        name:'Pending',

        data() {
            return {
                pendings: [],

                //Edit ressource
                editArtist:false,
                indexEdit: 0,
                artistList:[],
                styleList:[],
                maxObjectDisplay: 0,
                userInfo: null,
            }
        },

        created(){
            this.userInfo = this.GET_DATA_USER()

            if(!this.userInfo) {
                const that = this
                this.$fire.auth.onAuthStateChanged(async function (users) {
                    if (users != null) {
                        await that.setStoreData(users.uid)
                    }
                })
            }
        },

        async asyncData({ $axios }){
            const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists')
            const styleList = await $axios.$get('https://comeback-api.herokuapp.com/styles')
            return { artistList, styleList }
        },

        methods: {
            ...mapMutations([
                'SET_DATA_USER',
                'SET_TOKEN_USER',
            ]),

            ...mapGetters([
                'GET_DATA_USER',
            ]),

            infiniteScroll($state) {
                let artTmp = []
                setTimeout(() => {
                    artTmp = artTmp.concat(this.pendings)
                    this.$axios.get(`https://comeback-api.herokuapp.com/requests?state=PENDING&limit=20&offset=${this.maxObjectDisplay}`).then(response => {
                        if(response.data.length > 0) {
                            artTmp = artTmp.concat(response.data)
                            this.pendings = [...new Set(artTmp)]
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

            async accepted(object, index){
                if(object.method == 'PUT'){
                    await this.$axios.put(`https://comeback-api.herokuapp.com${object.endpoint}`, object.body)
                    .then(response => {
                        if(response) this.updateRequest(object, index, "ACCEPTED", this.userInfo.id)
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else if (object.method == 'POST'){
                    await this.$axios.post(`https://comeback-api.herokuapp.com${object.endpoint}`, object.body)
                    .then(response => {
                        if(response) {
                            this.updateRequest(object, index, "ACCEPTED", this.userInfo.id)
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },

            async refused(object, index){
                this.updateRequest(object, index, "DENIED", this.userInfo.id)
            },

            async updateRequest(object, index, state, checked_by){
                object.state = state
                object.checked_by = checked_by
                await this.$axios.put(`https://comeback-api.herokuapp.com/requests/${object.id}`, object).then(response => {
                    
                    this.pendings.splice(index, 1)
                    if(state == "ACCEPTED") this.$toast.success('The pending has been accepted', {duration:3000, position:'top-right'})
                    else this.$toast.error('The pending has been refused', {duration:3000, position:'top-right'})
                }).catch(function (error) {
                    console.log(error);
                });
            },

            editByModerator(){
                this.editArtist = false
                this.pendings[this.indexEdit].editedByModerator = true
            },

            updateList(list, newElem, index){
                list[index] = newElem
            },

            deleteList(list, index){
                list.splice(index, 1)
            },

            addStyle (newTag) {
                const tag = {
                    name: newTag,
                }
                if(this.pendings[this.indexEdit].body.styles) {
                    this.pendings[this.indexEdit].body["styles"] = [tag]
                } else {
                    this.pendings[this.indexEdit].body.styles.push(tag)
                }
                this.styleList.push(tag)
            },

            addMember (newTag) {
                const tag = {
                    name: newTag,
                    image: "https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fartists.jpg?alt=media&token=23be3721-5157-45a7-8c0e-e1c03c2e1827",
                    type: 'SOLO',
                    website: null,
                    description: null,
                    socials: null,
                    platforms: null,
                }

                if(this.pendings[this.indexEdit].body.members) {
                    this.pendings[this.indexEdit].body["members"] = [tag]
                } else {
                    this.pendings[this.indexEdit].body.members.push(tag)
                }
                
                this.pendings[this.indexEdit].body.newMembers.push(tag)
            },
            
            addGroup (newTag) {
                const tag = {
                    name: newTag,
                    image: "https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fartists.jpg?alt=media&token=23be3721-5157-45a7-8c0e-e1c03c2e1827",
                    type: 'SOLO',
                    website: null,
                    description: null,
                    socials: null,
                    platforms: null,
                }

                if(this.pendings[this.indexEdit].body.groups) {
                    this.pendings[this.indexEdit].body["groups"] = [tag]
                } else {
                    this.pendings[this.indexEdit].body.groups.push(tag)
                }
                
                this.pendings[this.indexEdit].body.newGroups.push(tag)
            },

            addMusic(){
                this.pendings[this.indexEdit].body.musics.push({
                    id: null,
                    name: null,
                    clip: null,
                    platforms: null,
                })
            },

            addStreamingLink(){
                if(this.pendings[this.indexEdit].body.platforms == null) {
                    this.pendings[this.indexEdit].body.platforms = [""]
                } else {
                    this.pendings[this.indexEdit].body.platforms.push("")
                }
            },
            
            editOpen(index){
                this.editArtist = true
                this.indexEdit = index

                this.pendings[this.indexEdit].body["newGroups"] = []
                this.pendings[this.indexEdit].body["newMembers"] = []
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
            }
        }
    }
</script>

<style>
    .fullscreen-modal {
    width: 100%;
    max-width: 100%;
    top: 0;
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #1F1D1D;
    }
    .fullscreen-modal .vm-titlebar {
    flex-shrink: 0;
    }
    .fullscreen-modal .vm-content {
    padding: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 0; 
    }
    .fullscreen-modal .vm-content .scrollable-content {
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 15px 10px 15px;
    flex-grow: 1;
    }
    .fullscreen-modal .fullscreen-modal-footer {
    border-top: 1px solid #e5e5e5;
    padding: 15px;
    }
</style>