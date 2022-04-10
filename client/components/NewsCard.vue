<template>
    <NuxtLink :to="`/artist/${artist.id}`" class="flex flex-col md:space-y-5 bg-gray-500 bg-opacity-30 text-white rounded-xl w-full md:w-56 md:text-sm">
        <div class="flex justify-between px-2 py-2">
            <div class="flex space-x-3 md:space-x-0">
                <div class="md:hidden">
                    <img class="w-10 h-10 rounded-full object-cover shadowCard" :src="artist.image" alt="">
                </div>
                <div class="flex flex-col my-auto">
                    <div class="font-semibold">
                        {{artist.name}}'s news
                    </div>
                    <div class="text-xs">
                        <span>by {{user ? user.name : 'Unknow'}}</span>
                        <span v-if="checkDate(date)" class="bg-red-700 rounded px-3">Today</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden md:flex justify-center">
            <img class="w-16 h-16 md:w-36 md:h-36 rounded-full object-cover shadowCard" :src="artist.image" alt="">
        </div>
        <div class="w-full h-full bg-black-three flex justify-center py-3 px-5 rounded-b-xl mb-0 mt-auto text-xs md:text-base">
            <span class="text-center my-auto">{{message}}</span>
        </div>
    </NuxtLink>
</template>

<script>
    import moment from 'moment-timezone'
    export default {
        props: {
            verified: {
                type: Boolean,
                default: false,
            },
            message: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            artist: {
                type: Object,
                required: true,
            },
            user: {
                type: Object,
                required: true,
            },
        },

        methods :{
            checkDate(date){
                return moment(new Date(date)).isSame(moment(), 'day');
            },
        }
    }
</script>

<style>
    .shadowCard{
        --tw-shadow: 5px 5px 5px 2px rgba(0,0,0,0.30);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }
</style>