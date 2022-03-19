<template>
	<div class="space-y-1">
		<div>
			<img
				:alt="name"
				:src="image"
				class="object-cover aspect-video rounded"
			/>
		</div>
		<div class="text-center">
			<h2>{{ name }}</h2>
		</div>
	</div>
</template>

<script>
export default {
	name: "Artist",

	props: {
		image: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
	},
};
</script>

<style>
</style>