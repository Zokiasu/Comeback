<template>
  <div class="p-5 lg:p-10">
    <!-- <div class="flex justify-between border-b border-tertiary">
      <div class="flex space-x-2">
        <NuxtLink class="my-auto" :to="`/release/${$route.params.id}`">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
            />
          </svg>
        </NuxtLink>
        <h2 class="my-auto text-2xl font-semibold">Edition Release</h2>
      </div>
      <button
        class="Card hover:bg-primary rounded px-5 py-1"
        @click="editRelease()"
      >
        Confirm
      </button>
    </div>
    <section class="lg:px-5">
      <div
        class="
          flex flex-col
          justify-center
          space-y-10
          py-7
          lg:flex-row lg:space-y-0 lg:space-x-5
        "
      >
        <div id="image" class="Card mx-auto">
          <img
            class="h-80 object-cover lg:w-96"
            :src="release.image"
            :alt="release.name"
          />
          <div
            class="xl:bottom-2 xl:mx-auto xl:flex xl:w-full xl:justify-center"
          >
            <button
              class="
                bg-primary
                w-full
                rounded-b
                px-5
                py-1
               
                hover:bg-red-900
                focus:outline-none
              "
              :disabled="isUploadingImage"
              type="button"
              @click="launchImageFile"
            >
              {{ isUploadingImage ? 'Uploading...' : 'Upload' }}
            </button>
            <input
              ref="imageFile"
              type="file"
              accept="image/png, image/jpeg"
              class="hidden"
              @change.prevent="uploadImageFile($event.target.files)"
            />
          </div>
        </div>
        <div class="flex w-full flex-col space-y-7">
          <div
            class="
              flex flex-col
              space-y-1
              lg:flex-row lg:space-y-0 lg:space-x-2
            "
          >
            <span class="my-auto w-28 text-lg font-semibold">Name*</span>
            <t-input
              v-model="release.name"
              autocomplete="false"
              type="text"
              :value="release.name"
              placeholder="Artist Name"
              name="artists-name"
              @change="newObjectToApi('name', release.name)"
            />
          </div>
          <div
            class="
              flex flex-col
              space-y-1
              lg:flex-row lg:space-y-0 lg:space-x-2
            "
          >
            <span class="my-auto w-28 text-lg font-semibold">Type</span>
            <t-select
              id="artists-type-selector"
              v-model="release.type"
              :options="[
                { value: 'SINGLE', text: 'Single' },
                { value: 'ALBUM', text: 'Album' },
                { value: 'EP', text: 'EP' },
              ]"
              @change="newObjectToApi('type', release.type)"
            ></t-select>
          </div>
          <div
            id="artists"
            class="
              flex flex-col
              space-y-1
              lg:flex-row lg:space-y-0 lg:space-x-2
            "
          >
            <span class="my-auto w-28 text-lg font-semibold">Artist(s)*</span>
            <multiselect
              v-model="release.artists"
              tag-placeholder="Add this as new artist"
              placeholder="Search or add a artist"
              label="name"
              track-by="id"
              :options="artistList"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="false"
              :multiple="true"
              :taggable="true"
              @input="newObjectToApi('artists', release.artists)"
              @tag="addArtist"
            >
              <template slot="option" slot-scope="props">
                <div class="flex space-x-1">
                  <img
                    v-if="props.option.image"
                    class="option__image h-14 w-14 object-cover"
                    :src="props.option.image"
                  />
                  <div class="option__desc flex flex-col space-y-1">
                    <span class="option__title">{{ props.option.name }}</span>
                    <div class="flex space-x-1">
                      <div class="space-x-1">
                        <span
                          v-for="(group, index) in props.option.groups"
                          :key="index"
                          class="rounded bg-gray-300 p-1 px-2 text-xs"
                          >{{ group.name }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </multiselect>
          </div>
          <div
            class="
              flex flex-col
              space-y-1
              lg:flex-row lg:space-y-0 lg:space-x-2
            "
          >
            <span class="my-auto w-28 text-lg font-semibold">Style</span>
            <multiselect
              key="name"
              v-model="release.styles"
              tag-placeholder="Add this as new style"
              placeholder="Search or add a style"
              label="name"
              :options="styleList"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="false"
              :multiple="true"
              :taggable="true"
              @input="newObjectToApi('styles', release.styles)"
              @tag="addStyle"
            >
            </multiselect>
          </div>
        </div>
      </div>
      <div class="flex flex-col space-y-5">
        <div id="youtube-id" class="flex flex-col space-y-1">
          <h3 class="my-auto text-lg font-semibold">Youtube Music ID</h3>
          <t-input
            v-model="release.idyoutubemusic"
            autocomplete="false"
            type="text"
            :value="release.idyoutubemusic"
            placeholder="release idyoutubemusic"
            name="release-idyoutubemusic"
            @change="newObjectToApi('idyoutubemusic', release.idyoutubemusic)"
          />
        </div>
        <div id="datepicker" class="flex w-full flex-col space-y-10">
          <div id="release-date" class="flex flex-col space-y-1">
            <h2 class="my-auto text-lg font-semibold">
              Release Date*
              <span class="text-base"
                >: {{ dates.toLocaleDateString('fr-FR') }} at
                {{ dates.toLocaleTimeString('en-US').toString().slice(0, 4) }}
                in {{ actualTimezone }}</span
              >
            </h2>
            <div class="rounded bg-secondary p-5">
              <v-date-picker
                v-model="dates"
                mode="dateTime"
                :timezone="timezone"
                color="red"
                is-expanded
              />
              <div class="pt-2">
                <div class="flex w-full justify-between">
                  <span class="text-sm font-bold">-11:00</span>
                  <span class="text-sm font-bold">UTC</span>
                  <span class="text-sm font-bold">+11:00</span>
                </div>
                <input
                  v-model="timezoneIndex"
                  class="w-full"
                  type="range"
                  min="0"
                  :max="timezones.length - 1"
                />
                <div class="flex">
                  <span class="mr-2 font-semibold text-gray-400"
                    >Timezone:</span
                  >
                  <span class="text-tertiary"
                    >{{ timezone }} ({{ abbrTimezone }})</span
                  >
                </div>
                <div class="flex">
                  <span class="mr-2 font-semibold text-gray-400"
                    >Namezone:</span
                  >
                  <span class="text-tertiary">{{ namezone }}</span>
                </div>
                <div class="flex">
                  <span class="mr-2 font-semibold text-gray-400"
                    >GMT Zone:</span
                  >
                  <span class="text-tertiary">GMT{{ gmtzone }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="streaming-platform" class="w-full space-y-1">
          <h3 class="my-auto text-lg font-semibold">
            Streaming Platforms Link
          </h3>
          <MultipleInput
            v-for="(element, index) in release.platforms"
            :key="index"
            class="mb-1"
            :element="element"
            :placehol="'Streaming Platforms'"
            @updateinput="
              updateList(release.platforms, $event, index, 'platforms')
            "
            @deleteinput="deleteList(release.platforms, index)"
          />
          <button
            class="
              Card
              flex
              w-full
              justify-center
              space-x-2
              rounded
              bg-tertiary bg-opacity-30
              p-2
              text-left
              focus:outline-none
            "
            @click="addStreamingLink()"
          >
            <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png" />
          </button>
        </div>
        <div id="tracklist" class="w-full space-y-1">
          <h3 class="my-auto text-lg font-semibold">Tracklist*</h3>
          <div class="bg-search-leftbar rounded p-5">
            <div
              v-for="(music, index) in release.musics"
              :key="index"
              class="mb-3 space-y-1"
            >
              <span>Track {{ index + 1 }}</span>
              <t-input
                v-model="music.name"
                type="text"
                placeholder="Track Name"
                @change="newObjectToApiMusic(release.musics, index)"
              />
              <t-input
                v-model="music.clip"
                type="text"
                placeholder="Track Clip"
                @change="newObjectToApiMusic(release.musics, index)"
              />
            </div>
            <button
              class="
                Card
                flex
                w-full
                justify-center
                space-x-2
                rounded
                bg-tertiary bg-opacity-30
                p-2
                text-left
                focus:outline-none
              "
              @click="addMusic()"
            >
              <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png" />
            </button>
          </div>
        </div>
        <div id="source" class="flex flex-col space-y-1">
          <h3 class="my-auto text-lg font-semibold">Source*</h3>
          <t-textarea
            id="source"
            v-model="source"
            placeholder="Source"
            name="my-textarea"
            class="h-20 w-full resize"
          />
        </div>
      </div>
      <button
        class="
          Card
          bg-primary
          my-2
          w-full
          rounded
          px-5
          py-1
         
          hover:bg-red-900
        "
        @click="editRelease()"
      >
        Confirm
      </button>
    </section> -->
  </div>
</template>

<script>
export default {
  name: 'EditRelease',
}
</script>
