import React from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  };

function Login() {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const router = useRouter();

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
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
            });
    }


    return (
        <div>
            <p>Login</p>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => signIn(e)}>
                <input name="email"></input>
                <input name="password"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;