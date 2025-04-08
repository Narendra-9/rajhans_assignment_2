import React from "react";
import styles from "./UserCard.module.css";
import { LABELS } from "../../../constants/labels";
import { Link } from "react-router-dom";
const UserCard = ({user}) => {
  return (
    <Link to={`/manage-users/${user.id}`} className={styles.link}>
    <div className={styles.userCard}>
      <div className={styles.imgBlock}>
        <img
          className={styles.img}
          src={LABELS.imageUrls.dbImagePath+user?.id}
          alt="user-profile"
          onError={(e) => { e.target.src = "/fakeprofile.jpg"; }}
        ></img>
      </div>

      <div className={styles.contentBlock}>
        <div className={styles.userMeta}>
          <p className={styles.name}>{user?.firstName + " " + user?.lastName}</p> 
          <p className={styles.email}>{user?.email}</p>
        </div>
        <div className={styles.btnDisplay}>
          <p className={`${user?.active ? styles.statusActive : styles.statusDeactivated}`}>
            {(user?.active)?(LABELS.headings.active):(LABELS.headings.deactivated)}
          </p>
          <p className={`${user?.role === LABELS.roles.user ? styles.roleUser : styles.roleManager}`}>
            {LABELS.headings[user?.role.replace("ROLE_", "").toLowerCase()] || LABELS.headings.user}
          </p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default UserCard;
