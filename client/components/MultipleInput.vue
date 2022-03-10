<template>
    <div class="flex space-x-1">
        <t-input class="w-full" type="text" @change="updateInput" v-model="input" :placeholder="placehol"/>
        <button class="focus:outline-none" @click="deleteInput()">X</button>
    </div>
</template>

<script>
    export default {

        props:{
            elem: String,
            placehol: String,
        },

        data(){
            return{
                input:'',
            }
        },

        created(){
            this.input = JSON.parse(JSON.stringify(this.elem))
        },

        methods:{
            updateInput(){
                this.$emit('updateinput', this.input)
            },

            deleteInput(){
                this.$emit('deleteinput')
            },
        },
    }
</script>