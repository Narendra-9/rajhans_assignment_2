import React, { useState } from 'react'
import styles from "../styles/ProfilePage.module.css"
import SideBar from '../components/layouts/sidebar/SideBar'
import HeadingWithBullet from '../components/ui/HeadingWithBullet/HeadingWithBullet'
import { LABELS } from '../constants/labels'
import PersonalDetails from '../components/ui/PersonalDetails/PersonalDetails'
import ResetPassword from '../components/ui/ResetPassword/ResetPassword'
import DeactivateUser from '../components/ui/DeactivateUser/DeactivateUser'

const ProfilePage = () => {
  const [showContent,setShowContent]=useState(LABELS.headings.personaldetails)

  const changeContent=(content)=>{
    setShowContent(content);
  }

  return (
    <div className={styles.container}>
        <div className={styles.left}>
          <SideBar changeContent={changeContent}/>
        </div>
        <div className={styles.right}>

          <HeadingWithBullet heading={showContent}/>

          {showContent === LABELS.headings.personaldetails && <PersonalDetails/>}
          {showContent === LABELS.headings.resetPassword && <ResetPassword/>}
          {showContent === LABELS.headings.deactivateAccount && <DeactivateUser/>}

        </div>
    </div>
  )
}

export default ProfilePage