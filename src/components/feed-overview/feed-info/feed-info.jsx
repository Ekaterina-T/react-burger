import styles from './feed-info.module.css'

const FeedInfo = ({label, value, type}) => {

    return  (
        <section >
            <header className={styles.label}>{label}</header>
            <span className={styles.value}>{value}</span>
        </section>
    )
}


export default FeedInfo;