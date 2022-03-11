<template>
	<div class="container mx-auto py-10">
		<div class="bg-black-one w-full h-96 rounded-lg p-5">
			<form action="">
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3 mb-6 md:mb-0">
						<label
							for="name"
							class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
						>
							Name
						</label>
						<input
							id="name"
							type="text"
							placeholder="Name"
							class="appearance-none block w-full rounded py-3 px-4 mb-3 leading-tight focus:outline-none
							bg-gray-200 text-gray-700 border border-gray-200 focus:bg-white focus:border-gray-500"
						/>
					</div>
					<div class="w-full px-3 mb-6 md:mb-0">
						<label
							for="type"
							class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
						>
							Type
						</label>
						<!--Select Solo or Group -->
						<select
							id="type"
							class="block w-full py-3 px-4 pr-8 rounded leading-tight focus:outline-none 
							bg-gray-200 text-gray-700 border border-gray-200 focus:bg-white focus:border-gray-500"
						>
							<option value="SOLO">Solo</option>
							<option value="GROUP">Group</option>
						</select>
					</div>
					<div class="w-full px-3 mb-6 md:mb-0">
						<label
							for="members"
							class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
						>
							Members
						</label>
						<!--<multiselect
							v-model="artist.members"
							tag-placeholder="Add this as new artists"
							placeholder="Search or add a artists"
							label="name"
							key="id"
							:options="artistList"
							:close-on-select="false"
							:clear-on-select="false"
							:preserve-search="false"
							:multiple="true"
							:taggable="true"
							@tag="addMember"
						/>-->
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>