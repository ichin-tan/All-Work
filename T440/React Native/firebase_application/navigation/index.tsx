import React from "react";
import HomeStack from "./HomeStack";
import WelcomeStack from "./WelcomeStack";
import { UserAuthentication } from "../config/UserAuth";


export default function RootNavigation() {
    const { user } = UserAuthentication();

    return user ? <HomeStack /> : <WelcomeStack/>
}