<template>
	<div class="flex gap-2 bg-gray-200 rounded">
		<input
			id="name"
			type="text"
			:placeholder="placeholder"
			v-model="input"
			class="appearance-none block w-full rounded px-2 py-3 leading-tight focus:outline-none bg-gray-200 text-gray-700"
			@change="updateInput"
		/>
		<button class="focus:outline-none" @click="deleteInput()">
			<icons-close class="w-6 h-6 text-gray-500" />
		</button>
	</div>
</template>

<script>
import LinkImg from './LinkImg.vue';
export default {
	components: { LinkImg },
	props: {
		element: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			required: true,
		}
	},

	data() {
		return {
			input: "",
		};
	},

	created() {
		this.input = JSON.parse(JSON.stringify(this.element));
	},

	methods: {
		updateInput() {
			this.$emit("updateinput", this.input);
		},

		deleteInput() {
			this.$emit("deleteinput");
		},
	},
};
</script>