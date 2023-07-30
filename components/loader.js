import { PacmanLoader } from "react-spinners";
import styles from './style/loader.module.css';

export default function Loader()
{
    return(
        <div className={styles.container}>
        <PacmanLoader size="50px" color="#285b69" />
        </div>
    )
}