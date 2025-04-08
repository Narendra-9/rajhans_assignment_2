import React, { useContext,useState } from 'react'
import styles from "./ResetPassword.module.css"
import { LABELS } from '../../../constants/labels'
import { UserContext } from '../../../contexts/UserContext';
import { PASSWORD_REGEX } from '../../../constants/regex';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';
import { resetPassword } from '../../../services/userService';
import showPopUp from '../../../utils/swalMessage';
import showToast from '../../../utils/customToast';

const ResetPassword = () => {

  const {user}=useContext(UserContext);


  const [userPasswordResetDto,setUserPasswordResetDto]=useState({
    id:"",
    oldPassword:"",
    newPassword:"",
    confirmPassword:""
  })

  const [errors,setErrors]=useState({})

  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setUserPasswordResetDto({...userPasswordResetDto,[name]:value})

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }


  const validate=()=>{
    const newErrors={}
    if(!userPasswordResetDto.oldPassword){
      newErrors.oldPassword=LABELS.errorMessages.oldPasswordRequired
    }

    if(!userPasswordResetDto.newPassword){
      newErrors.newPassword=LABELS.errorMessages.newPasswordRequired
    }
    else if(!PASSWORD_REGEX.test(userPasswordResetDto.newPassword)){
      newErrors.newPassword=LABELS.errorMessages.passwordRegexNotFollowed
    }

    if(!userPasswordResetDto.confirmPassword){
      newErrors.confirmPassword=LABELS.errorMessages.confirmPasswordRequired
    }
    else if(userPasswordResetDto.newPassword!==userPasswordResetDto.confirmPassword){
      newErrors.confirmPassword=LABELS.errorMessages.passwordMismatch
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
    
  }


  const handleReset=async()=>{

    if(!validate()){
      return
    }

    userPasswordResetDto.id=user?.id;
    try{
      await resetPassword(userPasswordResetDto);
      showPopUp(LABELS.successMessages.passwordreset,LABELS.type.success);
      setUserPasswordResetDto({
        id:"",
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
      })
    }
    catch(err){
      if(err.response){
        if(err.response.status===404){
          setErrors(prev=>(
            {...prev,oldPassword:LABELS.errorMessages.incorrectOldPassword}
          ))
        }
        else{
          showToast(LABELS.errorMessages.somethingWentWrong,LABELS.type.error);
          console.log(err)
        }
      }
      else{
        showToast(LABELS.errorMessages.serverDown,LABELS.type.info);
      }
    }
  }

  return (
    <div className={styles.container}>
        <div className={`mb-3 ${styles.inputContainer}`}>
          <label className={styles.label}>{LABELS.headings.oldPassword} <span className={styles.required}>*</span></label>
          <input type='password' name='oldPassword' className={styles.input} onChange={handleInputChange} value={userPasswordResetDto.oldPassword}/>
          {errors.oldPassword && (<InputErrorMessage errorMessage={errors.oldPassword}/>)}
        </div>

        <div className={`mb-3 ${styles.inputContainer}`}>
          <label className={styles.label}>{LABELS.headings.newPassword} <span className={styles.required}>*</span></label>
          <input type='password' name='newPassword' className={styles.input} onChange={handleInputChange} value={userPasswordResetDto.newPassword}/>
          {errors.newPassword && (<InputErrorMessage errorMessage={errors.newPassword}/>)}
        </div>

        <div className={`mb-3 ${styles.inputContainer}`}>
          <label className={styles.label}>{LABELS.headings.confirmPassword} <span className={styles.required}>*</span></label>
          <input type='password' name='confirmPassword' className={styles.input} onChange={handleInputChange} value={userPasswordResetDto.confirmPassword}/>
          {errors.confirmPassword && (<InputErrorMessage errorMessage={errors.confirmPassword}/>)}
        </div>

        <div className={styles.btnContainer}>
          <button className={styles.resetBtn} onClick={handleReset}>{LABELS.headings.reset}</button>
        </div>
        
    </div>
  )
}

export default ResetPassword