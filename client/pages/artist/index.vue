<template>
  <div>
    <section id="searchbar" class=" flex w-full justify-start p-5">
      <div id="search-icon" class="bg-opacity-20 bg-gray-500 rounded p-2">
        <svg v-if="!resetSearch" class="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"></path></g></g></svg>
        <svg v-else @click="search = ''; resetSearch = false; updateDateList(false)" class="cursor-pointer" fill="#fff" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z"/></svg>
      </div>
      <input 
        id="search-input" 
        type="text" 
        placeholder="Search" 
        v-model="search" 
        class="w-full pl-2 focus:outline-none rounded-r rounded-none bg-opacity-20 bg-gray-500 text-white placeholder-white"
      />
    </section>
    <transition-group 
      v-if="artists.length > 0" 
      id="artist-list" 
      name="list-complete" 
      tag="div" 
      class="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 1xl:grid-cols-7 2xl:grid-cols-10 gap-5 w-full justify-center p-5">
      <ArtistCard 
        v-for="artist in artists"
        :key="artist.id"
        :image="artist.image"
        :name="artist.name"
        :id="artist.id"
        :type="artist.type"
        :groups="artist.groups"
        class="list-complete-item"
      />
    </transition-group>
    <InfiniteLoading v-if="!enough" :identifier="infiniteId" spinner="spiral" @infinite="infiniteScroll"></InfiniteLoading>
    <div v-if="artists.length < 1 & !loading" class="px-5">
      <p class="text-white bg-[#6B728033] w-full flex justify-center rounded p-2">No artists found.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name:"ArtistPage",

    head() {
      return {
        title: 'Comeback - Artists',
      }
    },

    data(){
      return {
        width: true,
        search: '',
        artists: [],
        maxArtist: 0,
        enough: false,
				loading: true,
        resetSearch: false,
        infiniteId: new Date(),
      }
    },
        
    computed: {
      widthActual(){
        if(window.innerWidth > 768) {
          return true
        } else {
          return false
        }
      },
    },

    watch: {
        search: {
            immediate: true,
            handler(search) {
              if(search != '') {
                this.resetSearch = true
                this.updateDateList(true)
              } else {
                this.resetSearch = false
                this.updateDateList(false)
              }
            }
        }
    },

    methods:{
      changeType() {
        this.infiniteId += 1;
      },

      infiniteScroll($state) {
        let artTmp = []
        this.enough = false
        setTimeout(() => {
          if(this.artists.length >= 20) artTmp = artTmp.concat(this.artists)
          this.$axios.get(`https://comeback-api.herokuapp.com/artists/groups?sortby=name&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxArtist}`).then(response => {
            if(response.data.length) {
              artTmp = artTmp.concat(response.data)
              this.artists = [...new Set(artTmp)]
              this.maxArtist = this.maxArtist + 20
              $state.loaded();
            } else {
              this.enough = true
              $state.complete();
            }
					  this.loading = false
          })
          .catch(error => {
            console.log(error);
          });
        }, 500);
      },

      async updateDateList(reset) {
        let artTmp = []
        this.enough = false
        if(reset) {
          this.maxArtist = 0
          const {data: response} = await this.$axios.get(`https://comeback-api.herokuapp.com/artists/groups?sortby=name&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxArtist}`)
          if(response.length > 0) {
            artTmp = artTmp.concat(response)
            this.artists = [...new Set(artTmp)] //Remove all double entry
            if(response.length < 20) {
              this.enough = true
            } else {
              this.maxArtist = this.maxArtist + 20
            }
          } else {
            this.enough = true
            this.artists = []
          }
        }
        if(this.search == '') {
          this.artists = []
        }
          this.changeType()
      },
    },
  }
</script>

<style scoped>
  .list-complete-item {
    transition: all 0.5s;
    display: inline-block;
  }
  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
</style>