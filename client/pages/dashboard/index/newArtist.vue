<template>
	<section class="p-5 text-white space-y-5">
		<div class="rounded p-5 bg-black-four space-y-2" v-for="(artist, index) in artistList" :key="artist.id">
			<h2 class="font-semibold text-xl">{{ artist.name }}</h2>
			<div class="grid grid-cols-2 gap-5">
				<img :src="artist.image" :alt="artist.name" class="rounded"/>
				<div class="flex flex-col justify-between">
					<p>{{ artist.description }}</p>
					<div class="flex justify-end w-full gap-2">
						<button class="bg-red-500 px-5 py-2 rounded font-semibold hover:bg-red-700 transition-all duration-300 ease-in-out" @click="reject(artist.id, index)">Reject</button>
						<button class="bg-green-500 px-5 py-2 rounded font-semibold hover:bg-green-700 transition-all duration-300 ease-in-out" @click="verify(artist.id, index)">Accept</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: "newArtist",
  	layout: 'dashboard',

		async asyncData({ $fire }) {
			const firstStepArtist = $fire.functions('europe-west1').httpsCallable("getPendingCreateArtist")
			const secondStepArtist = await firstStepArtist()
			const artistList = secondStepArtist.data.artists

			return { artistList }
		},

		mounted() {
			console.log(this.artistList)
		},

		methods: {
			verify(idArtist, index) {
				console.log("Verify")
				const updateArtist = this.$fire.functions('europe-west1').httpsCallable("updateArtistById");
				updateArtist({ id: idArtist, verified: true })
				this.artistList.splice(index, 1)
			},

			reject(idArtist, index) {
				console.log("Reject")
				const deleteArtist = this.$fire.functions('europe-west1').httpsCallable("deleteArtist");
				deleteArtist({ id: idArtist })
				this.artistList.splice(index, 1)
			}
		},
	};
</script>