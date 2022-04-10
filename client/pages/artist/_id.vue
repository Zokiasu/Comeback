<template>
	<div class="text-white">
		<div
			class="background-top bg-cover bg-no-repeat relative h-60 lg:h-96 xl:h-[35rem] overflow-hidden"
		>
			<img
				:src="imageBackground"
				:alt="artist.name"
				class="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover"
			/>
			<div
				class="absolute top-0 bottom-0 left-0 right-0 flex p-5 lg:p-10 xl:p-14 xl:px-32 bg-black/50"
			>
				<div class="overflow-x-auto flex flex-col gap-8 mt-auto">
					<div>
						<h1 class="text-6xl lg:text-8xl font-semibold">
							{{ artist.name }}
						</h1>
					</div>
					<div
						v-if="artist.platforms.length"
						class="flex flex-wrap overflow-x-scroll gap-3 testa"
					>
						<cb-external-link
							v-for="link in artist.platforms"
							:key="link"
							:href="link"
						/>
					</div>
					<div
						v-if="artist.socials.length"
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
			<div v-if="soloMembers.length" class="space-y-5">
				<h2 class="text-xl font-semibold">Members</h2>
				<transition-group name="list-complete" tag="div" class="flex flex-wrap gap-10">
					<artist-card
						v-for="artist in soloMembers"
						:key="artist.id"
						:image="artist.image"
						:name="artist.name"
						:id="artist.id"
						class="w-32 md:w-40"
					/>
				</transition-group>
			</div>
			<div v-if="releases.length" class="space-y-5">
				<h2 class="text-xl font-semibold">Release</h2>
				<transition-group name="list-complete" tag="div" class="flex flex-wrap gap-10">
					<release-card
						v-for="release in releases"
						:key="release.id"
						:id="release.id"
						:image="release.image"
						:date="release.date"
						:name="release.name"
						:type="release.type"
						:artists="{ id: release.artistsId, name: release.artistsName }"
						:displayDate="true"
						class="w-32 md:w-40"
					/>
				</transition-group>
			</div>
			<div v-if="groupMembers.length" class="space-y-5">
				<h2 class="text-xl font-semibold">Subunit</h2>
				<transition-group name="list-complete" tag="div" class="flex flex-wrap gap-10">
					<artist-group-card
						v-for="artist in groupMembers"
						:key="artist.id"
						:image="artist.image"
						:name="artist.name"
						:id="artist.id"
						class="w-32 md:w-40"
					/>
				</transition-group>
			</div>
			<div v-if="groups.length" class="space-y-5">
				<h2 class="text-xl font-semibold">Group's Unit</h2>
				<transition-group name="list-complete" tag="div" class="flex flex-wrap gap-8">
					<artist-group-card
						v-for="artist in groups"
						:key="artist.id"
						:image="artist.image"
						:name="artist.name"
						:id="artist.id"
						class="w-32 md:w-40"
					/>
				</transition-group>
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
		const getArtist = await $fire.firestore.collection("artists").doc(params.id).get().then(doc => {
			return doc.data();
		});

		const getReleaseByArtist = await $fire.firestore.collection("releases").where("artistsId", "==", params.id).get().then(snapshot => {
			const releaseL = [];
			// ajouter dans releaseL et trier par date
			snapshot.forEach(doc => {
				const release = doc.data();
				release.date = new Date(doc.data().date.seconds * 1000);
				releaseL.push(release);
			});
			//trier par date
			releaseL.sort((a, b) => {
				return b.date - a.date;
			});
			return releaseL;
		});

		const getMembers = await $fire.firestore.collection("artists").doc(params.id).collection("members").orderBy("name", "asc").get().then(snapshot => {
			const members = [];
			snapshot.forEach(doc => {
				members.push(doc.data());
			});
			return members;
		});

		const getGroups = await $fire.firestore.collection("artists").doc(params.id).collection("groups").orderBy("name", "asc").get().then(snapshot => {
			const groups = [];
			snapshot.forEach(doc => {
				const group = doc.data();
				group.id = doc.id;
				groups.push(group);
			});
			return groups;
		});

		const liked	= false
		if (store.state.isLoggedIn) {
			liked = await $fire.firestore.collection("artists").doc(params.id).collection("followers").where("id", "==", store.state.user.uid).get().then(snapshot => {
				if (snapshot.size > 0) {
					return true;
				}
				return false;
			}).catch(err => {
				console.log(err);
			});
		}

		return { artist : getArtist, releases: getReleaseByArtist, members: getMembers, groups: getGroups, liked: liked };
	},

	async created() {
		if(this.isLoggedIn()) {
			this.displayOnlineOption = this.isLoggedIn();
			this.admin = this.isAdmin();
			this.userInfo = this.GET_USER_DATA();
		}
		this.imageBackground = this.artist.image.toString();
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
				this.$fire.functions.httpsCallable("addFollowerArtist");
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
			const deleteFollowerArtist = this.$fire.functions.httpsCallable(
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
.list-complete-item {
	transition: all 0.5s;
	display: inline-block;
}
.list-complete-enter,
.list-complete-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
.list-complete-leave-active {
	position: absolute;
}
</style>