// const admin = require("firebase-admin");
// const serviceAccount = require("../../serviceAccountKey.json");
import admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json" assert { type: "json" }; // Use assert { type: 'json' }
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
