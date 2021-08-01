import { FC } from 'react'; 
import styles from './feed-info.module.css';

interface IFeedInfoProps {
    label: string;
    value: number;
}

const FeedInfo: FC<IFeedInfoProps> = ({label, value}) => {

    return  (
        <section >
            <header className={styles.label}>{label}</header>
            <span className={styles.value}>{value}</span>
        </section>
    )
}


export default FeedInfo;

