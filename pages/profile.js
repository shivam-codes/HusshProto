import { useEffect, useState } from "react";
import { getToken, getprofile, link } from "../services/login";
import styles from "../styles/profile.module.css"
import Loader from "../components/loader";
import { useRouter } from 'next/router';
import { inter } from "../assets/fonts/fonts";
import Footer from "../components/footer";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

export default function Profile()
{
    const router = useRouter();
    const profile_name = getprofile();
    const [isLoading, setLoading] = useState(false);

    const handleOnClick = async (e) => {
        e.preventDefault();
        setLoading(true);  
        const res = await link('gmail');
        var resu = JSON.parse(res);
        if(resu["res"] == "success")
        router.push('/search?q=gmail');
        else
        setLoading(false);
    }

    const handleDataset = async (e) => {
        e.preventDefault();
        setLoading(true);  
        const res = await link('dataset');
        var resu = JSON.parse(res);
        if(resu["res"] == "success")
        router.push('/search?q=dataset');
        else
        setLoading(false);
    }
    


    return(
    <div className={styles.container}>
        <div className={styles.profiletext}>
            <p className={styles.welcome}>Welcome {profile_name}</p>
            <p className={styles.data}>INDEX YOUR DATA AND SEARCH THEM</p>
        </div>
    {isLoading?<Loader />:<div className={styles.buttons}>
    <button onClick={handleOnClick} className={styles.gmail} style={inter.style}>Search gmaildata</button>
    <button onClick={handleDataset} className={styles.dataset} style={inter.style}>Search Datasets</button>
    </div>}
    <Footer style={styles.footer}/>
    </div>
   )
}