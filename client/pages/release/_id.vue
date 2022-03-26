<template>
	<div class="container mx-auto head w-full text-white p-5 md:p-10 lg:flex lg:items-center">
		<div class="space-y-5 lg:space-y-10 w-fit mx-auto">
			<div class="space-y-1">
				<h1 class="text-2xl lg:text-5xl font-semibold">{{release.name}}</h1>
				<div class="flex gap-2">
					<p class="text-2xl">{{release.type}} -</p>
					<nuxt-link :to="`/artist/${release.artist.id}`">
						<h2 class="text-2xl hover-underline-animation">{{release.artist.name}}</h2>
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
									<nuxt-link :to="`/artist/${release.artist.id}`">
										<p class="flex hover-underline-animation">{{release.artist.name}}</p>
									</nuxt-link>
								</div>
							</div>
							<button>
								<icons-play class="w-8 h-8"/>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

	async asyncData({ params, $fire, store }) {
		const readReleaseById = $fire.functions.httpsCallable("readReleaseById");
		const getMusicToRelease = $fire.functions.httpsCallable("getMusicToRelease");
		const getArtistById = $fire.functions.httpsCallable("getArtistById");

		let release = await readReleaseById({ id: params.id }).then((response) => {
			console.log("release", response.data.release);
			const releaseTmp = response.data.release;
			return getMusicToRelease({id: releaseTmp.id}).then((res) => {
				console.log("music", res.data);
				releaseTmp["music"] = res.data;
				return getArtistById({id: releaseTmp.artists}).then((res) => {
					console.log("artist", res.data.artist);
					releaseTmp["artist"] = res.data.artist;
					return releaseTmp;
				});
			});
		})

		return { release };
	},
}
</script>

<style>
	.head{
		min-height: calc(100vh - 4rem);
	}
</style>