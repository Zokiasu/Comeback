<template>
  <div class="space-y-5 rounded-lg bg-quaternary p-5 drop-shadow-xl">
    <div class="flex space-x-2">
      <img
        src="https://picsum.photos/200/300"
        alt="test"
        class="aspect-video min-w-[20rem] rounded-lg object-cover"
      />
      <div class="flex w-full flex-col justify-between space-y-2">
        <div class="w-full space-y-1 rounded bg-quinary p-2 text-sm">
          <label class="font-semibold">Name</label>
          <input
            type="text"
            placeholder="Name"
            class="w-full rounded-sm border-none bg-tertiary p-2 text-base text-secondary focus:bg-tertiary/50 focus:outline-none"
          />
        </div>
        <div class="w-full space-y-1 rounded bg-quinary p-2 text-sm">
          <label class="font-semibold">idYoutubeMusic</label>
          <input
            type="text"
            placeholder="idYoutubeMusic"
            class="w-full rounded-sm border-none bg-tertiary p-2 text-base text-secondary focus:bg-tertiary/50 focus:outline-none"
          />
        </div>
        <div class="w-full space-y-1 rounded bg-quinary p-2 text-sm">
          <label class="font-semibold">Type</label>

          <select
            id="artist_type"
            name="type"
            class="w-full rounded-sm border-none bg-tertiary p-2 text-base text-secondary focus:bg-tertiary/50 focus:outline-none"
          >
            <option value="SOLO">Solo</option>
            <option value="GROUP">Group</option>
          </select>
        </div>
      </div>
    </div>
    <div class="w-full space-y-1 rounded bg-quinary p-2 text-sm">
      <label class="font-semibold">Styles</label>
    </div>
    <div class="w-full space-y-1 rounded bg-quinary p-2 text-sm">
      <label class="font-semibold">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        class="w-full rounded-sm border-none bg-tertiary p-2 text-base text-secondary focus:bg-tertiary/50 focus:outline-none"
      />
    </div>
    <div class="flex justify-end space-x-5">
      <button class="rounded bg-green-500 px-5 py-2">Accepted</button>
      <button class="rounded bg-red-500 px-5 py-2">Rejected</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewArtistCard',

  props: {
    id: {
      type: String,
      default: '',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    idYoutubeMusic: {
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
  },
}
</script>
