import { useState } from "react";
import Login from "../components/login";
import styles from "../styles/LoginPage.module.css";
import Search from "./search";
import { useRouter } from 'next/router';
import { getToken,setToken } from "../services/login";



export default function LoginPage() {
    const router = useRouter();
    const token = getToken();

    if(token)
    {
        router.replace('/profile');
    }

    return (
        <div className={styles.Login}>
        <Login setToken={setToken}></Login>
        </div>
    )
}