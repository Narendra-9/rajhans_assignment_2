import React from 'react'
import styles from "./HeadingWithBullet.module.css"
import PropTypes from 'prop-types';

const HeadingWithBullet = ({heading}) => {
  return (
    <div className={styles.heading}>
        <div className={`mb-2 me-2 ${styles.bullet}`}></div>
        <h3>{heading}</h3>
    </div>
  )
}

HeadingWithBullet.propTypes = {
    heading: PropTypes.isRequired,
  };    

export default HeadingWithBullet