const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();
admin.firestore().settings({ignoreUndefinedProperties: true});
const db = admin.firestore();

// User

exports.createUser = functions.https.onCall((data, context) => {
  functions.logger.info("createUser", {structuredData: true});
  return db.collection("users").doc(data.id).set({
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    id: data.id,
    name: data.name,
    picture: "https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fartists.jpg?alt=media&token=23be3721-5157-45a7-8c0e-e1c03c2e1827",
    email: data.email,
    role: "NONE",
    subscription: "REGULAR",
    country: null,
  })
      .then((ref) => {
        return {success: true, id: ref.id, message: "User created"};
      })
      .catch((err) => {
        return {success: false, id: "", message: err};
      });
});

exports.updateUser = functions.https.onCall((data, context) => {
  functions.logger.info("updateUser", {structuredData: true});
  const user = data;
  user["updatedAt"] = admin.firestore.FieldValue.serverTimestamp();
  return db.collection("artists").doc(user.id).update(user)
      .then((ref) => {
        return {success: true, id: ref.id, message: "updated successfully."};
      })
      .catch((err) => {
        return {success: false, id: "", message: err};
      });
});

// Artists

exports.createArtist = functions.https.onCall((data, context) => {
  functions.logger.info("createArtist", {structuredData: true});
  return db.collection("artists").add({
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    name: data.name,
    image: data.image,
    type: data.type,
    verified: data.verified,
    description: data.description,
    socials: data.socials,
    platforms: data.platforms,
    idSpotify: data.idSpotify,
    idYoutubeMusic: data.idYoutubeMusic,
    followers: [],
    groups: data.groups,
    members: data.members,
    styles: data.styles,
    releases: data.release,
    addedBy: data.addedBy,
  })
      .then((ref) => {
        return {success: true, id: ref.id, message: "Artist created"};
      })
      .catch((err) => {
        return {success: false, id: "", message: err};
      });
});

exports.getPendingCreateArtist = functions.https.onCall((data, context) => {
  functions.logger.info("getPendingCreateArtist", {structuredData: true});
  return db.collection("artists").where("verified", "==", false).get()
      .then((snapshot) => {
        const artists = [];
        snapshot.forEach((doc) => {
          artists.push(doc.data());
        });
        return {success: true, artists: artists};
      }).catch((err) => {
        return {success: false, artists: []};
      });
});

exports.getArtist = functions.https.onCall((data, context) => {
  functions.logger.info("getArtist", {structuredData: true});
  return db.collection("artists").where("verified", "==", false).get()
      .then((snapshot) => {
        const artists = [];
        snapshot.forEach((doc) => {
          artists.push(doc.data());
        });
        return {success: true, artists: artists};
      }).catch((err) => {
        return {success: false, artists: []};
      });
});

exports.getArtistById = functions.https.onCall((data, context) => {
  functions.logger.info("getArtistById", {structuredData: true});
  // get artist by id
  return db.collection("artists").doc(data.id).get()
      .then((doc) => {
        return {success: true, artist: doc.data()};
      }).catch((err) => {
        return {success: false, artist: null};
      });
});

exports.updateArtist = functions.https.onCall((data, context) => {
  functions.logger.info("updateArtist", {structuredData: true});
  const artist = data;
  artist["updatedAt"] = admin.firestore.FieldValue.serverTimestamp();
  return db.collection("artists").doc(artist.id).update(artist)
      .then((ref) => {
        return {success: true, artist: ref, message: "updated successfully."};
      })
      .catch((err) => {
        return {success: false, artist: "", message: err};
      });
});

exports.createPendingUpdateArtist = functions.https.onCall((data, context) => {
  functions.logger.info("createPendingUpdateArtist", {structuredData: true});
  const artist = data;
  return db.collection("updateArtistPending").doc(artist.id).set(artist)
      .then((ref) => {
        return {success: true, artist: ref, message: "updated successfully."};
      })
      .catch((err) => {
        return {success: false, artist: "", message: err};
      });
});

// Styles

exports.getStyles = functions.https.onCall((data, context) => {
  functions.logger.info("getStyles", {structuredData: true});
  return db.collection("general").doc("data").get()
      .then((snapshot) => {
        return {success: true, styles: snapshot.data().styles};
      }).catch((err) => {
        return {success: false, styles: []};
      });
});

exports.updateListStyle = functions.https.onCall((data, context) => {
  functions.logger.info("updateListStyle", {structuredData: true});
  return db.collection("general").doc("data").set({
    styles: data.styles,
  })
      .then((ref) => {
        return {success: true, id: ref.id, message: "Styles list updated"};
      })
      .catch((err) => {
        return {success: false, id: "", message: err};
      });
});

// Releases

exports.createRelease = functions.https.onCall((data, context) => {
  functions.logger.info("createRelease", {structuredData: true});
  return db.collection("releases").add({
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    name: data.name,
    image: data.image,
    type: data.type,
    releaseDate: data.releaseDate,
    platforms: data.platforms,
    idSpotify: data.idSpotify,
    idYoutubeMusic: data.idYoutubeMusic,
    artists: data.artists,
    styles: data.styles,
    musics: data.musics,
    followers: [],
  })
      .then((ref) => {
        return {success: true, id: ref.id, message: "Release created"};
      })
      .catch((err) => {
        return {success: false, id: "", message: err};
      });
});

exports.updateRelease = functions.https.onCall((data, context) => {
  functions.logger.info("updateRelease", {structuredData: true});
  const release = data;
  release["updatedAt"] = admin.firestore.FieldValue.serverTimestamp();
  return db.collection("releases").doc(data.id).update(release)
      .then((ref) => {
        return {success: true, id: ref.id, message: "updated successfully."};
      })
      .catch((err) => {
        return {success: false, id: "", message: err};
      });
});

// News

exports.createNews = functions.https.onCall((data, context) => {
  functions.logger.info("createNews", {structuredData: true});
  return db.collection("news").add({
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    message: data.message,
    date: data.date,
    verified: data.verified,
    source: data.source,
    user: data.user,
    artists: data.artists,
  })
      .then((ref) => {
        return {success: true, id: ref.id, message: "News created"};
      })
      .catch((err) => {
        return {success: false, id: "", message: err};
      });
});

exports.updateNews = functions.https.onCall((data, context) => {
  functions.logger.info("updateNews", {structuredData: true});
  const news = data;
  news["updatedAt"] = admin.firestore.FieldValue.serverTimestamp();
  return db.collection("news").doc(data.id).update(news)
      .then((ref) => {
        return {success: true, id: ref.id, message: "updated successfully."};
      })
      .catch((err) => {
        return {success: false, id: "", message: err};
      });
});
