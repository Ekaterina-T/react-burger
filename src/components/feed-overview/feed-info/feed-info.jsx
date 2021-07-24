import styles from './feed-info.module.css'

import PropTypes from 'prop-types';

const FeedInfo = ({label, value}) => {

    return  (
        <section >
            <header className={styles.label}>{label}</header>
            <span className={styles.value}>{value}</span>
        </section>
    )
}


export default FeedInfo;

FeedInfo.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
}