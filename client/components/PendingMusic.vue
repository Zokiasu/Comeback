<template>
    <section id="pending-music-data" class="flex flex-col space-y-2 h-full" v-if="!pending.body.type && !pending.currentData.type">
        <span class="font-semibold">Music Pending</span>
        <span>Name : <span :class="pending.body.name != pending.currentData.name ? 'text-red-500':''">{{pending.currentData.name}}</span> <span v-if="pending.body.name != pending.currentData.name" class="text-green-500">{{pending.body.name}}</span></span>
        <span>Clip : <a :href="pending.currentData.clip" :class="pending.body.clip ? 'text-red-500':''">{{pending.currentData.clip}}</a> <a v-if="pending.body.clip" :href="pending.body.clip" class="text-green-500">{{pending.body.clip}}</a></span>
        <div>
            <span>Source :</span>
            <span> {{pending.source}} </span>
        </div>
    </section>
</template>

<script>
    export default {
        name:'PendingMusic',

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