import React, { useEffect, useState } from 'react';
import { collection, DocumentData, Firestore, getDocs, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Auth, getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import { NextRouter, useRouter } from 'next/router';
import styles from "../styles/dashboard.module.css";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

interface IDocument {
    id: string,
    message: string,
    contact: string,
    date: string
}

function Dashboard() {

    const app: FirebaseApp = initializeApp(firebaseConfig);
    const auth: Auth = getAuth();
    const db: Firestore = getFirestore(app);
    const router: NextRouter = useRouter()

    const [documents, setDocuments] = useState<IDocument[]>([]);

    async function getData() {
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "messages"));

        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            setDocuments(documents => [...documents, {
                id: doc.id,
                message: doc.data().message,
                contact: doc.data().contact,
                date: `${doc.data().date.toDate().toDateString()} at ${doc.data().date.toDate().toLocaleTimeString()}`
            }])
        });
    }

    async function signUserOut() {
        signOut(auth).then(() => {
            console.log("success sign out");
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                const uid = user.uid;
                getData();
                console.log(uid);
            } else {
                console.log("signed out");
                router.push("/login")
            }
        });

    }, [])

    function displayData() {
        return documents.map((doc: IDocument) =>
            <li key={doc.id} className={styles.item}>
                <p>Contact: {doc.contact} - Sent: {doc.date}</p>
                <p>Message: {doc.message}</p></li>)
    }

    return (
        <div>
            <nav className={styles.nav}>
                <h1 className={styles.title}>Dashboard</h1>
                <button type="button" onClick={() => signUserOut()} className={styles.button}>Sign out</button>
            </nav>
            <main className={styles.main}>

                <ul className={styles.list}>{displayData()}</ul>
            </main>
        </div>
    );
}


export default Dashboard;