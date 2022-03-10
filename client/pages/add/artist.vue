<template>
    <div class="p-10 text-white">
        <div class="border-b border-white flex justify-between pb-3">
            <div class="flex space-x-2">
                <NuxtLink class="my-auto" :to="`/`">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
                </NuxtLink>
                <h2 class="text-2xl font-semibold my-auto">
                    Edition Artist
                </h2>
            </div>
            <button @click="editArtist()" class="bg-red-700 p-5 py-2 rounded-lg Card hover:bg-red-900">Confirm</button>
        </div>
        <section>
            <div class="flex flex-col lg:flex-row justify-center space-y-10 lg:space-y-0 lg:space-x-5 py-7">
                <div class="w-full lg:w-auto">
                    <button 
                        @click="launchImageFile"
                        :disabled="isUploadingImage"
                        type="button"
                        class="w-full h-full lg:w-auto lg:h-auto rounded-b focus:outline-none"
                    >
                        <img 
                            
                            :src="artist.image" 
                            :alt="artist.name" 
                            class="w-[50%] h-[50%] lg:w-auto lg:h-auto object-cover rounded mx-auto"
                        />
                    </button>
                    <input
                        ref="imageFile"
                        @change.prevent="uploadImageFile($event.target.files)"
                        type="file"
                        accept="image/png, image/jpeg"
                        class="hidden"
                    />
                </div>
                <div class="grid grid-cols-1 gap-6 w-full">
                    <div class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-2">
                        <span class="my-auto w-28 font-semibold text-lg">Name*</span>
                        <t-input autocomplete="false" type="text" v-model="artist.name" :value="artist.name" placeholder="Artist Name" name="artists-name"/>
                    </div>
                    <div class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-2">
                        <span class="my-auto w-28 font-semibold text-lg">Type</span>
                        <t-select v-model="artist.type" id="artists-type-selector" :options="[{ value: 'SOLO', text: 'Soloist' },{ value: 'GROUP', text: 'Group' },]" ></t-select>
                    </div>
                    <div class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-2">
                        <span class="my-auto w-28 font-semibold text-lg">Members</span>
                        <multiselect
                            v-model="artist.members" 
                            tag-placeholder="Add this as new artists" 
                            placeholder="Search or add a artists" 
                            label="name" 
                            track-by="id" 
                            :options="artistList" 
                            :close-on-select="false"
                            :clear-on-select="false"
                            :preserve-search="false"
                            :multiple="true" 
                            :taggable="true"
                            @tag="addMember">
                            <template slot="option" slot-scope="props">
                                <div class="flex space-x-5">
                                    <div class="option__desc flex space-x-1">
                                        <span class="option__title">{{ props.option.name }}</span>
                                        <div class="flex space-x-1"><div class="space-x-1"><span v-for="(group, index) in props.option.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs text-black-one">{{group.name}}</span></div></div>
                                    </div>
                                </div>
                            </template>
                        </multiselect>
                    </div>
                    <div class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-2">
                        <span class="my-auto w-28 font-semibold text-lg">Groups</span>
                        <multiselect
                            v-model="artist.groups" 
                            tag-placeholder="Add this as new groups" 
                            placeholder="Search or add a groups" 
                            label="name" 
                            track-by="id" 
                            :options="artistList" 
                            :close-on-select="false"
                            :clear-on-select="false"
                            :preserve-search="false"
                            :multiple="true" 
                            :taggable="true"
                            @tag="addGroup">
                            <template slot="option" slot-scope="props">
                                <div class="flex space-x-1">
                                    <div class="option__desc flex space-x-1">
                                        <span class="option__title">{{ props.option.name }}</span>
                                        <div class="flex space-x-1"><div class="space-x-1"><span v-for="(group, index) in props.option.groups" :key="index" class="bg-gray-300 p-1 px-2 rounded text-xs text-black-one">{{group.name}}</span></div></div>
                                    </div>
                                </div>
                            </template>
                        </multiselect>
                    </div>
                    <div class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-2">
                        <span class="my-auto w-28 font-semibold text-lg">Style</span>
                        <multiselect
                            v-model="artist.styles" 
                            tag-placeholder="Add this as new style" 
                            placeholder="Search or add a style"
                            label="name" 
                            track-by="name" 
                            :options="styleList" 
                            :close-on-select="false"
                            :clear-on-select="false"
                            :preserve-search="false"
                            :multiple="true" 
                            :taggable="true"
                            @tag="addStyle"
                        />
                    </div>
                </div>
            </div>

            <div class="flex flex-col space-y-10">
                <div class="flex flex-col space-y-1">
                    <span class="my-auto font-semibold text-lg">Youtube Music ID</span>
                    <t-input autocomplete="false" type="text" v-model="artist.idyoutubemusic" :value="artist.idyoutubemusic" placeholder="Artist idyoutubemusic" name="artists-idyoutubemusic" />
                </div>
                <div class="flex flex-col space-y-1">
                    <span class="my-auto font-semibold text-lg">Description</span>
                    <t-textarea id="desc" placeholder="Description" v-model="artist.description" :value="artist.description" name="description" class="resize w-full h-44"/>
                </div>
                <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-5">
                    <div id="social-media" class="w-full space-y-1">
                        <span class="my-auto font-semibold text-lg">Social Media Link</span>
                        <MultipleInput class="mb-1 w-full" v-for="(elem, index) in artist.socials" :key="index" :elem="elem" @updateinput="updateList(artist.socials, $event, index, 'socials')" @deleteinput="deleteList(artist.socials, index, 'socials')"/>
                        <button @click="addSocials()" class="Card w-full text-left focus:outline-none flex space-x-2 bg-white bg-opacity-30 p-2 justify-center rounded">
                            <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/>
                        </button>
                    </div>
                    <div id="streaming-platform" class="w-full space-y-1">
                        <span class="my-auto font-semibold text-lg">Streaming Platforms Link</span>
                        <MultipleInput class="mb-1 w-full" v-for="(elem, index) in artist.platforms" :key="index" :elem="elem" @updateinput="updateList(artist.platforms, $event, index, 'platforms')" @deleteinput="deleteList(artist.platforms, index, 'platforms')"/>
                        <button @click="addStreamingLink()" class="Card w-full text-left focus:outline-none flex space-x-2 bg-white bg-opacity-30 p-2 justify-center rounded">
                            <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/>
                        </button>
                    </div>
                </div>
                <div id="source" class="flex flex-col space-y-1 w-full text-white">
                    <h1 class="text-white text-xl">Source*</h1>
                    <t-textarea id="source" placeholder="Source" v-model="source" name="source" class="resize w-full h-20"/>
                </div>
                <button @click="editArtist()" class="Card px-5 py-1 bg-red-700 hover:bg-red-900 text-white rounded">Confirm</button>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {

        data() {
            return {
                artist:{
                    name: null,
                    image: 'https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Freleases.png?alt=media&token=e4b0ae0c-3a5d-4ecd-a745-c4439811dcce',
                    type: 'SOLO',
                    description: null,
                    styles: [],
                    socials: [],
                    platforms: [],
                    groups: [],
                    newGroups: [],
                    members: [],
                    newMembers: [],
                    idspotify: null,
                    idyoutubemusic: null,
                },
                styleList: [],
                artistList: [],
                source:'',
                isUploadingImage: false,
                user: null,
            }
        },

        async asyncData({ $axios }){
            const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists/groups?sortby=name:asc')
            const styleList = await $axios.$get('https://comeback-api.herokuapp.com/styles?sortby=name:asc')

            return {
                artistList,
                styleList,
            }
        },

        mounted(){
            this.user = this.GET_DATA_USER()
        },

        methods:{
            ...mapMutations([
                'SET_DATA_USER',
                'SET_TOKEN_USER',
            ]),

            ...mapGetters([
                'GET_DATA_USER',
            ]),

            async editArtist() {
                if(this.user == null) this.user = this.GET_DATA_USER()
                await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
                    state:'PENDING',
                    method:'POST',
                    endpoint:`/artists`,
                    body: this.artist,
                    currentData: null,
                    userId: this.user.id,
                    source: this.source
                }).then(response=>{
                    this.$toast.success('Thank you, Your edits have been sent for verification', {duration:5000, position:'top-right'})
                    this.$router.push({ path: `/`})
                })
            },

            addStyle (newTag) {
                const tag = {
                    name: newTag,
                }
                if(this.artist.styles == null) {
                    this.artist.styles = [tag]
                } else {
                    this.artist.styles.push(tag)
                }
                this.styleList.push(tag)
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
                this.artistList.push(tag)
                this.artist.groups.push(tag)
                this.artist.newGroups.push(tag)
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
                this.artistList.push(tag)
                this.artist.members.push(tag)
                this.artist.newMembers.push(tag)
            },

            updateList(list, newElem, index, key){
                list[index] = newElem
            },

            deleteList(list, index, key){
                list.splice(index, 1)
            },

            addStreamingLink(){
                if(this.artist.platforms == null) {
                    this.artist.platforms = [""]
                } else {
                    this.artist.platforms.push("")
                }
            },

            addSocials(){
                if(this.artist.socials == null) {
                    this.artist.socials = [""]
                } else {
                    this.artist.socials.push("")
                }
            },

            launchImageFile () {
                this.$refs.imageFile.click()
            },

            uploadImageFile (files) {
                if (!files.length) {
                    return
                }
                let file = files[0]

                if (!file.type.match('image.*')) {
                    alert('Please upload an image.')
                    return
                }

                let metadata = {
                    contentType: file.type
                }

                this.isUploadingImage = true
                
                let imageRef = this.$fire.storage.ref(`images/artist/${new Date()}`)

                let uploadTask = imageRef.put(file, metadata).then((snapshot) => {
                    return snapshot.ref.getDownloadURL().then((url) => {
                        return url
                    })
                }).catch((error) => {
                    console.error(error)
                })
                uploadTask.then((url) => {
                    this.artist.image = url
                    this.isUploadingImage = false
                })
            },
        },
    }
</script>

<style>

</style>