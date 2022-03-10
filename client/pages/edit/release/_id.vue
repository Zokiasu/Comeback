<template>
    <div class="p-5 lg:p-10 text-white">
        <div class="border-b border-white flex justify-between">
            <div class="flex space-x-2">
                <NuxtLink class="my-auto" :to="`/release/${this.$route.params.id}`">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
                </NuxtLink>
                <h2 class="text-2xl font-semibold my-auto">
                    Edition Release
                </h2>
            </div>
            <button @click="editRelease()" class="Card px-5 py-1 hover:bg-red-700 text-white rounded">Confirm</button>
        </div>
        <section class="lg:px-5">
            <div class="flex flex-col lg:flex-row justify-center space-y-10 lg:space-y-0 lg:space-x-5 py-7">
                <div id="image" class="Card mx-auto">
                    <img class="h-80 lg:w-96 object-cover" :src="release.image" :alt="release.name">
                    <div class="xl:w-full xl:mx-auto xl:bottom-2 xl:flex xl:justify-center">
                        <button 
                            class="px-5 py-1 bg-red-700 hover:bg-red-900 focus:outline-none rounded-b text-white w-full"
                            @click="launchImageFile"
                            :disabled="isUploadingImage"
                            type="button">
                            {{ isUploadingImage ? 'Uploading...' : 'Upload' }}
                        </button>
                        <input
                            ref="imageFile"
                            @change.prevent="uploadImageFile($event.target.files)"
                            type="file"
                            accept="image/png, image/jpeg"
                            class="hidden">
                    </div>
                </div>
                <div class="flex flex-col space-y-7 w-full">
                    <div class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-2">
                        <span class="my-auto w-28 font-semibold text-lg">Name*</span>
                        <t-input @change="newObjectToApi('name', release.name)" autocomplete="false" type="text" v-model="release.name" :value="release.name" placeholder="Artist Name" name="artists-name"/>
                    </div>
                    <div class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-2">
                        <span class="my-auto w-28 font-semibold text-lg">Type</span>
                        <t-select @change="newObjectToApi('type', release.type)" v-model="release.type" id="artists-type-selector" :options="[{ value: 'SINGLE', text: 'Single' }, { value: 'ALBUM', text: 'Album' }, { value: 'EP', text: 'EP'}]" ></t-select>
                    </div>
                    <div id="artists" class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-2">
                        <span class="my-auto w-28 font-semibold text-lg">Artist(s)*</span>
                        <multiselect
                            v-model="release.artists" 
                            tag-placeholder="Add this as new artist" 
                            placeholder="Search or add a artist" 
                            label="name" 
                            track-by="id" 
                            :options="artistList" 
                            :close-on-select="false"
                            :clear-on-select="false"
                            :preserve-search="false"
                            :multiple="true" 
                            :taggable="true"
                            @input="newObjectToApi('artists', release.artists)" 
                            @tag="addArtist">
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
                    </div>
                    <div class="flex flex-col lg:flex-row space-y-1 lg:space-y-0 lg:space-x-2">
                        <span class="my-auto w-28 font-semibold text-lg">Style</span>
                        <multiselect
                            v-model="release.styles" 
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
                            @input="newObjectToApi('styles', release.styles)" 
                            @tag="addStyle">
                        </multiselect>
                    </div>
                </div>
            </div>
            <div class="flex flex-col space-y-5">
                <div id="youtube-id" class="flex flex-col space-y-1">
                    <h3 class="my-auto font-semibold text-lg">Youtube Music ID</h3>
                    <t-input @change="newObjectToApi('idyoutubemusic', release.idyoutubemusic)" autocomplete="false" type="text" v-model="release.idyoutubemusic" :value="release.idyoutubemusic" placeholder="release idyoutubemusic" name="release-idyoutubemusic" />
                </div>
                <div id="datepicker" class="flex flex-col space-y-10 w-full">
                    <div id="release-date" class="flex flex-col space-y-1">
                        <h2 class="my-auto font-semibold text-lg">Release Date* <span class="text-base">: {{dates.toLocaleDateString('fr-FR')}} at {{(dates.toLocaleTimeString('en-US')).toString().slice(0,4)}} in {{actualTimezone}}</span></h2>
                        <div class="p-5 bg-black-one rounded">
                            <v-date-picker
                                mode="dateTime"
                                v-model="dates"
                                :timezone="timezone"
                                color="red"
                                is-expanded/>
                            <div class="pt-2">
                                <div class="flex justify-between w-full">
                                    <span class="text-sm font-bold text-white">-11:00</span>
                                    <span class="text-sm font-bold text-white">UTC</span>
                                    <span class="text-sm font-bold text-white">+11:00</span>
                                </div>
                                <input
                                    class="w-full"
                                    type="range"
                                    min="0"
                                    :max="timezones.length - 1"
                                    v-model="timezoneIndex"/>
                                <div class="flex">
                                    <span class="font-semibold text-gray-400 mr-2">Timezone:</span>
                                    <span class="text-white">{{ timezone }} ({{ abbrTimezone }})</span>
                                </div>
                                <div class="flex">
                                    <span class="font-semibold text-gray-400 mr-2">Namezone:</span>
                                    <span class="text-white">{{ namezone }}</span>
                                </div>
                                <div class="flex">
                                    <span class="font-semibold text-gray-400 mr-2">GMT Zone:</span>
                                    <span class="text-white">GMT{{ gmtzone }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="streaming-platform" class="w-full space-y-1">
                    <h3 class="my-auto font-semibold text-lg">Streaming Platforms Link</h3>
                    <MultipleInput class="mb-1" v-for="(elem, index) in this.release.platforms" :key="index" :elem="elem" :placehol="'Streaming Platforms'" @updateinput="updateList(release.platforms, $event, index, 'platforms')" @deleteinput="deleteList(release.platforms, index)"/>
                    <button @click="addStreamingLink()" class="Card w-full text-left focus:outline-none flex space-x-2 bg-white bg-opacity-30 p-2 justify-center rounded">
                        <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/>
                    </button>
                </div>
                <div id="tracklist" class="w-full space-y-1">
                    <h3 class="my-auto font-semibold text-lg">Tracklist*</h3>
                    <div class="rounded bg-search-leftbar p-5">
                        <div class="mb-3 space-y-1" v-for="(music, index) in release.musics" :key="index">
                            <span>Track {{index+1}}</span> <!--<button @click="deleteList(release.musics, index)" class="text-red-700 focus:outline-none text-sm font-semibold">Delete</button>-->
                            <t-input v-on:change="newObjectToApiMusic(release.musics, index)" type="text" v-model="music.name" placeholder="Track Name"/>
                            <t-input @change="newObjectToApiMusic(release.musics, index)" type="text" v-model="music.clip" placeholder="Track Clip"/>
                        </div>
                        <button @click="addMusic()" class="Card w-full text-left focus:outline-none flex space-x-2 bg-white bg-opacity-30 p-2 justify-center rounded">
                            <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png"/>
                        </button>
                    </div>
                </div>
                <div id="source" class="flex flex-col space-y-1">
                    <h3 class="my-auto font-semibold text-lg">Source*</h3>
                    <t-textarea id="source" placeholder="Source" v-model="source" name="my-textarea" class="resize w-full h-20"/>
                </div>
            </div>
            <button @click="editRelease()" class="Card w-full my-2 px-5 py-1 bg-red-700 hover:bg-red-900 text-white rounded">Confirm</button>
        </section>
    </div>
</template>

<script>
    import moment from 'moment-timezone'
    import { mapGetters } from 'vuex'

    export default {
        name:"EditRelease",

        head() {
            return {
                title: this.release.name,
            }
        },

        data() {
            return {
                dates: new Date(),
                actualTimezone:'',
                timezoneIndex: 11,
                timezones: [
                    'Pacific/Niue', // -11
                    'Pacific/Honolulu', // -10
                    'America/Anchorage', // -9
                    'America/Los_Angeles', // -8
                    'America/Denver', // -7
                    'America/Chicago', // -6
                    'America/New_York', // -5
                    'America/Puerto_Rico', // -4
                    'America/Buenos_Aires', // -3
                    'America/Sao_Paulo', // -2,
                    'Atlantic/Azores', // -1
                    'UTC', // 0
                    'Europe/Amsterdam', // +1
                    'Europe/Athens', // +2
                    'Europe/Moscow', // +3
                    'Indian/Mahe', // +4
                    'Asia/Ashgabat', // +5
                    'Asia/Dhaka', // +6
                    'Asia/Bangkok', // +7
                    'Asia/Hong_Kong', // +8
                    'Asia/Seoul', // +9
                    'Australia/Sydney', // +10
                    'Asia/Magadan', // +11
                ],
                nameZones: [
                    'Niue, Pago Pago', // -11
                    'Hawaii, Rarotonga, Tahiti', // -10
                    'Alaska Gambier', // -9
                    'Tijuana, Vancouver, Whitehorse', // -8
                    'Arizona, Mazatlan, Dawnson Creek, +3', // -7
                    'Mexico City, Costa Rica, Guatemala, +8', // -6
                    'Toronto, Jamaica, Panama, +11', // -5
                    'Guyana, Puerto Rico, Curacoa, +13', // -4
                    'Buenos Aires, Cayenne, Salvador, +17', // -3
                    'Noronha, Sao Paulo, South Georgia', // -2,
                    'Azores, Cape Verde, Scoresbysund', // -1
                    'Dublin, Lisbon, London, +11', // 0
                    'Amsterdam, Berlin, Oslo, +23', // +1
                    'Bucharest, Jerusalem, Johannesburg, +19', // +2
                    'Baghdad, Istanbul, Qatar, +5', // +3
                    'Dubai, Reunion, Yerevan, +5', // +4
                    'Maldives, Mawson, Karachi, +7', // +5
                    'Almaty, Vostok, Chagos, +4', // +6
                    'Hanoi, Jakarta, Davis, +4', // +7
                    'Taipei, Kuala Lumpur, Singapore, +10', // +8
                    'Tokyo, Palau, Dili, +3', // +9
                    'Guam, Vladivostok, Port Moresby, +3', // +10
                    'Noumea, Casey, Sydney, +7', // +11
                ],
                release:{},
                sendToApi:{},
                oldDataToApi:{},
                artistList:[],
                styleList:[],
                updateRelease:false,
                updateMusic:false,
                sendToApiMusics:[],
                isUploadingImage: false,
                source:'',
                user: null,
            }
        },

        async asyncData({ $axios, params }){
            const release = await $axios.$get(`https://comeback-api.herokuapp.com/releases/${params.id}`)
            const artistList = await $axios.$get('https://comeback-api.herokuapp.com/artists/groups?sortby=name:asc')
            const styleList = await $axios.$get('https://comeback-api.herokuapp.com/styles?sortby=name:asc')

            release["newArtists"] = []

            return {release, artistList, styleList}
            //return {release}
        },

        created() {
            var zone_name = moment.tz.guess();
            this.actualTimezone = moment.tz.guess()
            var timezone = moment.tz(zone_name).zoneAbbr()
        },

        async mounted() {
            this.dates = new Date(this.release.date)
            this.oldDataToApi = JSON.parse(JSON.stringify(this.release))
            this.user = await this.GET_DATA_USER()
        },

        watch: {
            dates: function(val) {
                if(val.toString() != new Date(this.release.date).toString()) {
                    this.newObjectToApi('date', val)
                }
            }
        },

        computed: {
            timezone() {
                return this.timezones[this.timezoneIndex];
            },
            abbrTimezone() {
                return moment.tz(this.timezone).zoneAbbr();
            },
            namezone() {
                return this.nameZones[this.timezoneIndex];
            },
            gmtzone() {
                var moment = require('moment-timezone')
                let zone = moment().tz(this.timezones[this.timezoneIndex]).format().toString().slice(19,25)
                if(zone == 'Z') {
                    return '+00:00'
                } else {
                    return zone
                }
            },
        },

        methods: {
            ...mapGetters([
                'GET_DATA_USER',
            ]),

            async editRelease() {
                if(this.user == null) this.user = this.GET_DATA_USER()
                if(this.updateRelease) {
                    await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
                        state:'PENDING',
                        method:'PUT',
                        endpoint:`/releases/${this.$route.params.id}`,
                        body: this.sendToApi,
                        currentData: this.oldDataToApi,
                        userId: this.user.id,
                        source: this.source
                    }).then(response => {
                        if(!this.updateMusic) {
                            this.$router.push({ path: `/release/${this.$route.params.id}`})
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

                if(this.updateMusic){
                    this.sendToApiMusics.forEach(async element => {
                        let oldData = {}
                        oldData = this.oldDataToApi.musics

                        await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
                            state:'PENDING',
                            method:'PUT',
                            endpoint:`/musics/${element.id}`,
                            body: element,
                            currentData: oldData,
                            userId: this.user.id,
                            source: this.source
                        }).then(response => {
                            this.$router.push({ path: `/release/${this.$route.params.id}`})
                        }).catch(function (error) {
                            console.log(error);
                        });
                    });
                }
            },

            addArtist (newTag) {
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
                this.release.artists.push(tag)
                this.release.newArtists.push(tag)
            },

            addStyle (newTag) {
                const tag = {
                    name: newTag,
                }
                if(this.release.styles == null) {
                    this.release.styles = [tag]
                } else {
                    this.release.styles.push(tag)
                }
                this.styleList.push(tag)
                this.newObjectToApi('styles', this.release.styles)
            },

            addMusic(){
                this.release.musics.push({
                    id: null,
                    name: null,
                    clip: null,
                    platforms: null,
                })
            },

            addStreamingLink(){
                if(this.release.platforms == null) {
                    this.release.platforms = [""]
                } else {
                    this.release.platforms.push("")
                }
            },

            updateList(list, newElem, index, key){
                list[index] = newElem
                this.newObjectToApi(key, list)
            },

            deleteList(list, index){
                list.splice(index, 1)
            },

            newObjectToApi(key, value){
                this.sendToApi[key] = value
                this.updateRelease = true
            },

            newObjectToApiMusic(value, index){
                if(value[index].id) {
                    let elementExist = false
                    this.sendToApiMusics.forEach(async element => {
                        if(element.id == value[index].id) {
                            element = value[index]
                            elementExist = true
                        }
                    })
                    if(!elementExist) {this.sendToApiMusics.push(value[index])}
                    this.updateMusic = true
                } else {
                    this.newObjectToApi("musics", value)
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

                let imageRef = this.$fire.storage.ref(`images/release/${this.release.id}`)

                let uploadTask = imageRef.put(file, metadata).then((snapshot) => {
                    return snapshot.ref.getDownloadURL().then((url) => {
                        return url
                    })
                }).catch((error) => {
                    console.error(error)
                })
                uploadTask.then((url) => {
                    this.newObjectToApi("image", url)
                    this.release.image = url
                    this.isUploadingImage = false
                })
            },
        },
    }
</script>