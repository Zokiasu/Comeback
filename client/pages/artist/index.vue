<template>
	<div>
		<section id="searchbar" class="flex w-full justify-start p-5">
			<div id="search-icon" class="bg-opacity-20 bg-gray-500 rounded-l p-2">
				<icons-search v-if="!searchActive" class="w-5 h-5 cursor-pointer" />
				<icons-cancel v-else class="w-5 h-5 cursor-pointer" />
			</div>
			<input
				id="search-input"
				type="text"
				placeholder="Search"
				v-model="search"
				class="w-full pl-2 focus:outline-none rounded-r rounded-none bg-opacity-20 bg-gray-500 text-white placeholder-white"
			/>
		</section>
		<transition-group
			id="artist-list"
			name="list-complete"
			tag="div"
			class="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 1xl:grid-cols-7 2xl:grid-cols-10 gap-5 w-full justify-center p-5"
		>
			<artist-card
				v-for="artist in filteredArtistList"
				:key="artist.id"
				:image="artist.image"
				:name="artist.name"
				:id="artist.id"
				:type="artist.type"
				:groups="artist.groups"
				class="list-complete-item w-40"
			/>
		</transition-group>
		<div v-if="(filteredArtistList.length < 1) & !loading" class="px-5">
			<p
				class="text-white bg-[#6B728033] w-full flex justify-center rounded p-2"
			>
				No artists found.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Artists",

	head() {
		return {
			title: "Comeback - Artists",
		};
	},

	data() {
		return {
			search: "",
			artists: [],
			loading: true,
			searchActive: false,
			limitedAt: 50,
			dsl:0,
		};
	},

	mounted(){
    var vm = this
    window.addEventListener('scroll', function(e){
      var scrollPos = window.scrollY
      var winHeight = window.innerHeight
      var docHeight = document.documentElement.scrollHeight
      var perc = 100 * scrollPos / (docHeight - winHeight)
			if(perc > 50){
				//vm.limitedAt += 50
				vm.fetchData()
			}
    })
	},

	watch: {
		search: {
			immediate: true,
			handler(search) {
				if (search != "") {
					this.searchActive = true;
				} else {
					this.searchActive = false;
				}
			},
		},
	},

	computed: {
		filteredArtistList() {
			const list = this.artists.filter(element => {
				return element.name.toLowerCase().includes(this.search.toLowerCase());
			})
			return list;
		}
	},

	async fetch () {
		const firstStepArtist = this.$fire.functions.httpsCallable("getArtistListLimited");
		firstStepArtist({ limit: this.limitedAt })
			.then((response) => {
				console.log(response)
				this.artists = response.data;
				this.loading = false;
				this.limitedAt = this.limitedAt + 20;
			})
			.catch((error) => {
				console.log(error);
			});
	},

	methods: {
		async fetchData() {
			const firstStepArtist = this.$fire.functions.httpsCallable("getArtistListLimited");
			firstStepArtist({ limit: this.limitedAt })
				.then((response) => {
					this.artists = response.data;
					this.loading = false;
					this.limitedAt = this.limitedAt + 20;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	}
};
</script>

<style scoped>
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