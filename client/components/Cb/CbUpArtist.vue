<template>
		<div class="bg-black-four rounded p-5 space-y-3">
			<div>
				<h3 class="font-semibold text-lg">{{ idPending }}</h3>
			</div>
			<div>
				<h3 class="font-semibold text-lg">{{ name }}</h3>
			</div>
			<div>
				<p class="bg-gray-500 rounded px-2 py-1 text-xs">{{ type }}</p>
			</div>
			<div>
				<ul class="flex gap-2">
					<li v-for="(style, index) in styles" :key="`style_${index}`" class="bg-gray-500 rounded px-3 py-1">
						<p>{{ style }}</p>
					</li>
				</ul>
			</div>
			<div class="flex gap-5">
				<img :src="image" :alt="image" class="rounded shadow-xl">
				<p>{{ description }}</p>
			</div>
			<div v-if="platforms.length">
				<h3>Platforms</h3>
				<ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<li v-for="(platform, index) in platforms" :key="`platform_${index}`" class="bg-gray-500 rounded px-3 py-1">
						<p>{{ platform }}</p>
					</li>
				</ul>
			</div>
			<div v-if="socials.length">
				<h3>Socials</h3>
				<ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<li v-for="(social, index) in socials" :key="`social_${index}`" class="bg-gray-500 rounded px-3 py-1">
						<p>{{ social }}</p>
					</li>
				</ul>
			</div>
			<div v-if="groups.length">
				<h3>Groups</h3>
				<ul class="flex gap-2">
					<li v-for="(group, index) in groups" :key="`group_${index}`" class="bg-gray-500 rounded px-3 py-1">
						<p>{{ group.name }}</p>
					</li>
				</ul>
			</div>
			<div v-if="members.length">
				<h3>Members or subunit</h3>
				<ul class="flex gap-2">
					<li v-for="(member, index) in members" :key="`member_${index}`" class="bg-gray-500 rounded px-3 py-1">
						<p>{{ member.name }}</p>
					</li>
				</ul>
			</div>
			<div class="flex justify-end w-full gap-2">
				<button class="bg-red-500 px-5 py-2 rounded font-semibold hover:bg-red-700 transition-all duration-300 ease-in-out" @click="reject()">Reject</button>
				<button class="bg-green-500 px-5 py-2 rounded font-semibold hover:bg-green-700 transition-all duration-300 ease-in-out" @click="accept()">Accept</button>
			</div>
		</div>
</template>

<script>
export default {
	name: 'CbUpArtist',

	props: {
		idPending: {
			type: String,
			required: true
		},
		name: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: '',
		},
		image: {
			type: String,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
		styles: {
			type: Array,
			default: () => [],
		},
		platforms: {
			type: Array,
			default: () => [],
		},
		socials: {
			type: Array,
			default: () => [],
		},
	},

	data() {
		return {
			groups: [],
			members: [],
		}
	},

	async fetch() {
		const firstStepGroupArtist = this.$fire.functions.httpsCallable("getGroupsPendingUpdateArtist")
		const firstStepMembersArtist = this.$fire.functions.httpsCallable("getMembersPendingUpdateArtist")
		const [groups, members] = await Promise.all([
			firstStepGroupArtist({ idPending: this.idPending }),
			firstStepMembersArtist({ idPending: this.idPending }),
		])
		this.groups = groups.data.groups
		this.members = members.data.members
	},

	methods: {
		accept(){
			this.$emit('accept')
		},
		reject(){
			this.$emit('reject')
		},
	}
}
</script>