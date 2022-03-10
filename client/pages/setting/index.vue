<template>
    <div class="p-5 lg:px-40 lg:py-10 text-white">
        <section>
            <ul class="flex">
                <NuxtLink :to="`/setting/profile`" class="py-1 px-5 rounded-t-xl" :class="$route.name == 'setting-index-profile' ? 'bg-gray-three':''">Profile</NuxtLink>
                <NuxtLink :to="`/setting/security`" class="py-1 px-5 rounded-t-xl" :class="$route.name == 'setting-index-security' ? 'bg-gray-three':''">Security</NuxtLink>
                <!--<NuxtLink :to="`/setting/subscription`" class="py-1 px-5 rounded-t-xl" :class="$route.name == 'setting-index-subscription' ? 'bg-gray-three':''">Subscription</NuxtLink>-->
            </ul>
        </section>
        <section class="bg-gray-three  p-10 space-y-5">
            <NuxtChild/>
        </section>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                data: '',
            }
        },

        beforeCreate(){
            if(this.$router.currentRoute.name != 'setting-index-profile' && this.$router.currentRoute.name != 'setting-index-security') this.$router.push(`/setting/profile`)
        },
    }
</script>

<style>

</style>