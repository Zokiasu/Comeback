const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.createUser = functions.https.onCall((data, context) => {
  functions.logger.info("createUser", {structuredData: true});
  return db.collection("users").add({
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    name: data.name,
    picture: data.picture,
    role: data.role,
    artists: [],
    releases: [],
  })
      .then((ref) => {
        return {success: true, id: ref.id, message: "User created"};
      })
      .catch((err) => {
        return {success: false, id: "", message: err};
      });
});

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
  })
      .then((ref) => {
        return {success: true, id: ref.id, message: "Artist created"};
      })
      .catch((err) => {
        return {success: false, id: "", message: err};
      });
});

exports.updateArtist = functions.https.onCall((data, context) => {
  functions.logger.info("updateArtist", {structuredData: true});
  const artist = data;
  artist["updatedAt"] = admin.firestore.FieldValue.serverTimestamp();
  return db.collection("releases").doc(data.id).update(artist)
      .then((ref) => {
        return {success: true, id: ref.id, message: "updated successfully."};
      })
      .catch((err) => {
        return {success: false, id: "", message: err};
      });
});

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
