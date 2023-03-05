import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
    contact: string
}

function Dashboard() {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [documents, setDocuments] = useState<IDocument[]>([]);

    async function getData() {
        const querySnapshot = await getDocs(collection(db, "messages"));
        //setDocuments(querySnapshot);
        
        querySnapshot.forEach((doc) => {
            setDocuments(documents => [...documents, {id: doc.id, message: doc.data().message, contact: doc.data().contact}])
        });
    }

    useEffect(() => {
        getData();
    }, [])

    function displayData() {
        return documents.map((doc: any) =><li key={doc.id}>{doc.message} {doc.contact}</li>)
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>{displayData()}</ul>
        </div>
    );
}


export default Dashboard;