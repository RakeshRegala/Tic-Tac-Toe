// firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://url-shortner-b9754-default-rtdb.firebaseio.com/" // Your database URL
});

// Get a reference to the database
const db = admin.database();

module.exports = { db };
