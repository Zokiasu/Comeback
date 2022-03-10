<template>
	<div class="flex flex-col p-5 md:px-20 lg:px-40 text-white">
		<div class="space-y-5">
			<div>
				<div class="flex gap-5">
					<p class="text-3xl">{{ currentYear }}</p>
					<div class="grid grid-cols-2 my-auto">
						<button @click="changeYear(currentYear+1)" class="px-1">
							<icons-arrow-up class="w-5 h-5"/>
						</button>
						<button @click="changeYear(currentYear-1)" class="px-1">
							<icons-arrow-down class="w-5 h-5"/>
						</button>
					</div>
				</div>
				<div class="flex gap-5">
					<h1 class="text-7xl font-semibold">{{ month[currentMonth] }}</h1>
					<div class="grid grid-cols-1 my-auto mt-4 space-y-2">
						<button @click="changeMonth(currentMonth+1)" class="p-1">
							<icons-arrow-up class="w-5 h-5"/>
						</button>
						<button @click="changeMonth(currentMonth-1)" class="p-1">
							<icons-arrow-down class="w-5 h-5"/>
						</button>
					</div>
				</div>
			</div>
			<div>
				<ul class="flex flex-wrap gap-5">
					<li>
						<button 
						@click="onlyAlbums=!onlyAlbums;onlyEps=false;onlySingles=false;" 
						class="px-3 py-2 border rounded" 
						:class="onlyAlbums ? 'border-red-500 text-red-500 font-semibold border-2':''">
						Album
						</button>
					</li>
					<li>
						<button @click="onlyEps=!onlyEps;onlyAlbums=false;onlySingles=false;" 
						class="px-3 py-2 border rounded" 
						:class="onlyEps ? 'border-red-500 text-red-500 font-semibold border-2':''">
						EP
						</button>
					</li>
					<li>
						<button 
						@click="onlySingles=!onlySingles;onlyAlbums=false;onlyEps=false;" 
						class="px-3 py-2 border rounded" 
						:class="onlySingles ? 'border-red-500 text-red-500 font-semibold border-2':''">
						Single
						</button>
					</li>
				</ul>
			</div>
			<transition-group name="list-complete" tag="div" class="flex flex-wrap gap-7 max-w-[110rem]">
				<LazyReleaseCard
					v-for="release in filteredList"
					:key="release.id"
					:id="release.id"
					:image="release.image"
					:date="release.date"
					:name="release.name"
					:type="release.type"
					:artists="release.artists"
					displayDate
					class="list-complete-item"
				/>
			</transition-group>
			<div v-if="filteredList.length < 1 & !loading">
				<p class="text-center text-xl bg-gray-500 w-full p-5 rounded">Oops... {{ filteredList.length }} releases found</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

		head() {
			return {
				title: "Comeback - Calendar",
				meta: [
					{
						hid: 'description',
						name: 'description',
						content: "Find all the artists' releases by day and according to your preferences.",
					}
				]
			}
		},

		data(){
			return {
				startDate: null,
				endDate: null,
				releaseList: [],
				onlyAlbums: false,
				onlyEps: false,
				onlySingles: false,
				loading: true,
				currentYear: new Date().getFullYear(),
				currentMonth: new Date().getMonth(),
				month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			}
		},

		created(){
			this.startDate = new Date(this.currentYear, this.currentMonth, 1);
			this.endDate = new Date(this.currentYear, this.currentMonth + 1, 0);
		},

		//fetch the list of releases
		async fetch () {
			this.loading = true
			let tmpList = []
			this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.dateFormat(this.startDate)}&date_inf=${this.dateFormat(this.endDate)}`).then(response => {
				if(Object.entries(response.data).length) {
					for(let [key, value] of Object.entries(response.data)) {
						if(value.releases) {
							tmpList = tmpList.concat(value.releases)
							tmpList = [...new Set(tmpList, value.releases)]
							tmpList.sort(function(a,b) {
								if(a.date?.toLowerCase() > b.date?.toLowerCase()) {return -1}
								if(a.date?.toLowerCase() < b.date?.toLowerCase()) {return 1}
								return 0;
							})
						}
					}
				}
				this.releaseList = tmpList
				this.loading = false
			})
		},

		computed: {
			filteredList() {
				return this.releaseList.filter(element => {
					if(this.onlyAlbums && element.type.toLowerCase() !== 'album') return false
					if(this.onlyEps && element.type.toLowerCase() !== 'ep') return false
					if(this.onlySingles && element.type.toLowerCase() !== 'single') return false
					return true
				})
			}
		},

		methods: {

			dateFormat(d){
				let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
				let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
				let da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
				return `${mo}/${da}/${ye}`
			},

			async fetchData() {
				let tmpList = []
				this.$axios.get(`https://comeback-api.herokuapp.com/calendar?date_sup=${this.dateFormat(this.startDate)}&date_inf=${this.dateFormat(this.endDate)}`).then(response => {
					if(Object.entries(response.data).length) {
						for(let [key, value] of Object.entries(response.data)) {
							if(value.releases) {
								tmpList = tmpList.concat(value.releases)
								tmpList = [...new Set(tmpList, value.releases)]
								tmpList.sort(function(a,b){
									if(a.date?.toLowerCase() > b.date?.toLowerCase()) {return -1}
									if(a.date?.toLowerCase() < b.date?.toLowerCase()) {return 1}
									return 0;
								})
							}
						}
						this.loading = false
					}
					this.releaseList = tmpList
				})
				.catch(error => {
					console.log(error);
				});
			},

			changeMonth(month) {
				if(month < 0) {
					this.currentMonth = 11
					this.currentYear--
				} else if(month > 11) {
					this.currentMonth = 0
					this.currentYear++
				} else {
					this.currentMonth = month
				}
				this.startDate = new Date(this.currentYear, this.currentMonth, 1);
				this.endDate = new Date(this.currentYear, this.currentMonth + 1, 0);
				this.fetchData()
			},

			changeYear(year) {
				this.startDate = new Date(year, this.currentMonth, 1);
				this.endDate = new Date(year, this.currentMonth + 1, 0);
				this.currentYear = year
				this.fetchData()
			},
		},
	}
</script>

<style scoped>
	.list-complete-item {
		transition: all 0.5s;
		display: inline-block;
	}
	.list-complete-enter, .list-complete-leave-to {
		opacity: 0;
		transform: translateY(30px);
	}
	.list-complete-leave-active {
		position: absolute;
	}
</style>