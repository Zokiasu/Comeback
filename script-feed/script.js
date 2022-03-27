const YoutubeMusicApi = require('./youtube-music-api-master')

const admin = require("firebase-admin");
const db = require("./db");

const api = new YoutubeMusicApi();
const axios = require('axios');
let fs = require('fs')
let artistExist = false;
let artistList = []
let artists = []
let releaseList = []
process.argv.shift()  // skip node.exe
process.argv.shift()  // skip name of js file
const entry = process.argv.join(" ")

// Retrieves Innertube Config
api.initalize().then(async info => {
    artistList = await getArtistFromFirebase()
    releaseList = await getReleasesFromFirebase()

    if(entry == "") {
        for (let index = 0; index < artistList.length; index++) {
            if(artistList[index].idYoutubeMusic) { 
                await getArtist(artistList[index].idYoutubeMusic, artistList, releaseList)
                await setTimeout(() => {}, 5000);
            }
        }
    } else if(entry == "FIRSTHALF") {
        for (let index = 0; index < (artistList.length/2); index++) {
            if(artistList[index].idYoutubeMusic) { 
                await getArtist(artistList[index].idYoutubeMusic, artistList, releaseList)
                await setTimeout(() => {}, 5000);
            }
        }
    } else if(entry == "SECONDHALF") {
        for (let index = Math.round(artistList.length/2); index < artistList.length; index++) {
            if(artistList[index].idYoutubeMusic) { 
                await getArtist(artistList[index].idYoutubeMusic, artistList, releaseList)
                await setTimeout(() => {}, 5000);
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
            
            if(!artistChecked) {
                console.log("-- ARTIST NOT EXIST")
                await setArtistFromFirebase(artistToSend)
            } else {
                console.log("-- ARTIST EXIST")
                if(artist.products?.albums?.content.length > 0) {
                    await addAlbum(artist, artistToSend, artistList, releaseList).then(async() => {
                        await addSingle(artist, artistToSend, artistList, releaseList)
                    })
                } else if(artist.products?.singles?.content.length > 0) {
                    await addSingle(artist, artistToSend, artistList, releaseList)
                }
            }
        }
    })
}



const addRelease = async function(release, artist, artistList, releaseList) {
    return new Promise(async (resolve, reject) => {
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
                    let urlYT = "https://music.youtube.com/browse/" + releaseToSend.idYoutubeMusic
                    releaseToSend.platforms = [urlYT]
                    
                    let releaseExist = false;
                    releaseList.forEach(elem => {
                        if (elem.idYoutubeMusic == releaseToSend.idYoutubeMusic) { 
                            releaseExist = true
                            releaseToSend['id'] = elem.id
                        }
                    })

                    if(!releaseExist){
                        console.log('CHECK RELEASE : ', result3.title)
                        if(result3?.tracks[0]?.videoId) {
                            console.log("-- VIDEOID", result3?.tracks[0]?.videoId)
                            await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${result3?.tracks[0]?.videoId}&key=AIzaSyBb-Tgt-UvA-yhRFnB-rpuzdXXaveymfQs`).then(async (res) => {
                                releaseToSend.date = res?.data?.items[0]?.snippet?.publishedAt ? admin.firestore.Timestamp.fromDate(new Date(res?.data?.items[0]?.snippet?.publishedAt)) : null
                                console.log("-- RELEASE DATE", releaseToSend.date)
                                await setReleaseFromFirebase(releaseToSend, result3.tracks).then(() => {
                                    resolve("Promise resolved");
                                })
                            })
                        } else {
                            await setReleaseFromFirebase(releaseToSend, result3.tracks).then(() => {
                                resolve("Promise resolved");
                            })
                        }
                    }
                }
            })
        }
    });
}

const addAlbum = async function(result2, artist, artistList, releaseList) {
    console.log("-- ADD ALBUM")
    result2?.products?.albums?.content?.map(async function (el) {
        return addRelease(el, artist, artistList, releaseList)
    })
}

const addSingle = async function(result2, artist, artistList, releaseList) {
    console.log("-- ADD SINGLE")
    result2?.products?.singles?.content?.map(async function(el){
        return addRelease(el, artist, artistList, releaseList)
    })
}



const getArtistFromFirebase = function(){
    return db.collection("artists").orderBy("name").get().then(snapshot => {
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
            const res = doc.data()
            res['id'] = doc.id
            releaseList.push(res)
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

const setReleaseFromFirebase = async function(release, musics) {
    return db.collection("releases").add(release).then(async (res) => {
        await db.collection("releases").doc(res.id).update({
            id: res.id
        })
        musics.forEach(async (music) => {
            await db.collection("releases").doc(res.id).collection("musics").add(music)
        })
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}

const updateReleaseFromFirebase = function(release) {
    return db.collection("releases").doc(release.id).set(release).then(() => {
        //console.log("Release updated to Firebase")
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}