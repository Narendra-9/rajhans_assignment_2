import React, { useContext, useState } from "react";
import styles from "./DeactivateConfirmation.module.css";
import Modal from "react-bootstrap/Modal";
import { LABELS } from "../../../constants/labels";
import { UserContext } from "../../../contexts/UserContext";
import { deactivateUser } from "../../../services/userService";
import showPopUp from "../../../utils/swalMessage";
import InputErrorMessage from "../InputErrorMessage/InputErrorMessage";

const DeactivateConfirmation = ({ show, handleClose }) => {
  const {user,handleLogout}=useContext(UserContext)
  const [deactivateUserDto,setDeactivateUserDto] = useState({
    id:"",
    password:""
  })
  const [errors,setErrors]=useState({})

  const handlePasswordChange=(e)=>{
    setDeactivateUserDto({...deactivateUserDto,password:e.target.value})
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: "" }));
    }
  }

  const deactivate=async()=>{

    if(!deactivateUserDto.password){
      setErrors(prev=>(
        {...prev,password:LABELS.errorMessages.passwordRequired}
      ))
    }

    deactivateUserDto.id=user?.id


    if(!deactivateUserDto.id){
      setErrors(prev=>(
        {...prev,id:LABELS.errorMessages.userIdRequired}
      ))
    }
    try{
      await deactivateUser(deactivateUserDto);
      showPopUp(LABELS.successMessages.userDeactivated,LABELS.type.success);
      setDeactivateUserDto({
        id:"",
        password:""
      })
      setTimeout(handleLogout,2000)
      

    }
    catch(err){
      if(err.response){
        if(err.response.status===404){
          setErrors(prev=>(
            {...prev,password:LABELS.errorMessages.passwordInvalid}
          ))
        }
      }
    }
    
  }


  const closeModal=()=>{
    setErrors({})
    setDeactivateUserDto({
      id:"",
      password:""
    })
    handleClose()
  }
  
  return (
    <Modal show={show} onHide={handleClose} className={styles.modal}>
      <Modal.Body className={styles.modalBodyCustomBg}>

        <p className={styles.message}>Enter your password to confirm</p>

        <div className={`mb-3 ${styles.inputContainer}`}>
          <label className={styles.label}>
            {LABELS.headings.password}{" "}
            <span className={styles.required}>*</span>
          </label>
          <input
            type="password"
            name="password"
            className={styles.input}
            value={deactivateUserDto.password}
            onChange={handlePasswordChange}
          />
          {errors.password && (<InputErrorMessage errorMessage={errors.password}/>)}
        </div>

      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <button className={styles.cancelBtn} onClick={closeModal}>
          {LABELS.headings.cancel}
        </button>

        <button className={styles.deactivateBtn} onClick={deactivate}>
        {LABELS.headings.confirm}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeactivateConfirmation;
