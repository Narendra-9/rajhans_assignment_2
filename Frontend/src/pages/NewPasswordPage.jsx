import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from "react-router-dom"; 
import styles from "../styles/NewPasswordPage.module.css";
import { LABELS } from '../constants/labels';
import ErrorIcon from '@mui/icons-material/Error';
import CircularProgress from '@mui/material/CircularProgress';
import { PASSWORD_REGEX } from '../constants/regex';
import InputErrorMessage from '../components/ui/InputErrorMessage/InputErrorMessage';
import showPopUp from '../utils/swalMessage';
import { setNewPassword, validateToken } from '../services/userService';
import showToast from '../utils/customToast';
import LoadingOverLay from '../components/ui/LoadingOverLay/LoadingOverLay';

const NewPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate(); 

    const [newPasswordRequestDto,setNewPasswordRequestDto]=useState({
        token:"",
        newPassword:"",
        oldPassword:"",
    })

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(5);
    const [interacting,setInteracting] = useState(false);


    useEffect(() => {
        let timer;

        const checkTokenValidity = async () => {
            try {
                const response = await validateToken(token); 

                // Wantedly making it to wait.
                await new Promise(resolve => setTimeout(resolve, 3000));

                if (response.data.body) {
                    setNewPasswordRequestDto(prev => ({ ...prev, token }));
                } else {
                    setError(LABELS.errorMessages.invalidToken);
                    startCountdown()
                }

            } catch (err) {
                console.error(err)
                setError(LABELS.errorMessages.tokenValidationFailed);
                startCountdown()
            } finally {
                setLoading(false);
            }

        };

        checkTokenValidity();

        const startCountdown=()=> {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        clearInterval(timer);
                        navigate("/login");
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };

    }, [token, navigate]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPasswordRequestDto((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateInputs = () => {
        const newErrors = {};

        if (!newPasswordRequestDto.newPassword) {
            newErrors.newPassword = LABELS.errorMessages.passwordRequired;
        } else if (!PASSWORD_REGEX.test(newPasswordRequestDto.newPassword)) {
            newErrors.newPassword = LABELS.errorMessages.passwordRegexNotFollowed;;
        }

        if (!newPasswordRequestDto.confirmPassword) {
            newErrors.confirmPassword = LABELS.errorMessages.confirmPasswordRequired;
        } else if (newPasswordRequestDto.newPassword !== newPasswordRequestDto.confirmPassword) {
            newErrors.confirmPassword = LABELS.errorMessages.passwordsDonotMatch;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave=async()=>{
        if(!validateInputs()){
            return
        }
        try{
            setInteracting(true)
            await setNewPassword(newPasswordRequestDto);
            showPopUp(LABELS.successMessages.newPasswordSet,LABELS.type.success);
            navigate("/login", { replace: true });
        }
        catch(e){
            if(e.status===409){
                errors.newPassword=LABELS.errorMessages.passwordSameAsOld;
            }
            else if(e.status===404){
                setError(LABELS.errorMessages.invalidToken);
            }
            else{
                showToast(LABELS.errorMessages.somethingWentWrong,LABELS.type.error);
                console.error(e);
            }
        }
        finally{
            setInteracting(false);
        }
    }

    if (loading) {
        return (
            <div className={styles.loading}>
                <CircularProgress/>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.error}><ErrorIcon className='me-1'/>{error}</p>
                <p className={styles.countDownMsg}>Redirecting in <span className={styles.countdown}>{countdown}</span> seconds...</p>
            </div>
        );
    }
    
  return (
    <div className={styles.container}>

        {interacting && (<LoadingOverLay/>)}

        <p className={styles.message}>{LABELS.headings.setNewPassword}</p>

        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.newPassword} <span className={styles.required}>*</span></label>
            <input type='password' name='newPassword' className={styles.input} onChange={handleInputChange}/>
            {errors.newPassword && (<InputErrorMessage errorMessage={errors.newPassword}/>)}
        </div>

        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.confirmPassword} <span className={styles.required}>*</span></label>
            <input type='password' name='confirmPassword' className={styles.input} onChange={handleInputChange}/>
            {errors.confirmPassword && (<InputErrorMessage errorMessage={errors.confirmPassword}/>)}

        </div>

        <div className={styles.btns}>
            <button className={styles.saveBtn} onClick={handleSave}>Save</button>
        </div>
    </div>
  )
}

export default NewPasswordPage