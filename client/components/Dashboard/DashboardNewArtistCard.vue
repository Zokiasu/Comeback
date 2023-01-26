<template>
  <div class="rounded-lg bg-quaternary drop-shadow-xl p-5 space-y-5">
    <div class="flex space-x-2">
      <img
        src="https://picsum.photos/200/300"
        alt="test"
        class="min-w-[20rem] aspect-video rounded-lg object-cover"
      />
      <div class="flex flex-col space-y-2 w-full justify-between">
        <div class="bg-quinary w-full p-2 text-sm rounded space-y-1">
          <label class="font-semibold">Name</label>
          <input
            type="text"
            placeholder="Name"
            class="
              w-full
              text-base
              rounded-sm
              p-2
              border-none
              text-secondary
              bg-tertiary
              focus:bg-tertiary/50 focus:outline-none
            "
          />
        </div>
        <div class="bg-quinary w-full p-2 text-sm rounded space-y-1">
          <label class="font-semibold">idYoutubeMusic</label>
          <input
            type="text"
            placeholder="idYoutubeMusic"
            class="
              w-full
              text-base
              rounded-sm
              p-2
              border-none
              text-secondary
              bg-tertiary
              focus:bg-tertiary/50 focus:outline-none
            "
          />
        </div>
        <div class="bg-quinary w-full p-2 text-sm rounded space-y-1">
          <label class="font-semibold">Type</label>

          <select
            id="artist_type"
            name="type"
            class="
              w-full
              p-2
              text-secondary text-base
              rounded-sm
              border-none
              bg-tertiary
              focus:bg-tertiary/50 focus:outline-none
            "
          >
            <option value="SOLO">Solo</option>
            <option value="GROUP">Group</option>
          </select>
        </div>
      </div>
    </div>
    <div class="bg-quinary w-full p-2 text-sm rounded space-y-1">
      <label class="font-semibold">Styles</label>
    </div>
    <div class="bg-quinary w-full p-2 text-sm rounded space-y-1">
      <label class="font-semibold">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        class="
          w-full
          text-base
          rounded-sm
          p-2
          border-none
          text-secondary
          bg-tertiary
          focus:bg-tertiary/50 focus:outline-none
        "
      />
    </div>
    <div class="flex space-x-5 justify-end">
      <button class="bg-green-500 rounded px-5 py-2">Accepted</button>
      <button class="bg-red-500 rounded px-5 py-2">Rejected</button>
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