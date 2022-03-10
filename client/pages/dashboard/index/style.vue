<template>
    <div class="p-5 px-10 space-y-5">
        <div class="flex flex-wrap">
            <div class="bg-gray-500 text-white rounded flex space-x-1 mr-2 mb-2 p-2 px-3" v-for="(style, index) in styleList" :key="style.id">
                <span>{{style.name}}</span>
                <img class="cursor-pointer w-4 h-4 my-auto" @click="openEditSyle(style)" src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/>
                <img class="cursor-pointer w-4 h-4 my-auto" @click="deleteStyle(style.id, style, index)" src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"/>
                <Modal
                    v-model="editStyle"
                    title="Edit Style"
                    wrapper-class="animate__animated modal-wrapper"
                    :modal-style="{'background':'#1F1D1D', 'border-radius': '0.25rem', 'color':'white'}"
                    :in-class="`animate__fadeInDown`"
                    :out-class="`animate__bounceOut`"
                    bg-class="animate__animated"
                    :bg-in-class="`animate__fadeInUp`"
                    :bg-out-class="`animate__fadeOutDown`">
                    <div class="flex flex-col justify-center space-y-2 py-3 text-white">
                        <t-input type="text" v-model="styles.name" placeholder="Style Name" name="Style Name"></t-input>
                        <button @click="editStyleFucntion(styles.id, styles)" class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold text-white">Confirm</button>
                    </div>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            styleList:[],
            editStyle: false,
            styles: {}
        }
    },

    async asyncData({ $axios, params }){
        const styleList = await $axios.$get('https://comeback-api.herokuapp.com/styles?sortby=name:asc')

        return {styleList}
    },

    methods:{
        deleteStyle(id, object, index){
            this.$axios.delete(`https://comeback-api.herokuapp.com/styles/${id}`, object)
            .then(response=>{
                this.styleList.splice(index, 1)
            })
        },

        openEditSyle(object){
            this.styles = object
            this.editStyle = true
        },

        async editStyleFucntion(styleId, object){
            this.editStyle = false
            await this.$axios.put(`https://comeback-api.herokuapp.com/styles/${styleId}`, object).then(response => {
                this.styles = {}
                this.$toast.error('The style has been edited', {duration:3000, position:'top-right'})
            }).catch(function (error) {
                console.log(error);
            });
        }
    },
}
</script>

<style>
.modal-custom{
    background:#1F1D1D;
    border-radius: 0.25rem;
    color:white;
}
</style>