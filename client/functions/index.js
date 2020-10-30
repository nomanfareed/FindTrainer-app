const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const isTrainer = "isTrainer";
const isUser = "isUser";

//$ firebase deploy --only functions
exports.addTrainer = functions.https.onCall(async (data) => {
  const email = data.email; // 3
  return grantModeratorRole(email, 1)
    .then(() => {
      return {
        result: `Request fulfilled! ${email} is now a
                trainer.`,
      };
    })
    .catch((err) => {
      return {
        error: err,
      };
    });
});
exports.addUser = functions.https.onCall(async (data) => {
  const email = data.email; // 3
  return grantModeratorRole(email, 0)
    .then(() => {
      return {
        result: `Request fulfilled! ${email} is now a
                  user.`,
      };
    })
    .catch((err) => {
      return {
        error: err,
      };
    });
});
async function grantModeratorRole(email, role) {
  const key = role === 1 ? isTrainer : isUser;
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && user.customClaims[key] === true) {
    return;
  }
  return admin.auth().setCustomUserClaims(user.uid, {
    [key]: true,
  });
}
