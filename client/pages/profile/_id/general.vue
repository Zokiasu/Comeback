<template>
    <div class="flex flex-col space-y-10 py-5">
        <!--<section id="presentation" class="space-y-2">
            <h2 class="text-3xl font-semibold">Presentation</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quas rerum illo consequatur. Nulla nostrum laudantium vitae quaerat exercitationem repudiandae cum dicta. Voluptatem iusto debitis sequi, officia ut voluptas sint.</p>
        </section>-->
        <section v-if="artistUser.length" id="artist-recently-follow" class="space-y-5">
            <h2 class="text-3xl font-semibold">Artist recently followed</h2>
            <transition-group name="object" class="grid grid-cols-2 gap-5 md:flex md:flex-wrap w-full md:justify-center lg:justify-start md:inner">
                <LazyArtistCard 
                    v-for="(artist) in artistUser.slice(0, 9)"
                    :key="artist.id"
                    :image="artist.image"
                    :name="artist.name"
                    :id="artist.id"
                    :type="artist.type"
                    :groups="artist.groups"
                    class="artist md:mr-5 lg:mr-3.5 md:mb-5"
                />
            </transition-group>
        </section>
        <section v-if="releaseUser.length" id="relaese-recently-liked" class="space-y-5">
            <h2 class="text-3xl font-semibold">Release recently liked</h2>
            <transition-group name="object" class="grid grid-cols-2 gap-5 md:flex md:flex-wrap w-full md:justify-center lg:justify-start md:inner">
                <ReleaseCard 
                    v-for="(release) in releaseUser.slice(0, 9)" 
                    :key="release.id"
					:id="release.id"
					:image="release.image"
					:date="release.date"
					:name="release.name"
					:type="release.type"
					:artists="release.artists"
                    class="release md:mr-5 md:mb-5 justify-self-center" 
                />
            </transition-group>
        </section>
    </div>
</template>

<script>
    import ScrollReveal from 'scrollreveal'

    export default {
        data() {
            return {
                artistUser:  [],
                releaseUser: [],
            }
        },

        async asyncData({ $axios, params }){
            const artistUser = await $axios.$get(`https://comeback-api.herokuapp.com/users/${params.id}/artists`)
            artistUser?.sort(function(a,b){
                if(a.User_Artist?.createdAt?.toLowerCase() > b.User_Artist?.createdAt?.toLowerCase()) {return -1}
                if(a.User_Artist?.createdAt?.toLowerCase() < b.User_Artist?.createdAt?.toLowerCase()) {return 1}
                return 0;
            })
            const releaseUser = await $axios.$get(`https://comeback-api.herokuapp.com/users/${params.id}/releases`)
            releaseUser?.sort(function(a,b){
                if(a.User_Release?.createdAt?.toLowerCase() > b.User_Release?.createdAt?.toLowerCase()) {return -1}
                if(a.User_Release?.createdAt?.toLowerCase() < b.User_Release?.createdAt?.toLowerCase()) {return 1}
                return 0;
            })
            return { artistUser, releaseUser }
        },

        mounted(){
            ScrollReveal().reveal('.artist', {interval: 100, distance: '1000%', origin: 'bottom', opacity: null})
            ScrollReveal().reveal('.release', {interval: 100, distance: '1000%', origin: 'bottom', opacity: null})
        },
    }
</script>