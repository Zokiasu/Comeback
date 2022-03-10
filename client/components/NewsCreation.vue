<template>
  <div class="flex flex-col justify-center space-y-2 py-3 text-white">
    <multiselect
      v-if="!newArtist"
      v-model="artistSelected"
      placeholder="Please select an artist"
      label="name" 
      track-by="id" 
      :options="artistList"
      :close-on-select="true"
      :clear-on-select="true"
      :preserve-search="false"
    >
      <template slot="option" slot-scope="props">
        <div class="option__desc flex flex-col gap-1">
          <div class="flex flex-row gap-1">
            <p class="option__title">{{ props.option.name }}</p>
            <p v-if="props.option.type == 'GROUP'" class="option__subtitle">[{{ props.option.type }}]</p>
          </div>
          <div class="flex flex-wrap gap-1">
              <p 
                v-for="(group, index) in props.option.groups" 
                :key="index" 
                class="bg-gray-300 p-1 px-2 rounded text-xs text-black-one"
              >
                {{group.name}}
              </p>
          </div>
        </div>
      </template>
      <template slot="singleLabel" slot-scope="props">
        <div class="flex flex-col gap-1">
          <img :src="props.option.image" :alt="props.option.name" class="option__image aspect-video h-32 object-cover rounded" />
          <div class="option__desc flex flex-col gap-1">
            <div class="flex flex-row gap-1 font-semibold text-lg">
              <p class="option__title">{{ props.option.name }}</p>
              <p v-if="props.option.type == 'GROUP'" class="option__subtitle">[{{ props.option.type }}]</p>
            </div>
            <div class="flex flex-wrap gap-1">
                <p 
                  v-for="(group, index) in props.option.groups" 
                  :key="index" 
                  class="bg-gray-300 p-1 px-2 rounded text-xs text-black-one"
                >
                  {{group.name}}
                </p>
            </div>
          </div>
        </div>
      </template>
    </multiselect>
    <t-input 
      v-else
      type="text"
      name="Artist Name"
      placeholder="Your Artist Name"
      v-model="newsArtistName"
    />
    <div
      v-if="!newArtist"
      class="flex flex-wrap gap-1"
    >
      <p class="text-sm">You can't find your artist ?</p>
      <button
        class="focus:outline-none text-red-500"
        @click="newArtist = !newArtist"
      >
        Please click here to suggest him with your news
      </button>
    </div>
    <button
      v-else
      class="focus:outline-none text-red-700 text-sm"
      @click="newArtist = !newArtist"
    >
      Back to artist list
    </button>
    <t-datepicker
      placeholder="Date"
      initial-view="month" 
      dateFormat='Y-m-d' 
      clearable
      v-model="newsDate"
      class="text-black"
    />
    <t-textarea
      type="text"
      name="News"
      placeholder="Your News*"
      v-model="newsMessage"
    />
    <t-textarea
      type="text"
      name="Source"
      placeholder="Source*"
      v-model="newsSource"
    />
    <button 
      v-if="!newArtist"
      class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold text-white"
      @click="sendNews()"
    >
      Send the news
    </button>
    <button
      v-else
      class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold text-white"
      @click="sendNewsToValidated()"
    >
      Suggest Artist and News
    </button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "NewsCreation",

    props: {
      artistList: {
        type: Array,
        required: true,
        default: () => []
      }
    },

    data() {
      return {
        artistSelected: null,
        newArtist: false,
        newsArtistId: null,
        newsArtistName: null,
        newsDate: null,
        newsMessage: null,
        newsSource: null,
        user: null
      };
    },

    watch: {
      newsDate: {
        immediate: true,
        handler(newsDate) {
          if (process.client) {
            if(newsDate) this.newsMessage = `Next comeback on ${this.dateFormat(new Date(newsDate))}`
          }
        }
      },
    },

    methods:{
      ...mapGetters([
        'GET_DATA_USER',
      ]),

      dateFormat(d){
        let ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return `${da}/${mo}/${ye}`
      },

      async sendNews(){
        this.user = this.GET_DATA_USER()
        if(!this.newsMessage) {
            this.$toast.error('Please write a news or close the window', {duration:3000, position:'top-right'})
        } else if(!this.artistSelected) {
            this.$toast.error('Please select a artist or suggest one', {duration:3000, position:'top-right'})
        } else {
          this.newsArtistId = this.artistSelected.id
          await this.$axios.post(`https://comeback-api.herokuapp.com/infos`, 
          { 
            message : this.newsMessage, 
            date: this.newsDate, 
            source: this.newsSource, 
            userId: this.user.id,
            artistId: this.newsArtistId 
          })
          .then(response => {
            this.newsMessage = null,
            this.newsArtistId = null,
            this.newsDate = null,
            this.newsSource = null,
            this.newArtist = false
            this.closeModal()
          }).catch(function (error) {
              console.log(error);
          });
        }
      },

      async sendNewsToValidated() {
        this.user = this.GET_DATA_USER()
        if(!this.newsMessage) {
            this.$toast.error('Please write a news or close the window', {duration:3000, position:'top-right'})
        } else if(!this.newsArtistName) {
            this.$toast.error('Please select a artist or suggest one', {duration:3000, position:'top-right'})
        } else {
          await this.$axios.post(`https://comeback-api.herokuapp.com/requests`, {
            state:'PENDING',
            method:'POST',
            endpoint:`/infos`,
            body: this.news,
            currentData: [],
            userId: this.user.id,
            source: null
          }).then(response=>{
            this.newsMessage = null,
            this.newsArtistName = null,
            this.newsDate = null,
            this.newsSource = null,
            this.newArtist = false
            this.closeModal()
          })
        }
      },

      closeModal(){
        this.$emit('close')
      }
    }
  }
</script>