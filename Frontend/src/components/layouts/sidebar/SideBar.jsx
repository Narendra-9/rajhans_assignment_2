import React from 'react'
import styles from "./SideBar.module.css"
import { LABELS } from '../../../constants/labels'
import Person2Icon from '@mui/icons-material/Person2';
import LockResetIcon from '@mui/icons-material/LockReset';
import BlockIcon from '@mui/icons-material/Block';

const SideBar = ({changeContent}) => {
  return (
    <div className={styles.sidebar}>
        <button className={styles.item} onClick={()=>changeContent(LABELS.headings.personaldetails)}><Person2Icon className={styles.icon}/> {LABELS.headings.personaldetails}</button>
        <button className={styles.item} onClick={()=>changeContent(LABELS.headings.resetPassword)}><LockResetIcon className={styles.icon}/> {LABELS.headings.resetPassword}</button>
        <button className={styles.item} onClick={()=>changeContent(LABELS.headings.deactivateAccount)}><BlockIcon className={styles.icon}/> {LABELS.headings.deactivateAccount}</button>
    </div>
  )
}

export default SideBar