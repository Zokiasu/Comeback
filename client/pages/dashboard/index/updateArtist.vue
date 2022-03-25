<template>
	<div class="p-5 text-white">
		<div class="bg-black-four rounded p-5 space-y-3">
			<div class="flex gap-2">
				<h3 class="font-semibold text-lg">Name</h3>
				<p class="bg-gray-500 rounded px-2 py-1 text-xs">Type</p>
			</div>
			<div>
				<ul class="flex gap-2">
					<li class="bg-gray-500 rounded px-3 py-1">Style 1</li>
					<li class="bg-gray-500 rounded px-3 py-1">Style 2</li>
					<li class="bg-gray-500 rounded px-3 py-1">Style 3</li>
				</ul>
			</div>
			<div class="flex gap-5">
				<!-- img picsum link -->
				<img src="https://picsum.photos/200" alt="" class="rounded shadow-xl">
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus cupiditate velit eaque illo adipisci ex voluptas? Necessitatibus provident autem vero veritatis eveniet facilis, quisquam recusandae minus excepturi ad saepe sapiente?</p>
			</div>
			<div>
				<h3>Platforms</h3>
				<ul class="grid grid-cols-2 gap-3">
					<li class="bg-gray-500 rounded px-3 py-1">https://music.youtube.com/channel/UCTvkKE5tRuEGw1DdUaFKgbQ</li>
					<li class="bg-gray-500 rounded px-3 py-1">https://music.youtube.com/channel/UCTvkKE5tRuEGw1DdUaFKgbQ</li>
					<li class="bg-gray-500 rounded px-3 py-1">https://music.youtube.com/channel/UCTvkKE5tRuEGw1DdUaFKgbQ</li>
					<li class="bg-gray-500 rounded px-3 py-1">https://music.youtube.com/channel/UCTvkKE5tRuEGw1DdUaFKgbQ</li>
				</ul>
			</div>
			<div>
				<h3>Socials</h3>
				<ul class="grid grid-cols-2 gap-3">
					<li class="bg-gray-500 rounded px-3 py-1">https://music.youtube.com/channel/UCTvkKE5tRuEGw1DdUaFKgbQ</li>
					<li class="bg-gray-500 rounded px-3 py-1">https://music.youtube.com/channel/UCTvkKE5tRuEGw1DdUaFKgbQ</li>
					<li class="bg-gray-500 rounded px-3 py-1">https://music.youtube.com/channel/UCTvkKE5tRuEGw1DdUaFKgbQ</li>
					<li class="bg-gray-500 rounded px-3 py-1">https://music.youtube.com/channel/UCTvkKE5tRuEGw1DdUaFKgbQ</li>
				</ul>
			</div>
			<div v-for="(artist, index) in artistList" :key="artist.id">
				{{ artist }}
					<div class="flex justify-end w-full gap-2">
						<button class="bg-red-500 px-5 py-2 rounded font-semibold hover:bg-red-700 transition-all duration-300 ease-in-out" @click="reject(artist, index)">Reject</button>
						<button class="bg-green-500 px-5 py-2 rounded font-semibold hover:bg-green-700 transition-all duration-300 ease-in-out" @click="verify(artist, index)">Accept</button>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "updateArtist",
		layout: 'dashboard',

		async asyncData({ $fire }) {
			const firstStepArtist = $fire.functions.httpsCallable("getPendingUpdateArtist")
			const firstStepGroupArtist = $fire.functions.httpsCallable("getGroupsPendingUpdateArtist")
			const firstStepMembersArtist = $fire.functions.httpsCallable("getMembersPendingUpdateArtist")
			let artistList = []
			const secondStepArtist = await firstStepArtist().then(async (res) => {
				await res.data.artists.map(async (element) => {
					firstStepMembersArtist({ idPending: element.idPending }).then((res) => {
						element['members'] = res.data
						firstStepGroupArtist({ idPending: element.idPending }).then((res2) => {
							element['groups'] = res2.data
						})
					})
				});
				return res.data.artists
			})
			console.log("secondStepArtist", secondStepArtist)
			return { artistList: secondStepArtist }
		},

		methods: {
			async verify(artist, index) {
				const idPending = artist.idPending
				const updateArtist = this.$fire.functions.httpsCallable("updateArtistById");
				const deleteArtist = this.$fire.functions.httpsCallable("deletePendingUpdateArtist");
				console.log("artist.groups.length", artist.groups.length)
				console.log("artist.members.length", artist.members.length)
				await this.updateGroups(artist, index).then(async (res) => {
					await this.updateMembers(artist, index).then(async (res) => {
						delete artist.idPending
						delete artist.source
						console.log("artist", artist)
						updateArtist(artist).then((res) => {
							deleteArtist({ idPending: idPending }).then((res) => {
								this.artistList.splice(index, 1)
							})
						})
					})
				})
			},

			async updateGroups (artist, index) {
				new Promise((resolve, reject) => {
					const deleteGroupFromArtist = this.$fire.functions.httpsCallable("deleteGroupsArtist")
					const getActualGroups = this.$fire.functions.httpsCallable("getGroupsArtist")
					getActualGroups({ id: artist.id }).then(async (res) => {
						console.log('res', res)
						if(res.data.length) {
							await res.data.map(async (element) => {
								deleteGroupFromArtist({ id: artist.id, group: element }).then(async (res2) => {
									console.log('res2', res2)
									const addGroupsArtist = this.$fire.functions.httpsCallable("addGroupsArtist")
									await artist.groups?.map((element) => {
										addGroupsArtist({ id: artist.id, group: element }).then((res3) => {
											console.log("res3", res3)
										})
									})
									delete artist.groups
									
								})
							})
							console.log("X")
							resolve("Resolved");
						} else {
							const addGroupsArtist = this.$fire.functions.httpsCallable("addGroupsArtist")
							await artist.groups?.map((element) => {
								addGroupsArtist({ id: artist.id, group: element }).then((res3) => {
									console.log("res3", res3)
								})
							})
							delete artist.groups
							console.log("X")
							resolve("Resolved");
						}
						console.log("groups", artist.groups)
					})
				})
			},

			async updateMembers (artist, index) {
				new Promise((resolve, reject) => {
					const deleteMembersFromArtist = this.$fire.functions.httpsCallable("deleteMembersArtist")
					const getActualMembers = this.$fire.functions.httpsCallable("getMembersArtist")
					getActualMembers({ id: artist.id }).then(async (res) => {
						console.log('res', res)
						if(res.data.length) {
							await res.data.map(async (element) => {
								deleteMembersFromArtist({ id: artist.id, member: element }).then(async (res2) => {
									console.log('res2', res2)
									const addMembersArtist = this.$fire.functions.httpsCallable("addMembersArtist")
									await artist.members?.map((element) => {
										addMembersArtist({ id: artist.id, member: element }).then((res3) => {
											console.log("res3", res3)
										})
									})
									delete artist.members
								})
							})
						} else {
							const addMembersArtist = this.$fire.functions.httpsCallable("addMembersArtist")
							await artist.members?.map((element) => {
								addMembersArtist({ id: artist.id, member: element }).then((res3) => {
									console.log("res3", res3)
								})
							})
							delete artist.members
						}
						console.log("members", artist.members)
					})
				})
			},

			async delete(artist, index) {
				const deleteArtist = this.$fire.functions.httpsCallable("deletePendingUpdateArtist");
				deleteArtist({ idPending: artist.idPending }).then((res) => {
					this.artistList.splice(index, 1)
				})
			},

			reject(artist, index) {
				console.log("Reject")
				const deleteArtist = this.$fire.functions.httpsCallable("deletePendingUpdateArtist");
				deleteArtist({ idPending: artist.idPending })
				this.artistList.splice(index, 1)
			}
		},
	}
</script>