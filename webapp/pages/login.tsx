import React, { useState } from 'react';
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextRouter, useRouter } from 'next/router';
import { FirebaseApp, initializeApp } from "firebase/app";
import styles from "../styles/login.module.css";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

function Login() {

    const app: FirebaseApp = initializeApp(firebaseConfig);
    const auth: Auth = getAuth();
    const router: NextRouter = useRouter();
    const [errLoginText, setErrLoginText] = useState<string>();

    function signIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const email = (document.querySelector("input[name='email']") as HTMLTextAreaElement).value;
        const password = (document.querySelector("input[name='password']") as HTMLTextAreaElement).value;

        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                router.push("/dashboard")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
                setErrLoginText("Error while trying to login.")
            });
            
    }

    return (
        <main className={styles.main}>

            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => signIn(e)} className={styles.form}>
                <h1 className={styles.title}>Login</h1>
                <label htmlFor='email'>Email</label>
                <input name="email"></input>
                <label htmlFor='password'>Password</label>
                <input name="password" type="password"></input>
                <button type="submit" className={styles.button}>Sign in</button>
                {errLoginText === ""? null : <p className={styles.err}>{errLoginText}</p>}
            </form>
        </main>
    );
}

export default Login;