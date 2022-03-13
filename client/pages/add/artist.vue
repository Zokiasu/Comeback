<template>
	<div class="p-5 lg:p-10 flex flex-col sm:mx-auto">
		<div class="bg-black-one w-full rounded-lg p-5 lg:max-w-full mx-auto">
			<h2 class="text-white text-3xl font-semibold mb-3">Create New Artist</h2>
			<div class="flex flex-wrap gap-5">
				<!-- Picture -->
				<div class="w-full">
					<label
						for="name"
						class="block uppercase tracking-wide text-white font-semibold mb-2"
					>
						Picture*
					</label>
					<div class="flex flex-wrap gap-5">
						<img
							:src="image"
							:alt="name"
							class="object-cover rounded w-full md:w-auto md:max-w-lg"
						/>
						<button
							@click="launchImageFile"
							:disabled="isUploadingImage"
							type="button"
							class="
								w-full
								md:w-auto
								h-full
								bg-red-one
								rounded
								text-white
								py-2
								px-4
							"
						>
							Upload
						</button>
						<input
							ref="imageFile"
							@change.prevent="uploadImageFile($event.target.files)"
							type="file"
							accept="image/png, image/jpeg"
							class="hidden"
						/>
					</div>
				</div>
				<!-- Name & Youtube Music Id -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
					<!-- Name -->
					<div class="w-full">
						<label
							for="name"
							class="
								block
								uppercase
								tracking-wide
								text-white
								font-semibold
								mb-2
							"
						>
							Name*
						</label>
						<input
							id="name"
							type="text"
							placeholder="Name"
							v-model="name"
							class="
								appearance-none
								block
								w-full
								rounded
								py-3
								px-4
								leading-tight
								focus:outline-none
								bg-gray-200
								text-gray-700
								border border-gray-200
								focus:bg-white focus:border-gray-500
							"
						/>
					</div>
					<!-- Youtube Music Id -->
					<div class="w-full">
						<label
							for="ytb-music-id"
							class="
								block
								uppercase
								tracking-wide
								text-white
								font-semibold
								mb-2
							"
						>
							Youtube Music Id*
						</label>
						<input
							id="ytb-music-id"
							type="text"
							placeholder="Youtube Music ID"
							v-model="idYoutubeMusic"
							class="
								appearance-none
								block
								w-full
								rounded
								py-3
								px-4
								leading-tight
								focus:outline-none
								bg-gray-200
								text-gray-700
								border border-gray-200
								focus:bg-white focus:border-gray-500
							"
						/>
					</div>
				</div>
				<!-- Type -->
				<div class="w-full">
					<label
						for="type"
						class="block uppercase tracking-wide text-white font-semibold mb-2"
					>
						Type
					</label>
					<!--Select Solo or Group -->
					<select
						id="type"
						v-model="type"
						class="
							block
							w-full
							rounded
							py-3
							px-4
							leading-tight
							focus:outline-none
							bg-gray-200
							text-gray-700
							border border-gray-200
							focus:bg-white focus:border-gray-500
						"
					>
						<option value="SOLO">Solo</option>
						<option value="GROUP">Group</option>
					</select>
				</div>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
					<!-- Members -->
					<div class="w-full">
						<label
							for="members"
							class="block uppercase tracking-wide text-white font-semibold mb-2"
							>Members</label
						>
						<multiselect
							id="members"
							label="name"
							track-by="name"
							v-model="members"
							:options="artistList"
							placeholder="Search an artist"
							:multiple="true"
							:close-on-select="false"
							:clear-on-select="false"
							:preserve-search="false"
						/>
					</div>
					<!-- Groups -->
					<div class="w-full">
						<label
							for="groups"
							class="block uppercase tracking-wide text-white font-semibold mb-2"
						>
							Groups
						</label>
						<multiselect
							label="name"
							track-by="name"
							v-model="groups"
							:options="artistList"
							placeholder="Search a group"
							:multiple="true"
							:close-on-select="false"
							:clear-on-select="false"
							:preserve-search="false"
						/>
					</div>
				</div>
				<!-- Styles -->
				<div class="w-full">
					<label
						for="styles"
						class="block uppercase tracking-wide text-white font-semibold mb-2"
					>
						Styles
					</label>
					<multiselect
						v-model="styles"
						:options="styleList"
						tag-placeholder="Add this as new style" 
						placeholder="Search or add a style"
						:multiple="true"
            :taggable="true"
						:close-on-select="false"
						:clear-on-select="false"
						:preserve-search="false"
            @tag="addStyle"
					/>
				</div>
				<!-- Description -->
				<div class="w-full">
					<label
						for="description"
						class="block uppercase tracking-wide text-white font-semibold mb-2"
					>
						Description
					</label>
					<textarea
						id="description"
						type="text"
						placeholder="Description"
						v-model="description"
						class="
							appearance-none
							block
							w-full
							rounded
							py-3
							px-4
							leading-tight
							focus:outline-none
							bg-gray-200
							text-gray-700
							border border-gray-200
							focus:bg-white focus:border-gray-500
						"
					/>
				</div>
				<!-- Social Media & Streaming Platforms Links -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
					<!-- Social Media Link -->
					<div class="w-full">
						<label
							for="description"
							class="
								block
								uppercase
								tracking-wide
								text-white
								font-semibold
								mb-2
							"
						>
							Social Media Link
						</label>
						<MultipleInput
							class="mb-1 w-full"
							v-for="(element, index) in socials"
							:key="index"
							:element="element"
							placeholder="Add a social media link"
							icon
							@updateinput="updateList(socials, $event, index)"
							@deleteinput="deleteList(socials, index)"
						/>
						<button
							class="
								w-full
								text-left
								focus:outline-none
								flex
								space-x-2
								bg-white bg-opacity-30
								p-2
								justify-center
								rounded
							"
							@click="addSocialLink()"
						>
							<icons-plus class="w-5 h-5 text-main-gray" />
						</button>
					</div>
					<!-- Streaming Platforms Link -->
					<div class="w-full">
						<label
							for="description"
							class="
								block
								uppercase
								tracking-wide
								text-white
								font-semibold
								mb-2
							"
						>
							Streaming Platforms Link
						</label>
						<MultipleInput
							class="mb-1 w-full"
							v-for="(element, index) in platforms"
							:key="index"
							:element="element"
							placeholder="Add a platform link"
							icon
							@updateinput="updateList(platforms, $event, index)"
							@deleteinput="deleteList(platforms, index)"
						/>
						<button
							class="
								w-full
								text-left
								focus:outline-none
								flex
								space-x-2
								bg-white bg-opacity-30
								p-2
								justify-center
								rounded
							"
							@click="addPlatformLink()"
						>
							<icons-plus class="w-5 h-5 text-main-gray" />
						</button>
					</div>
				</div>
				<!-- Source -->
				<div class="w-full">
					<label
						for="source"
						class="block uppercase tracking-wide text-white font-semibold mb-2"
					>
						Source*
					</label>
					<textarea
						id="source"
						type="text"
						placeholder="Source"
						v-model="source"
						class="
							appearance-none
							block
							w-full
							rounded
							py-3
							px-4
							leading-tight
							focus:outline-none
							bg-gray-200
							text-gray-700
							border border-gray-200
							focus:bg-white focus:border-gray-500
						"
					/>
				</div>
				<div class="w-full flex justify-end">
					<button
						class="bg-red-one px-4 py-2 rounded text-white font-semibold"
						@click="createArtist()"
					>
						Send Artist
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "CreateArtist",

	data() {
		return {
			name: "",
			image: "https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Freleases.png?alt=media&token=e4b0ae0c-3a5d-4ecd-a745-c4439811dcce",
			type: "SOLO",
			description: "",
			idYoutubeMusic: "",
			source: "",
			socials: [],
			platforms: [],
			members: [],
			groups: [],
			styles: [],
			// general
			isUploadingImage: false,
			artistList: [],
			styleList: [],
			newStyleAdded: false,
		};
	},

	async asyncData({ $fire }) {
		const firstStepArtist = $fire.functions.httpsCallable("getArtist")
		const secondStepArtist = await firstStepArtist({})
		const firstStepStyle = $fire.functions.httpsCallable("getStyles")
		const secondStepStyle = await firstStepStyle({})
		return {
			artistList: secondStepArtist.data.artists,
			styleList: secondStepStyle.data.styles,
		};
	},

	//watch all changes
	// watch: {
	// 	name: {
	// 		handler: function (val) {
	// 			console.log("name", val);
	// 		},
	// 		deep: true,
	// 	},
	// 	image: {
	// 		handler: function (val) {
	// 			console.log("image", val);
	// 		},
	// 		deep: true,
	// 	},
	// 	type: {
	// 		handler: function (val) {
	// 			console.log("type", val);
	// 		},
	// 		deep: true,
	// 	},
	// 	description: {
	// 		handler: function (val) {
	// 			console.log("description", val);
	// 		},
	// 		deep: true,
	// 	},
	// 	idYoutubeMusic: {
	// 		handler: function (val) {
	// 			console.log("idYoutubeMusic", val);
	// 		},
	// 		deep: true,
	// 	},
	// 	source: {
	// 		handler: function (val) {
	// 			console.log("source", val);
	// 		},
	// 		deep: true,
	// 	},
	// 	socials: {
	// 		handler: function (val) {
	// 			console.log("socials", val);
	// 		},
	// 		deep: true,
	// 	},
	// 	platforms: {
	// 		handler: function (val) {
	// 			console.log("platforms", val);
	// 		},
	// 		deep: true,
	// 	},
	// 	members: {
	// 		handler: function (val) {
	// 			console.log("members", val);
	// 		},
	// 		deep: true,
	// 	},
	// 	groups: {
	// 		handler: function (val) {
	// 			console.log("groups", val);
	// 		},
	// 		deep: true,
	// 	},
	// 	styles: {
	// 		handler: function (val) {
	// 			console.log("styles", val);
	// 		},
	// 		deep: true,
	// 	},
	// },

	methods: {
		...mapGetters(["GET_USER"]),

		createArtist() {
			if ( this.name == "" || this.idYoutubeMusic == "" || this.source == "" ) {
				this.$toast.error( "Please fill all fields before with * before send an artist", { duration: 5000, position: "top-right" } );
				return;
			}

			if(this.newStyleAdded) {
				const updateStyle = this.$fire.functions.httpsCallable("updateListStyle");
				updateStyle({ styles: this.styleList })
					.then(() => {
						this.$toast.success( "Styles updated", { duration: 5000, position: "top-right" } );
					})
					.catch(() => {
						this.$toast.error( "Error updating styles", { duration: 5000, position: "top-right" } );
					});
			}

			const createArtist = this.$fire.functions.httpsCallable(
				"createArtist"
			);
			createArtist({
				name: this.name,
				image: this.image,
				type: this.type,
				verified: false,
				description: this.description,
				socials: this.socials,
				platforms: this.platforms,
				idSpotify: null,
				idYoutubeMusic: this.idYoutubeMusic,
				groups: this.groups,
				members: this.members,
				styles: this.styles,
				releases: null,
				addedBy: this.GET_USER().uid,
			})
				.then((result) => {
					const updateArtist = this.$fire.functions.httpsCallable("updateArtist");
					updateArtist({id: result.data.id})
						.then((res) => {
							this.$toast.success( "Thank you, Your artist have been sent for verification", { duration: 5000, position: "top-right" } );
							this.$router.push("/");
						})
						.catch(() => {
							this.$toast.error( "Error updating artist", { duration: 5000, position: "top-right" } );
						});
				})
				.catch((error) => {
					console.log(error);
				});
		},

		addStyle (newTag) {
			if(this.styles == null) {
					this.styles = [newTag]
			} else {
					this.styles.push(newTag)
			}
			this.styleList.push(newTag)
			this.newStyleAdded = true
		},

		updateList(list, newElem, index) {
			list[index] = newElem;
		},

		deleteList(list, index) {
			list.splice(index, 1);
		},

		addPlatformLink() {
			if (this.platforms == null) {
				this.platforms = [""];
			} else {
				this.platforms.push("");
			}
		},

		addSocialLink() {
			if (this.socials == null) {
				this.socials = [""];
			} else {
				this.socials.push("");
			}
		},

		launchImageFile() {
			this.$refs.imageFile.click();
		},

		uploadImageFile(files) {
			if (!files.length) {
				return;
			}
			let file = files[0];

			if (!file.type.match("image.*")) {
				alert("Please upload an image.");
				return;
			}

			let metadata = {
				contentType: file.type,
			};

			this.isUploadingImage = true;

			let imageRef = this.$fire.storage.ref(`images/artist/${new Date()}`);

			let uploadTask = imageRef
				.put(file, metadata)
				.then((snapshot) => {
					return snapshot.ref.getDownloadURL().then((url) => {
						return url;
					});
				})
				.catch((error) => {
					console.error(error);
				});
			uploadTask.then((url) => {
				this.image = url;
				this.isUploadingImage = false;
			});
		},
	},
};
</script>