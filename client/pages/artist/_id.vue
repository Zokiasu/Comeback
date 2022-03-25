<template>
	<div class="text-white">
		<div
			class="background-top bg-cover bg-no-repeat relative h-[15rem] lg:h-[25rem] overflow-hidden"
		>
			<img
				:src="imageBackground"
				:alt="artist.name"
				class="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover"
			/>
			<div
				class="absolute top-0 bottom-0 left-0 right-0 flex p-5 lg:p-10 xl:p-14 xl:px-32 bg-black/50"
			>
				<div class="flex gap-10 lg:my-auto">
					<div class="hidden lg:block">
						<img
							alt="image de l'artiste"
							:src="artist.image"
							class="aspect-square h-72 object-cover rounded shadow-2xl"
						/>
					</div>
					<div class="overflow-x-auto flex flex-col gap-8 mt-auto lg:mb-2">
						<div>
							<h1 class="text-6xl lg:text-8xl font-semibold">
								{{ artist.name }}
							</h1>
						</div>
						<div
							v-if="artist.platforms"
							class="flex flex-wrap overflow-x-scroll gap-3 testa"
						>
							<cb-external-link
								v-for="link in artist.platforms"
								:key="link"
								:href="link"
							/>
						</div>
						<div
							v-if="artist.socials"
							class="flex flex-wrap overflow-x-scroll gap-3 testa"
						>
							<cb-external-link
								v-for="link in artist.socials"
								:key="link"
								:href="link"
							/>
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="displayOnlineOption"
				class="absolute top-5 right-5 flex items-center gap-2"
			>
				<div @click="followTest()" class="cursor-pointer">
					<icons-heart-filled
						v-if="liked"
						class="text-white w-8 h-8 transition ease-in-out duration-300"
					/>
					<icons-heart-outline
						v-else
						class="text-white w-8 h-8 transition ease-in-out duration-300"
					/>
				</div>
				<div v-if="admin">
					<nuxt-link :to="`/edit/artist/${$route.params.id}`">Edit this page</nuxt-link>
				</div>
			</div>
		</div>
		<div class="p-5 lg:p-10 xl:p-14 xl:px-32 space-y-10">
			<div>
				<p>{{ artist.description }}</p>
			</div>
			<div v-if="releases.length" class="space-y-5">
				<h2 class="text-xl font-semibold">Release</h2>
				<div class="flex flex-wrap gap-8">
					<release-card
						v-for="release in releases"
						:key="release.id"
						:id="release.id"
						:image="release.image"
						:date="release.date"
						:name="release.name"
						:type="release.type"
						:displayDate="true"
						class="w-40"
					/>
				</div>
			</div>
			<div v-if="soloMembers.length" class="space-y-5">
				<h2 class="text-xl font-semibold">Members</h2>
				<div class="flex flex-wrap gap-8 lg:justify-between">
					<artist-card
						v-for="artist in soloMembers"
						:key="artist.id"
						:image="artist.image"
						:name="artist.name"
						:id="artist.id"
						class="w-40"
					/>
				</div>
			</div>
			<div v-if="groupMembers.length" class="space-y-5">
				<h2 class="text-xl font-semibold">Subunit</h2>
				<div class="flex flex-wrap gap-8">
					<artist-group-card
						v-for="artist in groupMembers"
						:key="artist.id"
						:image="artist.image"
						:name="artist.name"
						:id="artist.id"
						class="w-40"
					/>
				</div>
			</div>
			<div v-if="groups.length" class="space-y-5">
				<h2 class="text-xl font-semibold">Group's Unit</h2>
				<div class="flex flex-wrap gap-8">
					<artist-group-card
						v-for="artist in groups"
						:key="artist.id"
						:image="artist.image"
						:name="artist.name"
						:id="artist.id"
						class="w-40"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	head() {
		return {
			title: this.artist?.name,
			meta: [
				{
					hid: "description",
					name: "description",
					content: this.artist?.description,
				},
			],
		};
	},

	data() {
		return {
			liked: false,
			displayOnlineOption: false,
			admin: false,
			seeDescription: false,
			artist: null,
			members: [],
			groups: [],
			releases: [],
			userInfo: null,
			imageBackground: "https://picsum.photos/200",
		};
	},

	async asyncData({ params, $fire, store }) {
		const firstStepArtistId = $fire.funcstions('europe-west1').httpsCallable("getArtistById");
		const secondStepArtistId = await firstStepArtistId({ id: params.id });
		const artist = secondStepArtistId.data.artist;

		return { artist };
	},

	async created() {
		this.displayOnlineOption = this.isLoggedIn();
		this.admin = this.isAdmin();
		this.imageBackground = this.artist.image.toString();
	},

	async mounted() {
		const firstStepFollowArtistId = this.$fire.funcstions('europe-west1').httpsCallable(
			"getFollowerArtistExisted"
		);
		const secondStepFollowArtistId = await firstStepFollowArtistId({
			id: this.$route.params.id,
			user: this.$store.state.user.uid,
		});
		this.liked = secondStepFollowArtistId.data.added;

		const firstStepReleaseId =
			this.$fire.funcstions('europe-west1').httpsCallable("getReleaseByArtist");
		const secondStepReleaseId = await firstStepReleaseId({
			id: this.$route.params.id,
		});
		this.releases = secondStepReleaseId.data;

		const firstStepArtistGroupsId =
			this.$fire.funcstions('europe-west1').httpsCallable("getGroupsArtist");
		const secondStepArtistGroupsId = await firstStepArtistGroupsId({
			id: this.$route.params.id,
		});
		this.groups = secondStepArtistGroupsId.data;

		const firstStepArtistMembersId =
			this.$fire.funcstions('europe-west1').httpsCallable("getMembersArtist");
		const secondStepArtistMembersId = await firstStepArtistMembersId({
			id: this.$route.params.id,
		});
		this.members = secondStepArtistMembersId.data;
	},

	watch: {
		"$store.getters.isLoggedIn": function (newVal, oldVal) {
			this.displayOnlineOption = newVal;
		},
		"$store.getters.isAdmin": function (newVal, oldVal) {
			this.admin = newVal;
		},
	},

	computed: {
		soloMembers() {
			return this.members.filter((member) => member.type === "SOLO");
		},
		groupMembers() {
			return this.members.filter((member) => member.type === "GROUP");
		},
	},

	methods: {
		...mapGetters(["GET_USER", "GET_USER_DATA", "isLoggedIn", "isAdmin"]),

		followTest() {
			if (this.liked) {
				this.unfollowArtist();
			} else {
				this.followArtist();
			}
		},

		async followArtist() {
			const addFollowerArtist =
				this.$fire.funcstions('europe-west1').httpsCallable("addFollowerArtist");
			addFollowerArtist({
				id: this.artist.id,
				user: {
					id: this.GET_USER().uid,
					image: this.GET_USER_DATA().image,
					name: this.GET_USER_DATA().name,
				},
			}).then((res) => {
				this.liked = true;
			});
		},

		async unfollowArtist() {
			const deleteFollowerArtist = this.$fire.funcstions('europe-west1').httpsCallable(
				"deleteFollowerArtist"
			);
			deleteFollowerArtist({
				id: this.artist.id,
				user: {
					id: this.GET_USER().uid,
					image: this.GET_USER_DATA().image,
					name: this.GET_USER_DATA().name,
				},
			}).then((res) => {
				this.liked = false;
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