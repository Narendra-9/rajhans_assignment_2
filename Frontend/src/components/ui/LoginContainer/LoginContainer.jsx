import React, { useContext, useState } from "react";
import styles from "./LoginContainer.module.css";
import { LABELS } from "../../../constants/labels";
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import PropTypes from "prop-types";
import InputErrorMessage from "../InputErrorMessage/InputErrorMessage";
import { loginUser } from "../../../services/userService";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import showToast from "../../../utils/customToast";


const LoginContainer = ({changeContainer}) => {
  const [userLoginDto, setUserLoginDto] = useState({
    userName: "",
    password: "",
  });

  const [errors,setErrors]=useState({authError:""})

  const [rememberMe, setRememberMe] = useState(false);

  const [loading,setLoading] = useState(false);

  const {storeUser} = useContext(UserContext)

  const navigate=useNavigate();

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "" 
     }));
  
    setUserLoginDto({ ...userLoginDto, [name]: value });
  };

  const validateInputs=()=>{
    const newErrors={};

    if(!userLoginDto.userName){
      newErrors.userName = LABELS.errorMessages.userNameRequired
    }

    if(!userLoginDto.password){
      newErrors.password = LABELS.errorMessages.passwordRequired
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors, 
    }));

    return Object.keys(newErrors).length === 0;
  }

  const login=async()=>{

    if (!validateInputs()) {
        return;
    }
    try{
      setLoading(true)
      const response= await loginUser(userLoginDto);
      storeUser(response?.data?.body)
      navigate("/")
      showToast(LABELS.successMessages.login,LABELS.type.success)
    }
    catch(error){
        if(error.status===404){
          setErrors(prev=>({...prev,authError:LABELS.errorMessages.invalidCredentials}))
        }
        else if(error.status===423){
          setErrors(prev=>({...prev,authError:LABELS.errorMessages.accountLocked}))
        }
        else if(error.status===403){
          setErrors(prev=>({...prev,authError:LABELS.errorMessages.accountNotActive}))
        }
    }finally{
      setLoading(false)
    }

  }

  const toggleRememberMe = () => {
    setRememberMe((prev) => !prev);
  };
  return (
    <div className={styles.loginContainer}>
      <p className={styles.login}>{LABELS.headings.login}</p>
      <p className={styles.message}>{LABELS.headings.loginMessage}</p>

      {errors.authError && (<InputErrorMessage errorMessage={errors.authError}/>)}

      <div className={`mb-4 mt-2 ${styles.inputContainer}`}>
        <label htmlFor="userName" className={styles.label}>Username</label>

        <div className={styles.inputWithIcon}>
          <PersonIcon className={styles.inputIcon} />
          <input
            id="userName"
            type="text"
            name="userName"
            className={styles.loginInput}
            onChange={handleInputChange}
            maxLength={20}
          />
        </div>

        {errors.userName && (<InputErrorMessage errorMessage={errors.userName}/>)}

      </div>
      

      <div className={styles.inputContainer}>
        <div className={styles.passwordLabel}>
          <label className={styles.label}>{LABELS.headings.password}</label>
          <button className={`${styles.label} ${styles.forgotPassword}`} onClick={()=>changeContainer(LABELS.headings.forgotPassword)}>
            {LABELS.headings.forgotPassword}
          </button>
        </div>
        <div className={styles.inputWithIcon}>
          <HttpsIcon className={styles.inputIcon} />
          <input
            type="password"
            className={styles.loginInput}
            name="password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && (<InputErrorMessage errorMessage={errors.password}/>)}
      </div>

      <div className={styles.rememberme}>
        <input
          className="me-1"
          type="checkbox"
          checked={rememberMe}
          onChange={toggleRememberMe}
        />
        <label className={styles.checkboxlabel}>
          {LABELS.headings.rememberme}
        </label>
      </div>

      

      {loading ? (
        <button className={styles.loadingBtn}><CircularProgress className={styles.loadingProgress}/></button>
      ):(
        <button className={styles.loginBtn} onClick={login}>Login</button>
      )}

      <p className={styles.noAccount}>
        {LABELS.headings.noAccount}{" "}
        <button className={styles.register} onClick={()=>changeContainer(LABELS.headings.register)}>
          Register
        </button>
      </p>
    </div>
  );
};

LoginContainer.propTypes = {
    changeContainer: PropTypes.func.isRequired,
  };    

export default LoginContainer;
