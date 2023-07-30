import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/Home.module.css';
import Footer from '../components/footer';
import { useRouter } from 'next/router';
import { getToken } from '../services/login';

export default function Home() {
  const token = getToken();
  const router = useRouter();

  const onClick = (e) => {
     if(token)
     router.push('/profile');
     else
     router.push('/login');
  }

  return (
    <div className={styles.mainContainer}>
    <div className={styles.container}>
      <h1>Search the Vector Database</h1>
      <button className={styles.button} onClick={onClick}>Go to Search</button>
    </div>
     <Footer />
    </div>
  );
}
