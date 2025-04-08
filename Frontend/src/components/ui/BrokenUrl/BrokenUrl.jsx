import React from 'react'
import styles from "./BrokenUrl.module.css"
const BrokenUrl = () => {
  return (
    <div className={styles.container}>
        <div className={styles.imgBlock}>
            <img src='/broken.png' alt='broken-url' height="400px"></img>
        </div>
        <div className={styles.message}>
            <h2 className='mb-3'>Uh-Oh! Something here is broken.</h2>
            <p className='mb-3'>The page you're looking for is either removed from this location <br></br> or the URL is wrong. Let's take you to a better place.</p>
        </div>
    </div>
  )
}

export default BrokenUrl