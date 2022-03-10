<template>
    <div class="py-5">
        <h3 class="text-center w-full text-2xl lg:text-5xl font-semibold p-10">Release Liked</h3>
        <transition-group name="object" class="grid grid-cols-2 gap-y-5 md:flex md:flex-wrap w-full md:justify-center lg:justify-start md:inner">
            <ReleaseCard 
                v-for="(release) in releases.slice(0, 9)" 
                :key="release.id" 
                :id="release.id"
                :image="release.image"
                :date="release.date"
                :name="release.name"
                :type="release.type"
                class="release md:mr-5 md:mb-5 justify-self-center" 
            />
        </transition-group>
        <InfiniteLoading v-if="!enough" spinner="spiral" @infinite="infiniteScroll"></InfiniteLoading>
    </div>
</template>

<script>
    export default {

        data(){
            return {
                releases: [],
                maxRelease: 0,
                enough: false,
            }
        },
        

        async asyncData({ $axios, params }){
            const releases = await $axios.$get(`https://comeback-api.herokuapp.com/users/${params.id}/releases`)
            releases?.sort(function(a,b){
                if(a.name?.toLowerCase() > b.name?.toLowerCase()) {return -1}
                if(a.name?.toLowerCase() < b.name?.toLowerCase()) {return 1}
                return 0;
            })
            return { releases }
        },

        methods:{
            infiniteScroll($state) {
                let artTmp = []
                this.enough = false
                setTimeout(() => {
                    this.maxRelease = this.maxRelease + 20
                    if(this.maxRelease >= this.releases.length) {
                        this.enough = true
                        $state.complete();
                    } else {
                        $state.loaded();
                    }
                    /*this.$axios.get(`https://comeback-api.herokuapp.com/users/${params.id}/releases?sortby=name&limit=9&offset=${this.maxRelease}`).then(response => {
                        if(response.data.length) {
                            artTmp = artTmp.concat(response.data)
                            this.releases = [...new Set(artTmp)]
                            this.maxRelease = this.maxRelease + 9
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

<style>

</style>