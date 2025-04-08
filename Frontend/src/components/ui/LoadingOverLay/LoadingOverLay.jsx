import React from 'react'
import styles from "./LoadingOverLay.module.css"
import CircularProgress from '@mui/material/CircularProgress';


const LoadingOverLay = () => {
  return (
    <div className={styles.overlay}>
        <CircularProgress className={styles.muiLoading}/>
    </div>
  )
}

export default LoadingOverLay