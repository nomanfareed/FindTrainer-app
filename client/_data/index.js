let { randomTrainers, randomUsers } = require("./_data");
const admin = require("firebase-admin");
const serviceAccount = require("./sky.json");
const collectionKey = "users"; //name of the collection

const trainersData = randomTrainers();
const usersData = randomUsers();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://store-f6116.firebaseio.com",
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

const seedDataMain = (arr) => {
  arr.forEach((docKey, index) => {
    firestore
      .collection(collectionKey)
      .doc(index + "")
      .set(docKey)
      .then((res) => {
        console.log("Document " + index + " successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
};

seedDataMain([...trainersData, ...usersData]);
