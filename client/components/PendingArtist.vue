<template>
    <section class="space-y-1">
        <span>Artist Pending</span>
        <div id="image" class="flex flex-row space-x-5">
            <img loading="lazy" v-if="pending.currentData && pending.currentData.image" :src="pending.currentData.image" class="w-28 h-28 object-cover" alt="Old image">
            <div v-if="pending.currentData && pending.currentData.image && pending.body.image" class="my-auto">
                <svg class="my-auto" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
            </div>
            <img loading="lazy" v-if="pending.body.image" :src="pending.body.image" class="w-28 h-28 object-cover" alt="New image">
        </div>
        <div id="name" class="flex flex-col">
            <span v-if="pending.currentData && pending.currentData.name" :class="pending.body.name && (pending.currentData && pending.body.name) ? 'text-red-500':''">Old Name : {{pending.body.name}}</span>
            <span :class="pending.body.name && (pending.currentData && pending.body.name) ? 'text-green-500':''"><span v-if="pending.currentData && pending.body.name">New </span>Name : {{pending.body.name}}</span>
        </div>
        <div id="type" class="flex flex-col">
            <span v-if="pending.currentData && pending.currentData.type" :class="pending.body.type && (pending.currentData && pending.body.type) ? 'text-red-500':''">Old Type : {{pending.currentData.type}}</span>
            <span v-if="pending.body.type" :class="pending.body.type && (pending.currentData && pending.body.type) ? 'text-green-500':''"><span v-if="pending.currentData && pending.currentData.type">New </span>Type : {{pending.body.type}}</span>
        </div>
        <div id="style" class="flex flex-col space-y-2">
            <div v-if="pending.currentData && pending.currentData.styles" class="flex space-x-1">
                <span class="my-auto">Old Style :</span>
                <span v-for="(style, index) in pending.currentData.styles" :key="index" class="text-sm text-white p-1 px-2 rounded" :class="pending.body.styles && (pending.currentData && pending.body.styles) ? 'bg-red-500':'bg-gray-500'">{{style.name}}</span>
            </div>
            <div v-if="pending.body.styles" class="flex space-x-1">
                <span class="my-auto"><span v-if="pending.currentData && pending.body.styles">New </span>Style :</span>
                <span v-for="(style, index) in pending.body.styles" :key="index" class="text-sm text-white p-1 px-2 rounded" :class="pending.body.styles && (pending.currentData && pending.body.styles) ? 'bg-green-500':'bg-gray-500'">{{style.name}}</span>
            </div>
        </div>
        <div id="description" class="flex flex-col">
            <div v-if="pending.currentData && pending.currentData.description" class="flex flex-col">
                <span class="my-auto">Old Description :</span>
                <span class="text-sm text-white" :class="pending.body.description && (pending.currentData && pending.body.description) ? 'text-red-500':''">{{pending.currentData.description}}</span>
            </div>
            <div v-if="pending.body.description" class="flex flex-col">
                <span class="my-auto"><span v-if="pending.currentData && pending.body.description">New </span>Description :</span>
                <span class="text-sm text-white" :class="pending.body.description && (pending.currentData && pending.body.description) ? 'text-green-500':''">{{pending.body.description}}</span>
            </div>
        </div>
        <div id="groups" class="flex flex-col space-y-2">
            <div v-if="pending.currentData && pending.currentData.groups" class="flex space-x-1">
                <span class="my-auto">Old Groups :</span>
                <span v-for="(group, index) in pending.currentData.groups" :key="index" class="text-sm text-white p-1 px-2 rounded" :class="pending.body.groups && (pending.currentData && pending.body.groups) ? 'bg-red-500':'bg-gray-500'">{{group.name}}</span>
            </div>
            <div v-if="pending.body.groups" class="flex space-x-1">
                <span class="my-auto"><span v-if="pending.currentData && pending.body.groups">New </span>Groups :</span>
                <span v-for="(group, index) in pending.body.groups" :key="index" class="text-sm text-white p-1 px-2 rounded" :class="pending.body.groups && (pending.currentData && pending.body.groups) ? 'bg-green-500':'bg-gray-500'">{{group.name}}</span>
            </div>
        </div>
        <div id="members" class="flex flex-col space-y-2">
            <div v-if="pending.currentData && pending.currentData.members" class="flex space-x-1">
                <span class="my-auto">Old Members :</span>
                <span v-for="(member, index) in pending.currentData.members" :key="index" class="text-sm text-white p-1 px-2 rounded" :class="pending.body.members && (pending.currentData && pending.body.members) ? 'bg-red-500':'bg-gray-500'">{{member.name}}</span>
            </div>
            <div v-if="pending.body.members" class="flex space-x-1">
                <span class="my-auto"><span v-if="pending.currentData && pending.body.members">New </span>Members :</span>
                <span v-for="(member, index) in pending.body.members" :key="index" class="text-sm text-white p-1 px-2 rounded" :class="pending.body.members && (pending.currentData && pending.body.members) ? 'bg-green-500':'bg-gray-500'">{{member.name}}</span>
            </div>
        </div>
        <div id="socials" class="flex flex-col space-y-2">
            <div v-if="pending.currentData && pending.currentData.socials" class="flex flex-col">
                <span class="my-auto">Old Social :</span>
                <div class="grid grid-cols-1 gap-1">
                    <span v-for="(social, index) in pending.currentData.socials" :key="index" class="text-sm text-white p-1 px-2 rounded" :class="pending.body.socials && (pending.currentData && pending.body.socials) ? 'bg-red-500':'bg-gray-500'">{{social}}</span>
                </div>
            </div>
            <div v-if="pending.body.socials" class="flex flex-col">
                <span class="my-auto"><span v-if="pending.currentData && pending.body.socials">New </span>Social :</span>
                <div class="grid grid-cols-1 gap-1">
                    <span v-for="(social, index) in pending.body.socials" :key="index" class="text-sm text-white p-1 px-2 rounded" :class="pending.body.socials && (pending.currentData && pending.body.socials) ? 'bg-green-500':'bg-gray-500'">{{social}}</span>
                </div>
            </div>
        </div>
        <div id="platforms" class="flex flex-col space-y-2">
            <div v-if="pending.currentData && pending.currentData.platforms" class="flex flex-col">
                <span class="my-auto">Old Platform :</span>
                <div class="grid grid-cols-1 gap-1">
                    <span v-for="(platform, index) in pending.currentData.platforms" :key="index" class="text-sm text-white p-1 px-2 rounded" :class="pending.body.platforms && (pending.currentData && pending.body.platforms) ? 'bg-red-500':'bg-gray-500'">{{platform}}</span>
                </div>
            </div>
            <div v-if="pending.body.platforms" class="flex flex-col">
                <span class="my-auto"><span v-if="pending.currentData && pending.body.platforms">New </span>Platform :</span>
                <div class="grid grid-cols-1 gap-1">
                    <span v-for="(platform, index) in pending.body.platforms" :key="index" class="text-sm text-white p-1 px-2 rounded" :class="pending.body.platforms && (pending.currentData && pending.body.platforms) ? 'bg-green-500':'bg-gray-500'">{{platform}}</span>
                </div>
            </div>
        </div>
        <div id="source" class="flex flex-col space-y-0.5">
            <span>Source :</span>
            <span> {{pending.source}} </span>
        </div>
    </section>
</template>

<script>
    export default {
        name:'PendingArtist',

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