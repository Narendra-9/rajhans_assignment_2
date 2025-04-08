import React, { useContext } from 'react'
import styles from "./Navbar.module.css"
import { LABELS } from '../../../constants/labels'
import { UserContext } from '../../../contexts/UserContext'
import UserNavBarDisplay from '../../ui/UserNavBarDisplay/UserNavBarDisplay'
import { useNavigate } from 'react-router-dom'
const NavBar = () => {
  const {user}=useContext(UserContext);
  const navigate=useNavigate();
  return (
    <div className={styles.navBar}>
    <button className={styles.logoContainer} onClick={()=>navigate("/")}>
        <p className={styles.logo}>{LABELS.headings.websiteName}</p>
        <img className={styles.endavaLogo} src={LABELS.imageUrls.endavaSymbol} alt={LABELS.alterativeTexts.endavaSymbol}/>
    </button>
    
    {user && <UserNavBarDisplay user={user}/>}
    
    </div>
  )
}

export default NavBar