import React, { useContext, useEffect, useState } from "react";
import styles from "./UserNavBarDisplay.module.css";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate} from "react-router-dom"; 

const UserNavBarDisplay = ({ user }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [showOptions,setShowOptions]=useState(false);
  const {handleLogout}=useContext(UserContext)
  const navigate=useNavigate();

  useEffect(() => {
    if (user) {
      setImgSrc(`http://localhost:8080/images/${user?.id}?t=${new Date().getTime()}`);
    }
  }, [user]);

  const openOptions=()=>{
    setShowOptions(true);
  }

  const closeOptions=()=>{
    setShowOptions(false);
  }

  const optionClick=(url)=>{
    navigate(url);
    closeOptions();
  }

  return (
    <div className={styles.container} onMouseEnter={openOptions} onMouseLeave={closeOptions}>
      <Avatar className={styles.avatar} alt={user?.firstName} src={imgSrc} onError={() => setImgSrc("")}>
        {user.firstName.charAt(0)}
      </Avatar>
      <div className={styles.userDetails}>
        <p>{user?.firstName} </p>
        <p>{user?.email} </p>
      </div>
    
        {showOptions ? (
            <>
                <KeyboardArrowUpIcon className="ms-1"/>
                <div className={styles.options}>
                    <button className={styles.option} onClick={()=>optionClick("/profile")}><SettingsIcon/> Profile Settings</button>
                    <button className={styles.option} onClick={handleLogout}><LogoutIcon/> Log Out</button>
                </div>
            </>
        ): (
            <KeyboardArrowDownIcon className="ms-1"/>
        )}
    </div>
  );
};

export default UserNavBarDisplay;
