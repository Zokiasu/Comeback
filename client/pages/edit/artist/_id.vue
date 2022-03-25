<template>
	<div class="p-5 lg:p-10 flex flex-col sm:mx-auto">
		<div class="bg-black-one w-full rounded-lg p-5 lg:max-w-full mx-auto">
			<h2 class="text-white text-3xl font-semibold mb-3">Edit Artist</h2>
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
						@click="updateArtist()"
					>
						Update Artist
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "UpdateArtist",

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

			dataToUpdate: {},

			// general
			isUploadingImage: false,
			artistList: [],
			styleList: [],
			newStyleAdded: false,
			groupListModified: false,
			memberListModified: false,
		};
	},

	async asyncData({ $fire, params }) {
		const firstStepArtistId = $fire.funcstions('europe-west1').httpsCallable("getArtistById");
		const secondStepArtistId = await firstStepArtistId({
			id: params.id,
		});
		// ArtistList
		const firstStepArtist = $fire.funcstions('europe-west1').httpsCallable("getArtist")
		const secondStepArtist = await firstStepArtist({})
		// StyleList
		const firstStepStyle = $fire.funcstions('europe-west1').httpsCallable("getStyles")
		const secondStepStyle = await firstStepStyle({})
		// All members
		const firstStepMembers = $fire.funcstions('europe-west1').httpsCallable("getMembersArtist")
		const secondStepMembers = await firstStepMembers({ id: params.id })
		// All groups
		const firstStepGroups = $fire.funcstions('europe-west1').httpsCallable("getGroupsArtist")
		const secondStepGroups = await firstStepGroups({ id: params.id })

		return {
			artistList: secondStepArtist.data.artists,
			styleList: secondStepStyle.data.styles,

			name: secondStepArtistId.data.artist.name,
			image: secondStepArtistId.data.artist.image,
			type: secondStepArtistId.data.artist.type,
			description: secondStepArtistId.data.artist.description,
			idYoutubeMusic: secondStepArtistId.data.artist.idYoutubeMusic,
			source: secondStepArtistId.data.artist.source,
			socials: secondStepArtistId.data.artist.socials,
			platforms: secondStepArtistId.data.artist.platforms,
			styles: secondStepArtistId.data.artist.styles,
			
			members: secondStepMembers.data,
			groups: secondStepGroups.data,
		};
	},

	//watch all changes
	watch: {
		name: {
			handler: function (val) {
				this.dataToUp('name', val);
			},
			deep: true,
		},
		image: {
			handler: function (val) {
				this.dataToUp('image', val);
			},
			deep: true,
		},
		type: {
			handler: function (val) {
				this.dataToUp('type', val);
			},
			deep: true,
		},
		description: {
			handler: function (val) {
				this.dataToUp('description', val);
			},
			deep: true,
		},
		idYoutubeMusic: {
			handler: function (val) {
				this.dataToUp('idYoutubeMusic', val);
			},
			deep: true,
		},
		source: {
			handler: function (val) {
				this.dataToUp('source', val);
			},
			deep: true,
		},
		socials: {
			handler: function (val) {
				this.dataToUp('socials', val);
			},
			deep: true,
		},
		platforms: {
			handler: function (val) {
				this.dataToUp('platforms', val);
			},
			deep: true,
		},
		members: {
			handler: function (val) {
				console.log("members", val);
				this.memberListModified = true;
			},
			deep: true,
		},
		groups: {
			handler: function (val) {
				console.log("groups", val);
				this.groupListModified = true;
			},
			deep: true,
		},
		styles: {
			handler: function (val) {
				this.dataToUp('styles', val);
			},
			deep: true,
		},
	},

	methods: {
		...mapGetters(["GET_USER"]),

		updateArtist() {
			if ( this.name == "" || this.idYoutubeMusic == "" || this.source == "" ) {
				this.$toast.error( "Please fill all fields before with * before send an artist", { duration: 5000, position: "top-right" } );
				return;
			}

			if(this.newStyleAdded) {
				const updateStyle = this.$fire.funcstions('europe-west1').httpsCallable("updateListStyle");
				updateStyle({ styles: this.styleList })
					.then(() => {
						this.$toast.success( "Styles updated", { duration: 5000, position: "top-right" } );
					})
					.catch(() => {
						this.$toast.error( "Error updating styles", { duration: 5000, position: "top-right" } );
					});
			}

			this.dataToUpdate['idPending'] = this.$route.params.id+"-"+this.GET_USER().uid;
			this.dataToUpdate['id'] = this.$route.params.id;

			const updateArtist = this.$fire.funcstions('europe-west1').httpsCallable("createPendingUpdateArtist");
			updateArtist(this.dataToUpdate)
				.then(async (result) => {
					const addGroupToPending = this.$fire.funcstions('europe-west1').httpsCallable("addPendingGroupsArtist");
					await this.groups.map(async (group) => {
						await addGroupToPending({
							idPending: this.$route.params.id+"-"+this.GET_USER().uid,
							group: {
								id: group.id,
								image: group.image,
								name: group.name,
								type: group.type,
							}
						})
					});
					const addMemberToPending = this.$fire.funcstions('europe-west1').httpsCallable("addPendingMembersArtist");
					await this.members.map(async (member) => {
						await addMemberToPending({
							idPending: this.$route.params.id+"-"+this.GET_USER().uid,
							member: {
								id: member.id,
								image: member.image,
								name: member.name,
								type: member.type,
							}
						})
					});
					this.$toast.success("Thank you, Your update have been sent for verification", { duration: 5000, position: "top-right" });
					//this.$router.push("/");
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

		dataToUp(key, value) {
			this.dataToUpdate[key] = value
		},
	},
};
</script>