import React, { useState } from 'react'
import styles from "./ForgotPassword.module.css"
import { LABELS } from '../../../constants/labels'
import { EMAIL_REGEX } from '../../../constants/regex';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';
import { forgotPassword } from '../../../services/userService';
import showPopUp from '../../../utils/swalMessage';
import showToast from '../../../utils/customToast';
const ForgotPassword = ({changeContainer}) => {
    const [email,setEmail]=useState("");
    const [errors,setErrors]=useState({})

    const handleInputChange=(e)=>{
        setErrors({})
        setEmail(e.target.value);
    }

    const validate=()=>{
        const newErrors={};
        if(!email){
            newErrors.email=LABELS.errorMessages.emailRequired
        }
        else if(!EMAIL_REGEX.test(email)){
            newErrors.email=LABELS.errorMessages.invalidEmail
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    const submit=async()=>{
        if(!validate()){
            return
        }

        try{
            const response=await forgotPassword(email);
            showPopUp(`${LABELS.general.passwordResetMsg}${response.data.body}`,LABELS.type.info);
        
            setEmail("");
    
            changeContainer(LABELS.headings.login)
        }
        catch(e){
            if(e.response){
                if(e.response.status === 404){
                    setErrors(prev=>(
                        {...prev,email:LABELS.errorMessages.noAccountFound}
                    ))
                }
                else{
                    showToast(LABELS.errorMessages.somethingWentWrong,LABELS.type.error)
                }
            }
            else{
                showToast(LABELS.errorMessages.serverDown,LABELS.type.info)
            }
        }
        
    }
  return (
    <div className={styles.container}>
        <button className={styles.backBtn} onClick={()=>changeContainer(LABELS.headings.login)}><ArrowBackIcon className={styles.backIcon}/> Back</button>
        <p className={styles.forgotPassword}>{LABELS.headings.forgotPassword}</p>
        <p className={styles.message}>{LABELS.headings.forgotPasswordMessage}</p>

        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.email} <span className={styles.required}>*</span></label>
            <input type='email' name='email' className={styles.input} onChange={handleInputChange} value={email}/>

            {errors.email && (<InputErrorMessage errorMessage={errors.email}/>)}
        </div>

        <button className={styles.submit} onClick={submit}>Submit</button>

    </div>

    
  )
}


ForgotPassword.propTypes = {
    changeContainer: PropTypes.func.isRequired,
  }; 

export default ForgotPassword