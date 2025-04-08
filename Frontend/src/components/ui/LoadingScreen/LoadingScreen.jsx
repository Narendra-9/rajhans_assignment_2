import React from 'react'
import styles from "./LoadingScreen.module.css"
import { CircularProgress } from '@mui/material'
const LoadingScreen = () => {
  return (
    <div className={styles.container}>
        <CircularProgress />
    </div>
  )
}

export default LoadingScreen