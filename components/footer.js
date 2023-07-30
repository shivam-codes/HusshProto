import styles from './style/footer.module.css';

export default function Footer(){
    return (
        <footer className={styles.footer}>
        <div style={{width:'50%'}}><hr style={{width:'100%',color:'#285b69',height:'1px'}}/></div>
        <p className={styles.footerText}>© Aaditya bhardwaj</p>
      </footer>
    )
}