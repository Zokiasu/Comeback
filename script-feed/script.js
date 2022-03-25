const YoutubeMusicApi = require('./youtube-music-api-master')

const admin = require("firebase-admin");
const db = require("./db");

const api = new YoutubeMusicApi();
const axios = require('axios');
let fs = require('fs')
let artistExist = false;
let artistList = []
let releaseList = []
process.argv.shift()  // skip node.exe
process.argv.shift()  // skip name of js file
const entry = process.argv.join(" ")

// Retrieves Innertube Config
api.initalize().then(async info => {
    artistList = await getArtistFromFirebase()
    releaseList = await getReleasesFromFirebase()
    //console.log("entry", entry)
    //checkArtists(entry, artistList, releaseList)
    if(entry == "") {
        for (let index = 0; index < artistList.length; index++) {
            if(artistList[index].idYoutubeMusic) { 
                await getArtist(artistList[index].idYoutubeMusic, artistList, releaseList)
                var date = new Date();
                var curDate = null;
                do { curDate = new Date(); }
                while(curDate-date < 1000);
                //console.log(" ")
            }
        }
    } else {
        await checkArtists(entry, artistList, releaseList)
    }
})



const checkArtists = function(entry, artistList, releaseList) {
    console.log("-- CHECK ARTIST")
    api.search(entry, "artist").then(artistSearchResult => {
        if(artistSearchResult) {
            artistSearchResult?.content?.forEach(artistMatch => {
                if(artistMatch.name != undefined && artistMatch.browseId != undefined) {
                    if(artistMatch.name.toLowerCase() == entry.toLowerCase()){
                        if(artistMatch.browseId != null) {
                            getArtist(artistMatch.browseId, artistList, releaseList)
                        }
                    }
                }
            });
        }
    })
}

const getArtist = async function(artistId, artistList, releaseList) {
    await api.getArtist(artistId).then(async artist => {
        if(artist.name) {
            let artistToSend = {
                name: artist.name,
                image: artist.thumbnails[artist?.thumbnails?.length-1]?.url,
                type: 'SOLO',
                verified: true,
                description: artist.description,
                socials: [],
                platforms: [],
                idYoutubeMusic: artistId,
                styles: [],
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            }
            let artistChecked = false
            let urlYT = "https://music.youtube.com/channel/" + artistId
            artistToSend.platforms = [urlYT]
            console.log('CHECK ARTIST : ', artist.name)
            artistList.forEach(elem => {
                if (elem.idYoutubeMusic == artistToSend.idYoutubeMusic) {
                    artistChecked = true
                    artistToSend['id'] = elem.id
                }
            })
            //console.log('artistCheckedValue', artistChecked)
            //console.log(artistToSend)
            
            if(!artistChecked) {
                console.log("-- ARTIST NOT EXIST")
                //console.log(artistToSend)
                await setArtistFromFirebase(artistToSend)
            } else {
                console.log("-- ARTIST EXIST")
                if(artist.products?.albums?.content.length > 0) {
                    await addAlbum(artist, artistToSend, artistList, releaseList).then(async() => {
                        //console.log("-- ALBUMS ADDED")
                        await addSingle(artist, artistToSend, artistList, releaseList).then(() => {
                            //console.log("-- SINGLES ADDED")
                        })
                    })
                } else if(artist.products?.singles?.content.length > 0) {
                    await addSingle(artist, artistToSend, artistList, releaseList).then(() => {
                        //console.log("-- SINGLES ADDED")
                    })
                }
            }
        }
    })
}



const addRelease = async function(release, artist, artistList, releaseList) {
    if(release.browseId) {
        await api.getAlbum(release.browseId).then(async result3 => {
            if(result3.title) {
                let releaseToSend = {
                    name: result3.title,
                    image: result3.thumbnails[result3.thumbnails.length-1]?.url,
                    date: null,
                    type: release.type.toUpperCase(),
                    platforms: [],
                    idYoutubeMusic: release.browseId,
                    artists: artist.id,
                }
                await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${result3.tracks[0].videoId}&key=AIzaSyBb-Tgt-UvA-yhRFnB-rpuzdXXaveymfQs`).then(res => {
                    releaseToSend.date = res?.data?.items[0]?.snippet?.publishedAt
                })
                let urlYT = "https://music.youtube.com/browse/" + releaseToSend.idYoutubeMusic
                releaseToSend.platforms = [urlYT]
                ////console.log(releaseToSend)
                let releaseExist = false;
                console.log('CHECK RELEASE : ', result3.title)
                releaseList.forEach(elem => {
                    if (elem.idYoutubeMusic == releaseToSend.idYoutubeMusic) { 
                        releaseExist = true
                        releaseToSend['id'] = elem.id
                    }
                })
                //console.log('releaseExist', releaseExist)

                if(!releaseExist){
                    //console.log("-- RELEASE NOT EXIST")
                    ////console.log(result3.tracks)
                    await setReleaseFromFirebase(releaseToSend, result3.tracks)
                } else {
                    //updateReleaseFromFirebase(releaseToSend, result3.tracks)
                }
            }
        })
    }
}

const addAlbum = async function(result2, artist, artistList, releaseList) {
    console.log("-- ADD ALBUM")
    await Promise.all(
        result2?.products?.albums?.content?.map(async function (el) {
            await addRelease(el, artist, artistList, releaseList).then(() => {
                //console.log("-- RELEASE ADDED")
                var date = new Date();
                var curDate = null;
                do { curDate = new Date(); }
                while(curDate-date < 100);
            })
        })
   )
}

const addSingle = async function(result2, artist, artistList, releaseList) {
    console.log("-- ADD SINGLE")
    await Promise.all(
        result2?.products?.singles?.content?.map(async function(el){
            await addRelease(el, artist, artistList, releaseList).then(() => {
                //console.log("-- RELEASE ADDED")
                var date = new Date();
                var curDate = null;
                do { curDate = new Date(); }
                while(curDate-date < 100);
            })
        })
   )
}



const getArtistFromFirebase = function(){
    return db.collection("artists").get().then(snapshot => {
        let artistList = []
        snapshot.forEach(doc => {
            artistList.push(doc.data())
        })
        return artistList
    })
}

const getReleasesFromFirebase = function(){
    return db.collection("releases").get().then(snapshot => {
        let releaseList = []
        snapshot.forEach(doc => {
            releaseList.push(doc.data())
        })
        return releaseList
    })
}

const setArtistFromFirebase = function(artist) {
    return db.collection("artists").add(artist).then((res) => {
        db.collection("artists").doc(res.id).update({
            id: res.id
        }).then(() => {
            //console.log("Artist added to Firebase")
        })
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}

const updateArtistFromFirebase = function(artist) {
    return db.collection("artists").doc(artist.id).update(artist).then(() => {
        //console.log("Artist updated to Firebase")
    })
}

const setReleaseFromFirebase = function(release, musics) {
    return db.collection("releases").add(release).then((res) => {
        db.collection("releases").doc(res.id).update({
            id: res.id
        })
        musics.forEach(music => {
            db.collection("releases").doc(res.id).collection("musics").add(music)
        })
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}

const updateReleaseFromFirebase = function(release, musics) {
    return db.collection("releases").doc(release.id).set(release).then(() => {
        //console.log("Release updated to Firebase")
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}