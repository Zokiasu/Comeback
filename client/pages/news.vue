<template>
    <div class="px-10 py-5 flex flex-col space-y-10">
        <div class="w-full flex justify-center">
            <h2 class="text-white text-4xl">Lastest News</h2>
        </div>
        <transition-group name="object" class="flex flex-wrap justify-center w-full overflow-x-scroll inner">
            <NewsCard class="m-2" v-for="(element) in newsList" :key="element.id" :element="element"/>
        </transition-group>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                newsList:[],
            }
        },
    
        async asyncData({ $axios }){
            const newsList = await $axios.$get('https://comeback-api.herokuapp.com/infos?sortby=date:desc')
            return {newsList}
        },
    }
</script>

<style>
  .object-enter-active,
  .object-leave-active {
    transition-duration: 0.4s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }

  .object-enter {
    opacity: 0;
    transform: translate(0, -2em);
  }

  .object-leave-active {
    opacity: 0;
    transform: translate(0, -2em);
  }
</style>