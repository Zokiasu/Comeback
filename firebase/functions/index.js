const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createUser = functions.https.onCall(async (data, context) => {
	functions.logger.info("createUser", { structuredData: true });
	const res = await db.collection("users").doc(data.id).set({
		createdAt: admin.firestore.FieldValue.serverTimestamp(),
		updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		id: data.id,
		name: data.name,
		picture: data.picture,
		role: data.role,
		artists: [],
		releases: [],
	});
	return res;
});

exports.createArtist = functions.https.onCall((data, context) => {
	functions.logger.info("createArtist", { structuredData: true });
});

exports.createRelease = functions.https.onCall((data, context) => {
	functions.logger.info("createRelease", { structuredData: true });
});

exports.createMusic = functions.https.onCall((data, context) => {
	functions.logger.info("createMusic", { structuredData: true });
});

exports.createNews = functions.https.onCall((data, context) => {
	functions.logger.info("createNews", { structuredData: true });
});
