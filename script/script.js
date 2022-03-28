const YoutubeMusicApi = require('./youtube-music-api-master')

const admin = require("firebase-admin");
const db = require("./db");

const api = new YoutubeMusicApi();
const axios = require('axios');
let fs = require('fs');
const { firestore } = require('firebase-admin');
let artistExist = false;
let artistList = []
let artists = []
let releaseList = []
process.argv.shift()  // skip node.exe
process.argv.shift()  // skip name of js file
let entry = process.argv.join(" ")
// Retrieves Innertube Config
api.initalize().then(async info => {
    artistList = await getArtistFromFirebase()
    releaseList = await getReleasesFromFirebase()
    let news = []
    await axios.get(`https://comeback-api.herokuapp.com/infos`).then(res => {
        news = [...new Set(res.data)]
    })

    news.forEach(elem => {
        console.log("elem", elem)
        let aCheck = false
        if(elem.artist) {
            artistList.forEach(elem2 => {
                if (elem2.idYoutubeMusic == elem.artist.idyoutubemusic) {
                    aCheck = true
                    elem.artist.id = elem2.id
                }
            })
            if(aCheck) {
                db.collection("news").add({
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                    message: elem.message,
                    date: admin.firestore.Timestamp.fromDate(new Date(elem.date)),
                    verified: true,
                    source: elem.source,
                    user: {
                        id: 'YvFSBcfV8rfF7z67lugQICscfm12',
                        name: 'Zokiasu',
                        picture: 'https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fartists.jpg?alt=media&token=23be3721-5157-45a7-8c0e-e1c03c2e1827'
                    },
                    artist: {
                        id: elem.artist.id,
                        name: elem.artist.name,
                        image: elem.artist.image
                    },
                })
                .then((ref) => {
                    return {success: true, id: ref.id, message: "updated successfully."};
                })
                .catch((err) => {
                    return {success: false, id: "", message: err};
                });
            }
        }
    })

    /*if(entry == "") {
        for (let index = 0; index < artistList.length; index++) {
            if(artistList[index].idYoutubeMusic) {
                await getArtist(artistList[index].idYoutubeMusic, artistList, releaseList)
            }
        }
    } else if(entry.includes("FIRSTHALF")) {
        for (let index = 0; index < (artistList.length/2); index++) {
            if(artistList[index].idYoutubeMusic) {
                await getArtist(artistList[index].idYoutubeMusic, artistList, releaseList)
            }
        }
    } else if(entry.includes("SECONDHALF")) {
        for (let index = Math.round(artistList.length/2); index < artistList.length; index++) {
            if(artistList[index].idYoutubeMusic) {
                await getArtist(artistList[index].idYoutubeMusic, artistList, releaseList)
            }
        }
    } else {
        checkArtists(entry, artistList, releaseList)
    }*/
})

const checkArtists = function(args, artistList, releaseList) {
    console.log("-- CHECK ARTIST")
    api.search(args, "artist").then(artistSearchResult => {
        if(artistSearchResult) {
            artistSearchResult?.content?.forEach(artistMatch => {
                if(artistMatch.name != undefined && artistMatch.browseId != undefined) {
                    if(artistMatch.name.toLowerCase() == args.toLowerCase()){
                        if(artistMatch.browseId != null) {
                            entry = entry + " ALBUM SINGLE"
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
                console.log("ARTIST NOT EXIST")
                await setArtistFromFirebase(artistToSend)
            } else {
                //console.log("ARTIST EXIST")
                if(artist.products?.albums?.content.length > 0 && entry.includes("ALBUM")) {
                    await addAlbum(artist, artistToSend, artistList, releaseList)
                    if(artist.products?.singles?.content.length > 0 && entry.includes("SINGLE")) {
                        await addSingle(artist, artistToSend, artistList, releaseList)
                    }
                } else if(artist.products?.singles?.content.length > 0 && entry.includes("SINGLE")) {
                    await addSingle(artist, artistToSend, artistList, releaseList)
                }
            }
        }
    })
}



const addRelease = async function(release, artist, artistList, releaseList) {
    //console.log("-- ADD RELEASE")
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
                    artistsId: artist.id,
                    artistsName: artist.name
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
                    if(result3?.tracks[0]?.videoId) {
                        //console.log("-- VIDEOID", result3?.tracks[0]?.videoId)
                        await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${result3?.tracks[0]?.videoId}&key=AIzaSyBb-Tgt-UvA-yhRFnB-rpuzdXXaveymfQs`)
                        .then(async (res) => {
                            releaseToSend.date = res?.data?.items[0]?.snippet?.publishedAt ? admin.firestore.Timestamp.fromDate(new Date(res?.data?.items[0]?.snippet?.publishedAt)) : null
                            if(new Date(res?.data?.items[0]?.snippet?.publishedAt).getFullYear() >= 2021) {
                                console.log("-- RELEASE - ", result3.title, " - ", (new Date(res?.data?.items[0]?.snippet?.publishedAt).getFullYear()))
                                await setReleaseFromFirebase(releaseToSend, result3.tracks)
                            }
                        })
                    }
                }
            }
        })
    }
}

const addAlbum = async function(result2, artist, artistList, releaseList) {
    console.log("-- ADD ALBUM")
    
    await Promise.all(
        await result2?.products?.albums?.content?.map((release) => {
            setTimeout(async () => {
                await addRelease(release, artist, artistList, releaseList) 
            }, 10000);
        })
    )
}

const addSingle = async function(result2, artist, artistList, releaseList) {
    console.log("-- ADD SINGLE")
    
    await Promise.all(
        await result2?.products?.singles?.content?.map((release) => {
            setTimeout(async () => {
                await addRelease(release, artist, artistList, releaseList) 
            }, 10000);
        })
    )
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
    return db.collection("releases").doc(release.id).update(release).then(() => {
        console.log("Release updated to Firebase")
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}