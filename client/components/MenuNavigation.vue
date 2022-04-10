<template>
	<div>
		<nav class="relative bg-gray-500 bg-opacity-10">
			<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div class="relative flex items-center justify-between h-16">
					<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<!-- Mobile menu button-->
						<button
							@click="navMenu = !navMenu"
							type="button"
							class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false"
						>
							<span class="sr-only">Open main menu</span>
							<svg
								class="block h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
							<svg
								class="hidden h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<!-- PC Navigation -->
					<nav
						class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
					>
						<NuxtLink :to="`/`" class="relative lg:space-x-1 flex-shrink-0 flex items-end lg:items-center">
							<img
								class="block lg:hidden h-8 w-auto"
								src="../assets/image/mini-logo.png"
								alt="Comeback"
							/>
							<img
								class="hidden lg:block h-8 w-auto"
								src="../assets/image/logo.png"
								alt="Comeback"
							/>
							<p class="text-red-700 text-xs z-50">v2</p>
						</NuxtLink>
						<div class="hidden sm:block sm:ml-6">
							<div class="flex space-x-4" @click="userMenu = false">
								<NuxtLink
									:to="`/`"
									class="px-3 py-2 rounded-md text-sm font-medium"
									:class="
										$route.name != 'index'
											? 'text-gray-300 hover:bg-zinc-700 hover:text-white'
											: 'bg-zinc-600 text-white'
									"
								>
									Home
								</NuxtLink>
								<NuxtLink
									:to="`/calendar`"
									class="px-3 py-2 rounded-md text-sm font-medium"
									:class="
										$route.name != 'calendar'
											? 'text-gray-300 hover:bg-zinc-700 hover:text-white'
											: 'bg-zinc-600 text-white'
									"
								>
									Calendar
								</NuxtLink>
								<NuxtLink
									:to="`/artist`"
									class="px-3 py-2 rounded-md text-sm font-medium"
									:class="
										$route.name != 'artist'
											? 'text-gray-300 hover:bg-zinc-700 hover:text-white'
											: 'bg-zinc-600 text-white'
									"
								>
									Artists
								</NuxtLink>
							</div>
						</div>
					</nav>

					<!-- PC User Menu -->
					<div
						class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
					>
						<div v-if="userLogged" class="hidden lg:flex">
							<button
								@click="newsModal = true"
								class="bg-red-700 Card px-3 py-2 rounded-md focus:outline-none text-white flex"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 my-auto mx-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 4v16m8-8H4"
									/>
								</svg>
								<span>New Comeback</span>
							</button>
						</div>
						<div v-else class="text-white">
							<nuxt-link to="/authentification" class="font-semibold"
								>Login</nuxt-link
							>
						</div>
						<!-- Profile dropdown -->
						<div v-if="userLogged" class="ml-3 relative">
							<button
								id="user-menu-button"
								type="button"
								class="bg-gray-500 bg-opacity-10 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
								@click="openUserMenu()"
							>
								<span class="sr-only">Open user menu</span>
								<img
									class="h-8 w-8 rounded-full"
									:src="userAvatar"
									alt="User avatar"
								/>
							</button>
							<div
								v-if="userMenu"
								v-click-outside="closeUserMenu"
								@click="closeUserMenu"
								class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-black-one text-white focus:outline-none"
							>
								<!--<NuxtLink
									:to="`/profile/${GET_USER().uid}/general`"
									class="block px-4 py-2 text-sm hover:bg-gray-700"
								>
									Your Profile
								</NuxtLink>-->
								<NuxtLink
									:to="`/add/artist`"
									class="block px-4 py-2 text-sm hover:bg-gray-700"
								>
									Add New Artist
								</NuxtLink>
								<NuxtLink
									v-if="userLogged && userRole != 'NONE'"
									:to="`/dashboard/newArtist`"
									class="block px-4 py-2 text-sm hover:bg-gray-700"
								>
									Dashboard
								</NuxtLink>
								<button
									@click="newsModal = true"
									type="button"
									class="block px-4 py-2 text-sm hover:bg-gray-700 w-full h-full text-left"
								>
									New Comeback
								</button>
								<button
									@click="logout()"
									type="button"
									class="block px-4 py-2 text-sm hover:bg-gray-700 w-full h-full text-left"
								>
									Sign out
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Mobile menu, show/hide based on menu state. -->
			<div
				v-if="navMenu"
				class="animate__animated animate__fadeInDown animate__faster origin-top-right absolute bg-black-one w-full sm:hidden"
				id="mobile-menu"
			>
				<div class="px-2 pt-2 pb-3 space-y-1" @click="navMenu = false">
					<NuxtLink
						:to="`/`"
						class="block px-3 py-2 rounded-md text-base font-medium"
						:class="
							$route.name != 'index'
								? 'text-gray-300 hover:bg-zinc-700 hover:text-white'
								: 'bg-zinc-600 text-white'
						"
					>
						Home
					</NuxtLink>
					<NuxtLink
						:to="`/calendar`"
						class="block px-3 py-2 rounded-md text-base font-medium"
						:class="
							$route.name != 'calendar'
								? 'text-gray-300 hover:bg-zinc-700 hover:text-white'
								: 'bg-zinc-600 text-white'
						"
					>
						Calendar
					</NuxtLink>
					<NuxtLink
						:to="`/artist`"
						class="block px-3 py-2 rounded-md text-base font-medium"
						:class="
							$route.name != 'artist'
								? 'text-gray-300 hover:bg-zinc-700 hover:text-white'
								: 'bg-zinc-600 text-white'
						"
					>
						Artists
					</NuxtLink>
				</div>
			</div>
		</nav>
		<Modal
			v-model="newsModal"
			title="Add a News"
			wrapper-class="animate__animated modal-wrapper"
			:modal-style="{
				background: '#1F1D1D',
				'border-radius': '0.25rem',
				color: 'white',
			}"
			:in-class="`animate__fadeInDown`"
			:out-class="`animate__bounceOut`"
			bg-class="animate__animated"
			:bg-in-class="`animate__fadeInUp`"
			:bg-out-class="`animate__fadeOutDown`"
		>
			<NewsCreation @close="closeNewsModal" :artistList="artistList" />
		</Modal>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "MenuNavigation",

	data() {
		return {
			navMenu: false,
			userMenu: false,
			newsModal: false,

			userLogged: false,
			userRole: "NONE",
			userAvatar: require("@/assets/image/artist.png"),
			artistList: [],
		};
	},

	async fetch() {
		this.artistList = await this.$fire.firestore
			.collection("artists")
			.where("verified", "==", true)
			.get()
			.then((snapshot) => {
				const artists = [];
				snapshot.forEach((doc) => {
					artists.push(doc.data());
				});
				return artists;
			})
			.catch((err) => {
				return { success: false, artists: [] };
			});
		this.artistList.sort((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});
	},

	//watch isLoggedIn function in store
	watch: {
		"$store.getters.isLoggedIn": function (newVal, oldVal) {
			this.userLogged = newVal;
		},
	},

	async created() {
		this.userLogged = this.isLoggedIn();
		if(this.userLogged) {
			this.userRole = this.GET_USER_DATA().role;
		}
	},

	async mounted() {
		this.$toast.info(
			"This website is currently under development, so you may encounter some bugs while using it.",
			{ duration: 3000, position: "top-left" }
		);
	},

	methods: {
		...mapGetters(["GET_USER", "GET_USER_DATA", "isLoggedIn"]),

		logout() {
			this.$fire.auth
				.signOut()
				.then(() => {
					this.$router.push("/");
					this.userRole = "NONE";
					this.$toast.error("You are log out!", {
						duration: 3000,
						position: "top-right",
					});
				})
				.catch((error) => {
					console.log(error);
				});
		},

		openUserMenu() {
			this.userMenu = true;
		},

		closeUserMenu() {
			this.userMenu = false;
		},

		closeNewsModal() {
			this.newsModal = false;
		},
	},
};
</script>

<style>
.modal-custom {
	background: #1f1d1d;
	border-radius: 0.25rem;
	color: white;
}
</style>