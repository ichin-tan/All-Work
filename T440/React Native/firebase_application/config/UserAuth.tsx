import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { useEffect, useState } from "react";

export function UserAuthentication() {
    const [user,setUser] = useState<User>();

    useEffect(() => {
        const userAuth = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            user ? setUser(user) : setUser(undefined);
        })

        return userAuth;
    }, [])

    return { user };
}