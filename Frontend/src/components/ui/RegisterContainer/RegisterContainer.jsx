import React, { useState } from 'react'
import styles from "./RegisterContainer.module.css"
import { LABELS } from '../../../constants/labels'
import PropTypes from 'prop-types'
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '../../../constants/regex'
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage'
import { registerUser } from '../../../services/userService'
import showToast from '../../../utils/customToast'
import showPopUp from '../../../utils/swalMessage'

const RegisterContainer = ({changeContainer}) => {
    const [userRegisterDto,setUserRegisterDto]=useState({
        firstName:"",
        lastName:"",
        userName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [errors, setErrors] = useState({});

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setUserRegisterDto({...userRegisterDto,[name]:value});
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    }

    const validateInputs = () => {
        const newErrors = {};
    
        if (!userRegisterDto.firstName.trim()) {
          newErrors.firstName = LABELS.errorMessages.firstnameRequired;
        }
        else if(!NAME_REGEX.test(userRegisterDto.firstName)){
          newErrors.firstName = LABELS.errorMessages.firstnameRegex
        }
    
        if (!userRegisterDto.lastName.trim()) {
          newErrors.lastName = LABELS.errorMessages.lastnameRequired;
        }
        else if(!NAME_REGEX.test(userRegisterDto.lastName)){
            newErrors.lastName = LABELS.errorMessages.lastnameRegex
        }
    
        if (!userRegisterDto.userName.trim()) {
          newErrors.userName = LABELS.errorMessages.userNameRequired;
        }
        else if(!(userRegisterDto.userName.trim().length > 4 && userRegisterDto.userName.trim().length<15)){
            newErrors.userName = LABELS.errorMessages.usernameLength
        }
        else if(!USERNAME_REGEX.test(userRegisterDto.userName)){
            newErrors.userName = LABELS.errorMessages.usernameRegex
        }
    
        if (!userRegisterDto.email.trim()) {
          newErrors.email = LABELS.errorMessages.emailRequired;
        } 
        else if (!EMAIL_REGEX.test(userRegisterDto.email)) {
          newErrors.email = LABELS.errorMessages.invalidEmail;
        }
    
        if (!userRegisterDto.password) {
          newErrors.password = LABELS.errorMessages.passwordRequired;
        } 
        else if (!PASSWORD_REGEX.test(userRegisterDto.password)) {
          newErrors.password = LABELS.errorMessages.passwordRegexNotFollowed;
        }
    
        if (!userRegisterDto.confirmPassword) {
          newErrors.confirmPassword = LABELS.errorMessages.confirmPasswordRequired;
        } 
        else if (userRegisterDto.password !== userRegisterDto.confirmPassword) {
          newErrors.confirmPassword = LABELS.errorMessages.passwordMismatch;
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

    const register = async() => {
        if(!validateInputs()){
            return
        }
        try{
            await registerUser(userRegisterDto);
            setUserRegisterDto({
                firstName:"",
                lastName:"",
                userName:"",
                email:"",
                password:"",
                confirmPassword:""
            })
            showPopUp(LABELS.successMessages.register,LABELS.type.success)
            
            
        }
        catch(error){
            if(error.response){
                if(error.response.status===409){
                    const errorMessage = error.response.data?.errorMessage || "";
                    if(errorMessage.toLowerCase().includes(LABELS.headings.email.toLowerCase())){
                        setErrors(prev=>(
                            {...prev,email:LABELS.errorMessages.emailAlreadyExists}
                        ))
                    }
                    else if(errorMessage.toLowerCase().includes(LABELS.headings.username.toLowerCase())){
                        setErrors(prev=>(
                            {...prev,userName:LABELS.errorMessages.usernameTaken}
                        ))
                    }
                }
                else{
                    showToast(LABELS.errorMessages.somethingWentWrong,LABELS.type.error)
                }
            }
            else{
                showToast(LABELS.errorMessages.somethingWentWrong,LABELS.type.error)
            }
        }
        

    }

  return (
    <div className={styles.registerContainer}>
        <p className={styles.register}>{LABELS.headings.register}</p>
        <p className={styles.message}>{LABELS.headings.registerMessage}</p>

        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.firstname} <span className={styles.required}>*</span></label>
            <input type='text' name='firstName' className={styles.registerInput} onChange={handleInputChange} value={userRegisterDto.firstName}/>
            {errors.firstName && (<InputErrorMessage errorMessage={errors.firstName} />)}
        </div>

        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.lastname} <span className={styles.required}>*</span></label>
            <input type='text' name='lastName' className={styles.registerInput} onChange={handleInputChange} value={userRegisterDto.lastName}/>
            {errors.lastName && (<InputErrorMessage errorMessage={errors.lastName} />)}
        </div>

        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.username} <span className={styles.required}>*</span></label>
            <input type='text' name='userName' className={styles.registerInput} onChange={handleInputChange} value={userRegisterDto.userName}/>
            {errors.userName && (<InputErrorMessage errorMessage={errors.userName} />)}
        </div>

        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.email} <span className={styles.required}>*</span></label>
            <input type='text' name='email' className={styles.registerInput} onChange={handleInputChange} value={userRegisterDto.email}/>
            {errors.email && (<InputErrorMessage errorMessage={errors.email} />)}
        </div>

        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.password} <span className={styles.required}>*</span></label>
            <input type='password' name='password' className={styles.registerInput} onChange={handleInputChange} value={userRegisterDto.password}/>
            {errors.password && (<InputErrorMessage errorMessage={errors.password} />)}
        </div>

        <div className={`mb-4 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.confirmPassword} <span className={styles.required}>*</span></label>
            <input type='password' name='confirmPassword' className={styles.registerInput} onChange={handleInputChange} value={userRegisterDto.confirmPassword}/>
            {errors.confirmPassword && (<InputErrorMessage errorMessage={errors.confirmPassword} />)}
        </div>

        <button className={styles.registerBtn} onClick={register}>{LABELS.headings.register}</button>

        <p className={styles.hasAccount}>{LABELS.headings.hasAccount} <button className={styles.login} onClick={()=>changeContainer(LABELS.headings.login)}>{LABELS.headings.login}</button></p>
        

    </div>
  )
}

RegisterContainer.propTypes = {
    changeContainer: PropTypes.func.isRequired,
  };  


export default RegisterContainer