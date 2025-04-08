import React from 'react'
import styles from "./UserCardSkeleton.module.css"
import Skeleton from "react-loading-skeleton";

const UserCardSkeleton = ({count}) => {
  return Array(count)
  .fill(0)
  .map( _ => {
    return (
    <div className={styles.card} key={crypto.randomUUID()}>
        <div className={styles.imgBlock}>
          <Skeleton circle width={80} height={80}/>
        </div>
        <div className={styles.contentBlock}>
          <div className={styles.userMeta}>
            <Skeleton className={styles.name}/>
            <Skeleton className={styles.email}/>
          </div>
          <div className={styles.btnDisplay}>
            <Skeleton className={styles.btn}/>
            <Skeleton className={styles.btn}/>
          </div>
        </div>
    </div>
  )
  });
}

export default UserCardSkeleton