<template>
	<div class="text-white">
		<div class="background-top bg-cover bg-no-repeat relative h-96 overflow-hidden" :style="{ 'background-image': 'url(https://picsum.photos/900/300)' }">
			<div class="absolute overflow-x-auto bottom-0 w-full space-y-3 p-3 p">
				<div class="mb-5">
					<h1 class="text-6xl">WayV</h1>
				</div>
				<div class="flex flex-nowrap overflow-x-scroll gap-3">
					<a 
						v-for="(text, index) in ['Facebook', 'Instagram', 'Twitter', 'Youtube']"
						:key="index"
						class="whitespace-nowrap"
					>{{ text }}</a>
				</div>
				<div class="flex flex-nowrap overflow-x-scroll scroll gap-3 testa">
					<a 
						v-for="(text, index) in ['Spotify', 'Youtube Music', 'Apple Music', 'Tidal', 'Deezer']" 
						:key="index"
						class="whitespace-nowrap"
					>{{ text }}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "Artist",

	head() {
		return {
			title: this.artist.name,
			meta: [
				{
					hid: "description",
					name: "description",
					content: this.artist.description,
				},
			],
		};
	},

	data() {
		return {
			liked: false,
			displayLike: false,
			seeDescription: false,
			artist: [],
			memberlist: [],
			subunitlist: [],
			userInfo: null,
		};
	},

	async asyncData({ $axios, $fire, params }) {
		const firstStepArtistId = $fire.functions.httpsCallable("getArtistById");
		const secondStepArtistId = await firstStepArtistId({
			id: params.id,
		});

		return { artist: secondStepArtistId.data.artist };
	},

	mounted(){
		console.log("artist", this.artist);
	},

	methods: {
		...mapGetters(["GET_USER"]),

		async followArtist() {
			this.liked = true;
			await this.$axios
				.put(`https://comeback-api.herokuapp.com/users/${this.userInfo.id}`, {
					artists: [this.artist],
				})
				.then((response) => {
					this.$toast.info("You are now following " + this.artist.name, {
						duration: 2000,
						position: "bottom-left",
					});
				})
				.catch(function (error) {
					console.log(error);
				});
		},

		async unfollowArtist() {
			this.liked = false;
			await this.$axios
				.delete(
					`https://comeback-api.herokuapp.com/users/${this.userInfo.id}/artists/${this.artist.id}`,
					this.artist
				)
				.then((response) => {
					this.$toast.info("You are now following " + this.artist.name, {
						duration: 2000,
						position: "bottom-left",
					});
				})
				.catch(function (error) {
					console.log(error);
				});
		},
	},
};
</script>

<style scoped>
/* ne pas afficher la scrollbar dans la div */
.testa {
	scrollbar-width: none;
	-ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.testa::-webkit-scrollbar {
  display: none;
}
</style>