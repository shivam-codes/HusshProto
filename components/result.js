import styles from './style/result.module.css'

export default function Result(props) {
  //console.log(props.result);
    const data = props.data; 
    //console.log(data);
  return (
    <ul className={styles.container}>
        {data.map((val, index) => {
            return (
            <li className={styles.list} key={index}>{val}</li>
            );
            })}
    </ul>
  )
}