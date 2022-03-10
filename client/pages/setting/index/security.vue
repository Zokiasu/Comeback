<template>
    <section class="space-y-5">
        <div class="flex flex-col lg:flex-row lg:space-x-5">
            <div class="w-40">
                <span>Change Password</span>
            </div>
            <div class="w-full">
                <button class="bg-blue-500 bg-opacity-30 px-3 py-2 border border-blue-700 rounded">Change Password</button>
            </div>
        </div>
        <div class="flex flex-col lg:flex-row lg:space-x-5">
            <div class="w-40">
                <span>Desactive your account ?</span>
            </div>
            <div class="w-full">
                <button class="bg-red-500 bg-opacity-30 px-3 py-2 border border-red-700 rounded">Yes, desactive my account</button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return {
                data: '',
            }
        }
    }
</script>

<style>

</style>