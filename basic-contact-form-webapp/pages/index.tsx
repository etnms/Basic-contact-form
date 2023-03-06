import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useState } from 'react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

export default function Home() {

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [msgSent, setMsgSent] = useState<boolean>();
  const [msgStateText, setMsgStateText]= useState<string>("");

  // Send info function
  async function sendInfo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const message: string = (document.querySelector("textarea[name='message']") as HTMLTextAreaElement).value;
    const contact: string = (document.querySelector("input[name='contact-info']") as HTMLInputElement).value;

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        message,
        contact,
        date: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      setMsgSent(true);
    }
    catch (e) {
      console.error("Error adding document: ", e);
      setMsgSent(false);
    }

    // Display a message depending on state of validity
    displayMessageState();
    // Reset fields to empty strings
    (document.querySelector("textarea[name='message']") as HTMLTextAreaElement).value = "";
    (document.querySelector("input[name='contact-info']") as HTMLInputElement).value = "";
  }

  function displayMessageState() {
    if (msgSent == null)
      setMsgStateText("");
    if (msgSent)
      setMsgStateText("Message sent!");
    else 
      setMsgStateText("Error your message couldn't be send")
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => sendInfo(e)}>
          <label htmlFor="message">Message</label>
          <textarea name="message"></textarea>
          <label htmlFor="contact-info">Contact</label>
          <input name="contact-info"></input>
          <button type="submit">Send</button>
        </form>
        <span>{msgStateText}</span>
      </main>
    </>
  )
}
