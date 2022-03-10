<template>
    <section id="menu">
        <ul class="flex space-x-2 text-white text-xs md:text-sm lg:text-base">
            <NuxtLink :to="`/moderator/pending`" class="px-3 py-1.5" :class="$route.name != 'moderator-pending' ? '' : 'border-b-2 border-red-700'">
                <span>Pending</span>
            </NuxtLink>
            <NuxtLink :to="`/moderator/artistslist`" class="px-3 py-1.5" :class="$route.name != 'moderator-artistslist' ? '' : 'border-b-2 border-red-700'">
                <span>Artists</span>
            </NuxtLink>
            <NuxtLink :to="`/moderator/releaseslist`" class="px-3 py-1.5" :class="$route.name != 'moderator-releaseslist' ? '' : 'border-b-2 border-red-700'">
                <span>Releases</span>
            </NuxtLink>
            <NuxtLink :to="`/moderator/musicslist`" class="px-3 py-1.5" :class="$route.name != 'moderator-musicslist' ? '' : 'border-b-2 border-red-700'">
                <span>Musics</span>
            </NuxtLink>
            <NuxtLink :to="`/moderator/stylelist`" class="px-3 py-1.5" :class="$route.name != 'moderator-stylelist' ? '' : 'border-b-2 border-red-700'">
                <span>Styles</span>
            </NuxtLink>
            <NuxtLink :to="`/moderator/newslist`" class="px-3 py-1.5" :class="$route.name != 'moderator-newslist' ? '' : 'border-b-2 border-red-700'">
                <span>News</span>
            </NuxtLink>
            <NuxtLink v-if="adminCheck" :to="`/moderator/users`" class="px-3 py-1.5" :class="$route.name != 'moderator-users' ? '' : 'border-b-2 border-red-700'">
                <span>Users</span>
            </NuxtLink>
            <NuxtLink v-if="adminCheck" :to="`/moderator/oldpending`" class="px-3 py-1.5" :class="$route.name != 'moderator-oldpending' ? '' : 'border-b-2 border-red-700'">
                <span>Old Pending</span>
            </NuxtLink>
        </ul>
    </section>
</template>

<script>
    export default {

        data(){
            return {
                adminCheck: false,
            }
        },
        
        created(){
            this.adminChecker()
        },

        computed: {
            userData(){
                let utmp = this.$store.state.dataUser
                return utmp
            },
        },

        methods: {
            async adminChecker(){
                let that = this
                await this.$fire.auth.onAuthStateChanged(async function (user) {
                    if (user != null) {
                        let userDatas = await that.$axios.$get(`https://comeback-api.herokuapp.com/users/${user.uid}`)
                        if(userDatas.role != "NONE") {
                            that.adminCheck = true
                        } else {
                            that.adminCheck =  false
                        }
                    } else {
                        that.adminCheck =  false
                    }
                })
            },
        }
    }
</script>