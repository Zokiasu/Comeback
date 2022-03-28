<template>
	<div class="container mx-auto head w-full text-white p-5 md:p-10 lg:flex lg:items-center">
		<div class="space-y-5 lg:space-y-10 w-fit mx-auto">
			<div class="space-y-1">
				<h1 class="text-2xl lg:text-5xl font-semibold">{{release.name}}</h1>
				<div class="flex gap-2">
					<p class="text-2xl">{{release.type}} -</p>
					<nuxt-link :to="`/artist/${release.artistsId}`">
						<h2 class="text-2xl hover-underline-animation">{{release.artistsName}}</h2>
					</nuxt-link>
				</div>
				<div
					v-if="release.platforms"
					class="flex flex-wrap overflow-x-scroll gap-3"
				>
					<cb-external-link
						v-for="link in release.platforms"
						:key="link"
						:href="link"
						class="hover:bg-black/50"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-10 lg:flex-row xl:gap-20 w-fit">
				<div class="w-fit h-fit mx-auto">
					<img :src="release.image" class="bg-gray-300 rounded-md h-1/3 shadow-2xl shadow-zinc-700">
				</div>
				<div class="lg:h-[34rem] lg:w-[30rem] pr-5 pb-2 overflow-hidden overflow-y-scroll">
					<ul class="space-y-5">
						<li v-for="music in release.music" :key="music.id" class="flex items-center justify-between gap-5">
							<div class="flex items-center gap-5">
								<img :alt="music.name" :src="release.image" class="bg-gray-300 rounded-md h-14 w-14 shadow-2xl shadow-zinc-700">
								<div>
									<h3 class="font-semibold">{{music.name}}</h3>
									<nuxt-link :to="`/artist/${release.artistsId}`">
										<p class="flex text-left hover-underline-animation">{{release.artistsName}}</p>
									</nuxt-link>
								</div>
							</div>
							<a :href="`https://youtu.be/${music.videoId}`" target="_blank">
								<icons-play class="w-8 h-8"/>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	async asyncData({ params, $fire }) {
		let release = await $fire.firestore.collection("releases").doc(params.id).get().then(doc => {
			const res = doc.data()
			return $fire.firestore.collection("releases").doc(res.id).collection("musics").get().then(snap => {
				res["music"] = snap.docs.map(doc => doc.data())
				return $fire.firestore.collection("artists").doc(res.artistsId).get().then(docs => {
					res["artist"] = docs.data()
					return res
				})
			})
		});

		return { release };
	},
}
</script>

<style>
	.head{
		min-height: calc(100vh - 4rem);
	}
</style>