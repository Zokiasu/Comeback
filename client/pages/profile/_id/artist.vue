<template>
    <div class="py-5">
        <h3 class="text-center w-full text-2xl lg:text-5xl font-semibold p-10">Artist Followed</h3>
        <transition-group name="object" class="grid grid-cols-2 gap-5 md:flex md:flex-wrap w-full md:justify-center lg:justify-start md:inner">
            <LazyArtistCard 
                v-for="(artist) in artists.slice(0, maxArtist)"
                :key="artist.id"
                :image="artist.image"
                :name="artist.name"
                :id="artist.id"
                :type="artist.type"
                :groups="artist.groups"
                class="artist md:mr-5 lg:mr-3.5 md:mb-5"
            />
        </transition-group>
        <InfiniteLoading v-if="!enough" spinner="spiral" @infinite="infiniteScroll"></InfiniteLoading>
    </div>
</template>

<script>
    export default {

        data(){
            return {
                artists: [],
                maxArtist: 0,
                enough: false,
            }
        },
        

        async asyncData({ $axios, params }){
            const artists = await $axios.$get(`https://comeback-api.herokuapp.com/users/${params.id}/artists`)
            artists?.sort(function(a,b){
                if(a.name?.toLowerCase() > b.name?.toLowerCase()) {return -1}
                if(a.name?.toLowerCase() < b.name?.toLowerCase()) {return 1}
                return 0;
            })
            return { artists }
        },

        methods:{
            infiniteScroll($state) {
                let artTmp = []
                this.enough = false
                setTimeout(() => {
                    this.maxArtist = this.maxArtist + 20
                    if(this.maxArtist >= this.artists.length) {
                        this.enough = true
                        $state.complete();
                    } else {
                        $state.loaded();
                    }
                    /*this.$axios.get(`https://comeback-api.herokuapp.com/users/${params.id}/artists?sortby=name&limit=9&offset=${this.maxArtist}`).then(response => {
                        if(response.data.length) {
                            artTmp = artTmp.concat(response.data)
                            this.artists = [...new Set(artTmp)]
                            this.maxArtist = this.maxArtist + 9
                            $state.loaded();
                        } else {
                            this.enough = true
                            $state.complete();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });*/
                }, 500);
            },
        }
    }
</script>
