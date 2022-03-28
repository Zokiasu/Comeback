<template>
	<div class="flex flex-col justify-center space-y-2 py-3 text-white">
		<multiselect
			label="name"
			track-by="name"
			v-model="artistSelected"
			:options="artistList"
			placeholder="Please select an artist"
			:close-on-select="true"
			:clear-on-select="true"
			:preserve-search="false"
		/>
		<t-datepicker
			placeholder="Date"
			initial-view="month"
			dateFormat="Y-m-d"
			clearable
			v-model="newsDate"
			class="text-black"
		/>
		<t-textarea
			type="text"
			name="News"
			placeholder="Your News*"
			v-model="newsMessage"
		/>
		<t-textarea
			type="text"
			name="Source"
			placeholder="Source*"
			v-model="newsSource"
		/>
		<button
			class="texts px-3 py-2 rounded-sm flex justify-center transition duration-500 ease-in-out bg-red-700 hover:bg-red-900 transform hover:-translate-y-1 hover:scale-110 hover:font-bold text-white"
			@click="sendNews()"
		>
			{{ loading ? 'Loading...' : 'Send the news'}}
		</button>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "NewsCreation",

	props: {
		artistList: {
			type: Array,
			required: true,
			default: () => [],
		},
	},

	data() {
		return {
			artistSelected: null,
			newArtist: false,
			newsArtistName: null,
			newsDate: null,
			newsMessage: null,
			newsSource: null,
			loading: false,
			user: null,
			createNews: null
		};
	},

	mounted() {
		this.user = this.GET_USER_DATA();
		this.createNews = this.$fire.functions.httpsCallable("createNews");
	},

	methods: {
		...mapGetters(["GET_USER_DATA"]),

		async sendNews() {
			this.user = this.GET_USER_DATA();
			if (!this.newsMessage) {
				this.$toast.error("Please write a news or close the window", { duration: 3000, position: "top-right" });
			} else if (!this.artistSelected) {
				this.$toast.error("Please select a artist or suggest one", { duration: 3000, position: "top-right" });
			} else {
				this.createNews({
					message: this.newsMessage,
					date: this.newsDate,
    			verified: false,
					source: this.newsSource,
					user: {
						id: this.user.id,
						name: this.user.name,
						picture: this.user.picture,
					},
					artist: {
						id: this.artistSelected.id,
						name: this.artistSelected.name,
						image: this.artistSelected.image,
					},
				}).then((res) => {
					console.log("News sent", res);
					this.$toast.success("News sent", { duration: 3000, position: "top-right" });
					this.$emit("close");
				});
			}
		},

		dateFormat(d) {
			let ye = new Intl.DateTimeFormat("en", { year: "2-digit" }).format(d);
			let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
			let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
			return `${da}/${mo}/${ye}`;
		},

		closeModal() {
			this.$emit("close");
		},
	},

	watch: {
		newsDate: {
			immediate: true,
			handler(newsDate) {
				if (process.client) {
					if (newsDate)
						this.newsMessage = `Next comeback on ${this.dateFormat(new Date(newsDate))}`;
				}
			},
		},
	},
};
</script>