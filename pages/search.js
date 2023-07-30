import { useState } from 'react';
import Footer from '../components/footer';
import styles from '../styles/search.module.css';
import Result from '../components/result';
import { getQuery, getToken, getprofile } from '../services/login';
import { inter } from '../assets/fonts/fonts';
import Loader from '../components/loader';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Search()
{
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const url = '';
    const user = getToken();
    const router = useRouter();
    const { q } = router.query;
    const onChange = (e) => {
        setQuery(e.target.value);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        var res = await getQuery({q,query,user});
        res = JSON.parse(res);
        setResult(res);
        setLoading(false);
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.bar}>
                <div className={styles.welcomeText}>
                    <p style={inter.style}>Visit <Link href='/profile'>Profile</Link></p>
                </div>
            </div>
        <div className={styles.searchBar}>
            <form onSubmit={onSubmitHandler}>
              <input className={styles.input} type='text' value={query} onChange={onChange}id='query' name='query' placeholder='Search your query'></input>
            </form>
        </div>
        {loading?<Loader />:result.length?<Result data={result}/>:
        <p className={styles.searchText}>Search your query and it will show you nearest result based on vector embedding </p>}
          <Footer />
        </div>
    )
}