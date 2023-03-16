import serviceAccount from "./serviceAccount.json"
import type { NextApiRequest, NextApiResponse } from 'next'
const admin = require("firebase-admin");

type Data = {
  notification: string
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
  console.log('Initialized.')
} catch (error) {
  console.error(error)
}

async function writeDb(message: string, contact: string) {

  try {
    const docRef = await admin.firestore().collection('messages').add({
      message,
      contact,
      date: new Date()
    })
    // write is complete here
    console.log("Document written with ID: ", docRef.id);
    sendNotifcation(contact)

  }
  catch (err) {
    console.error("Error adding document: ", err);
  }
}

function sendNotifcation(contact: string) {
  const message = {
    notification: {
      title: "You have a new message",
      body: `A user sent you a message through your contact form. From ${contact} `
    },
    token: process.env.CLIENT_TOKEN
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin.messaging().send(message)
    .then(function (response: any) {
      console.log("Successfully sent message:", response);
    })
    .catch(function (error: any) {
      console.log("Error sending message:", error);
    });

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body);
  writeDb(body.message, body.contact);
  res.status(200).json({ notification: "Notification api" })
}
