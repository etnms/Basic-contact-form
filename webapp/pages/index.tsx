import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
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
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const db: Firestore = getFirestore(app);

  const [msgStateText, setMsgStateText]= useState<string>("");

  // Send info function
  async function sendInfo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const message: string = (document.querySelector("textarea[name='message']") as HTMLTextAreaElement).value;
    const contact: string = (document.querySelector("input[name='contact-info']") as HTMLInputElement).value;

    if (message === "" || contact === "")
    {
      setMsgStateText("Error: one of the fields is empty");
      return;
    }
    
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        message,
        contact,
        date: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      setMsgStateText("Message sent!");
      hideMessage();
    }
    catch (e) {
      console.error("Error adding document: ", e);
      setMsgStateText("Error: your message couldn't be send");
    }

    // Reset fields to empty strings
    (document.querySelector("textarea[name='message']") as HTMLTextAreaElement).value = "";
    (document.querySelector("input[name='contact-info']") as HTMLInputElement).value = "";
  }

  function hideMessage() {
    setTimeout(deleteMessage, 2000);
  }

  function deleteMessage() {
    setMsgStateText("");
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Basic contact form</h1>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => sendInfo(e)} className={styles.form}>
          <label htmlFor="message">Message</label>
          <textarea name="message"></textarea>
          <label htmlFor="contact-info">Your contact (email address)</label>
          <input name="contact-info" type="email"></input>
          <button type="submit">Send</button>
        </form>
        {msgStateText !== ""? <span>{msgStateText}</span>: null}
      </main>
      </div>
    </>
  )
}
