<template>
    <section id="pending-release-data" class="flex flex-col space-y-2 h-full" v-if="pending.body.type === 'SINGLE' || pending.body.type === 'ALBUM' || pending.body.type === 'EP' || pending.currentData.type === 'SINGLE' || pending.currentData.type === 'ALBUM' || pending.currentData.type === 'EP'">
        <span id="title" class="font-semibold">Release Pending</span>
        <div id="image" class="flex space-x-5">
            <img v-if="pending.currentData.image" :src="pending.currentData.image" class="w-20 h-20 object-cover" :style="pending.body.image ? 'filter: grayscale(100%);' : ''">
            <img v-if="pending.body.image" :src="pending.body.image" class="w-20 h-20">
        </div>
        <span id="name">Name : <span :class="pending.body.name ? 'text-red-500':''">{{pending.currentData.name}}</span> <span v-if="pending.body.name" class="text-green-500">{{pending.body.name}}</span></span>
        <span id="type">Type : <span :class="pending.body.type ? 'text-red-500':''">{{pending.currentData.type}}</span> <span v-if="pending.body.type" class="text-green-500">{{pending.body.type}}</span></span>
        <span id="date">Date : <span :class="pending.body.date ? 'text-red-500':''">{{pending.currentData.date}}</span> <span v-if="pending.body.date" class="text-green-500">{{pending.body.date}}</span></span>
        <div id="styles">
            <div class="flex space-x-1"><span>Styles :</span><div :class="pending.body.styles ? 'text-red-500':''" class="space-x-1"><span v-for="(style, index) in pending.currentData.styles" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{style}}</span></div></div>
            <div v-if="pending.body.styles" class="text-green-500 space-x-1"><span v-for="(style, index) in pending.body.styles" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{style}}</span></div>
        </div>
        <div id="artist">
            <div class="flex space-x-1"><span>Artists :</span><div :class="pending.body.artists ? 'text-red-500':''" class="space-x-1"><span v-for="(member, index) in pending.currentData.artists" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{member.name}}</span></div></div>
            <div v-if="pending.body.artists" class="text-green-500 space-x-1"><span v-for="(member, index) in pending.body.artists" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs">{{member.name}}</span></div>
        </div>
        <div id="musics">
            <span>Musics :</span>
            <div v-for="(music, index) in pending.currentData.musics" :key="index" :class="pending.body.musics ? 'text-red-500':''" class="grid grid-cols-1 gap-1">
                <span class="bg-gray-300 p-1 px-2 rounded text-xs"> {{music.name}} </span>
                <span v-if="music.clip" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{music.clip}} </span>
            </div>
            <div v-for="(music, index) in pending.body.musics" :key="index" class="text-green-500 space-x-1">
                <span class="bg-gray-300 p-1 px-2 rounded text-xs"> {{music.name}} </span>
                <span v-if="music.clip" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{music.clip}} </span>
            </div>
        </div>
        <div id="platforms">
            <span>Platforms :</span>
            <div :class="pending.body.platforms ? 'text-red-500':''" class="grid grid-cols-1 gap-1"><span v-for="(platform, index) in pending.currentData.platforms" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
            <div v-if="pending.body.platforms" class="text-green-500 grid grid-cols-1 gap-1"><span v-for="(platform, index) in pending.body.platforms" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs"> {{platform}} </span></div>
        </div>
        <div id="source">
            <span>Source :</span>
            <span> {{pending.source}} </span>
        </div>
    </section>
</template>

<script>
    export default {
        name:'PendingRelease',

        props:['pending'],

        data() {
            return {
                pendings: [],

                //Edit ressource
                editArtist:false,
                indexEdit: 0,
                artistList:[],
                styleList:[],
                maxObjectDisplay:20
            }
        },
    
        computed: {
            userData(){
                let utmp = this.$store.state.dataUser
                return utmp
            },
        },

        methods: {

            async accepted(object, index){
                if(object.method == 'PUT'){
                    await this.$axios.put(`https://comeback-api.herokuapp.com${object.endpoint}`, object.body)
                    .then(response => {
                        
                        if(response) this.updateRequest(object, index, "ACCEPTED", this.userData.id)
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else if (object.method == 'POST'){
                    await this.$axios.post(`https://comeback-api.herokuapp.com${object.endpoint}`, object.body)
                    .then(response => {
                        if(response) {
                            this.updateRequest(object, index, "ACCEPTED", this.userData.id)
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },

            async refused(object, index){
                this.updateRequest(object, index, "DENIED", this.userData.id)
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
        },
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