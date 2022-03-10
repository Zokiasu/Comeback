<script>
    export default {
        beforeCreate(){
            if(this.$router.currentRoute.name != 'profile-id-general' && this.$router.currentRoute.name != 'profile-id-artist' && this.$router.currentRoute.name != 'profile-id-releas') this.$router.push(`/profile/${this.$route.params.id}/general`)
        },
    }
</script>