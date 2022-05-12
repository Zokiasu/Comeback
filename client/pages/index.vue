<template>
  <div class="p-5 lg:p-10 overflow-hidden space-y-5 lg:space-y-10">
    <section
      v-if="newsList.length"
      id="newAnnounce"
      class="space-y-3"
    >
      <h2 class="text-xl sm:text-2xl lg:text-4xl text-white flex">Next Comeback</h2>
      <div class="flex flex-wrap gap-5 w-full justify-center">
        <NewsCard 
          v-for="news in newsList"
          :key="news.id"
          :verified="news.verified"
          :message="news.message"
          :date="news.date"
          :artist="news.artist"
          :user="news.user"
        />
      </div>
    </section>
    <section
      v-if="newRelease.length" 
      id="newRelease"
      class="space-y-3 section"
    >
      <h2 class="text-xl sm:text-2xl lg:text-4xl text-white flex">Last Releases</h2>
      <div class="flex flex-wrap gap-2 md:gap-5 justify-center md:justify-evenly">
        <ReleaseCard 
          v-for="(release) in newRelease" 
          :key="release.id"
					:id="release.id"
					:image="release.image"
					:date="release.date"
					:name="release.name"
					:type="release.type"
					:artists="{ id: release.artistsId, name: release.artistsName }"
          display-date
        />
      </div>
    </section>
    <section
      v-if="newArtist.length" 
      id="newArtist"
      class="space-y-3 section"
    >
      <h2 class="text-xl sm:text-2xl lg:text-4xl text-white flex">Last Artist Added</h2>
      <div class="flex flex-wrap gap-2 md:gap-5 justify-evenly md:justify-evenly">
        <ArtistCard 
          v-for="artist in newArtist"
          :key="artist.id"
          :image="artist.image"
          :name="artist.name"
          :id="artist.id"
          :type="artist.type"
        />
      </div>
    </section>
  </div>
</template>

<script>
  import ScrollReveal from 'scrollreveal'

  export default {
    name: 'App',

    async mounted() {
      ScrollReveal().reveal('.section', {interval: 300, distance: '1000%', origin: 'bottom', opacity: null})
    },
    
    async asyncData({ $fire, $fireModule }){
			const startDate = $fireModule.firestore.Timestamp.fromDate(new Date());

			
      const newsList = [];
      await $fire.firestore.collection("news").where("date", ">=", startDate).orderBy("date", "asc").get().then(snapshot => {
        snapshot.forEach(doc => {
					const news = doc.data();
					news.id = doc.id;
					news.date = new Date(doc.data().date.seconds * 1000);
					newsList.push(news);
        });
			});
      
      let newArtist = await $fire.firestore.collection("artists").where("createdAt", "<=", startDate).orderBy("createdAt", "desc").limit(10).get()
      .then(snapshot => {
        return snapshot.docs.map(doc => doc.data());
			});

      const newRelease = [];
      await $fire.firestore.collection("releases").where("date", "<=", startDate).orderBy("date", "desc").limit(10).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
					const release = doc.data();
					release.id = doc.id;
					release.date = new Date(doc.data().date.seconds * 1000);
					newRelease.push(release);
        });
			});

      return { 
        newArtist,
        newRelease,
        newsList 
      }
    }
  }
</script>