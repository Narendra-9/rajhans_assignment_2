import React, { useCallback, useContext,useEffect,useState } from 'react'
import styles from "./PersonalDetails.module.css"
import {LABELS} from "../../../constants/labels"
import { UserContext } from '../../../contexts/UserContext';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import showToast from '../../../utils/customToast';
import { updateUser } from '../../../services/userService';
import { EMAIL_REGEX, NAME_REGEX, USERNAME_REGEX } from '../../../constants/regex';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';

const PersonalDetails = () => {
  const defaultProfile = "/fakeprofile.jpg";
  const validFormats = ["image/jpeg", "image/png", "image/jpg"];
  const imagePath= "http://localhost:8080/images/";
  const {user,storeUser}=useContext(UserContext);
  const [imgSrc, setImgSrc] = useState(defaultProfile);
  const [selectedFile, setSelectedFile] = useState(null);
  const [edit,setEdit]=useState(false);
  const [updateProfileImg,setUpdateProfileImg] = useState(false)
  const [userUpdateDto,setUserUpdateDto] = useState({
    id:"",
    firstName:"",
    lastName:"",
    userName:"",
    email:""
  })
  const [errors,setErrors]=useState({})

  const setUserUpdateDtoFromContext =useCallback( () =>{
    setUserUpdateDto({
      id:user?.id,
      firstName:user?.firstName,
      lastName:user?.lastName,
      userName:user?.userName,
      email:user?.email
    })
    setImgSrc(user.id ? `${imagePath}${user.id}` : defaultProfile);
    console.log("setting user from context")
  },[user?.id,user?.firstName,user?.lastName,user?.userName,user?.email])



  useEffect(()=>{
    if(user){
      setUserUpdateDtoFromContext();
    }
  },[user,setUserUpdateDtoFromContext])


  const handleInputChange=(e)=>{
    const {name,value} = e.target;
    setUserUpdateDto(prev=>({
      ...prev,[name]:value
    }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      setSelectedFile(file);
      setImgSrc(URL.createObjectURL(file));
      setUpdateProfileImg(true);
      setErrors(prev => ({ ...prev, "imageError": "" })); 
    }
  };

  const enableEdit=()=>{
    setEdit(true);
  }

  const cancelEdit=()=>{
    setEdit(false);
    setUpdateProfileImg(false)
    setUserUpdateDtoFromContext();
    setErrors({});
  }

  const handleProfileUpload=async()=>{
    const formData = new FormData();
    formData.append("image", selectedFile);
    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/images/${user?.id}/uploadImage`,formData,{
        headers: { "Content-Type": "multipart/form-data" },
      });

      // idhi cache lo unna image ne teesukuntundhi, latest ki t=".." and pettina kooda same time 
      // lo upload  avuthanay rendu so server process chese lopu idhi get ayipothundhi andhuke delay petta ikkada. 
      setTimeout(() => {
        setImgSrc(`${imagePath}${user.id}?t=${new Date().getTime()}`);
      }, 100);
    }
    catch(error){
        if(error.response){
          if(error.response.status === 409){
            showToast(LABELS.errorMessages.unsupportedFileType,LABELS.type.error);
            setErrors(prev=>(
              {...prev,"imageError":LABELS.errorMessages.unsupportedFileType}
            ))
          }
          else{
            showToast(LABELS.errorMessages.somethingWentWrong,LABELS.type.error);
          }
        }
        else{
          showToast(LABELS.errorMessages.serverDown,LABELS.type.info);
        }

        // ikkada wantedly error throw chesthunaa so that image upload ayyinappuudu emaina error
        // vasthe user details update avvadam kooda avvadhu
        throw new Error(LABELS.errorMessages.profileImageUploadFailed);
    }
  }


  const validateInputs = () => {
    const newErrors = {};
    if (!userUpdateDto.firstName.trim()) {
      newErrors.firstName = LABELS.errorMessages.firstnameRequired;
    }
    else if(!NAME_REGEX.test(userUpdateDto.firstName)){
      newErrors.firstName = LABELS.errorMessages.firstnameRegex
    }
    
    if (!userUpdateDto.lastName.trim()) {
      newErrors.lastName = LABELS.errorMessages.lastnameRequired;
    }
    else if(!NAME_REGEX.test(userUpdateDto.lastName)){
        newErrors.lastName = LABELS.errorMessages.lastnameRegex
    }
    if (!userUpdateDto.userName.trim()) {
      newErrors.userName = LABELS.errorMessages.userNameRequired;
    }
    else if(!(userUpdateDto.userName.trim().length > 4 && userUpdateDto.userName.trim().length<15)){
        newErrors.userName = LABELS.errorMessages.usernameLength
    }
    else if(!USERNAME_REGEX.test(userUpdateDto.userName)){
        newErrors.userName = LABELS.errorMessages.usernameRegex
    }

    if (!userUpdateDto.email.trim()) {
      newErrors.email = LABELS.errorMessages.emailRequired;
    } 
    else if (!EMAIL_REGEX.test(userUpdateDto.email)) {
      newErrors.email = LABELS.errorMessages.invalidEmail;
    }

    if(selectedFile){
      if (!validFormats.includes(selectedFile.type)) {
        newErrors.imageError=LABELS.errorMessages.unsupportedFileType
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    
};

  const handleSave=async()=>{
    
    if(!validateInputs()){
      return;
    }

    if (updateProfileImg && selectedFile) {
      try {
        await handleProfileUpload();

      } catch (error) {
        // akkada throw chesina error ikkda pattuni return ayipothunaa so inka kindha execution avvadhu
        console.error(error)
        return;
      }
    }

    try{
      const response=await updateUser(userUpdateDto);
      const responseDto=response.data.body;
      responseDto.role=user?.role
      storeUser({...user,...responseDto})

      setEdit(false)
    }
    catch(error){
      handleUpdateUSerError(error)
    }
   
  }

  function handleUpdateUSerError(error){
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
      } else{
        showToast(LABELS.errorMessages.somethingWentWrong,LABELS.type.error);
      }
    }
    else{
      showToast(LABELS.errorMessages.serverDown,LABELS.type.info);
    }
  }


  return (
    <div className={styles.container}>
      
      <button onClick={enableEdit}><EditIcon className={styles.editIcon}/></button>

      <div className={styles.profile}>
        <img src={imgSrc} alt={LABELS.alterativeTexts.profile} className={styles.profileImg} onError={() => setImgSrc(defaultProfile)}></img>
        {edit && <input type='file' onChange={handleFileChange} className={styles.upload}/>}
        {errors.imageError && (<InputErrorMessage errorMessage={errors.imageError}/>)}
      </div>

      <div className={styles.row}>
        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.firstname}</label>
            <input type='text' name='firstName' disabled={!edit} className={styles.registerInput} onChange={handleInputChange} value={userUpdateDto.firstName}/>
            {errors.firstName && (<InputErrorMessage errorMessage={errors.firstName}/>)}
        </div>

        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.lastname}</label>
            <input type='text' name='lastName' disabled={!edit} className={styles.registerInput} onChange={handleInputChange}  value={userUpdateDto.lastName}/>
            {errors.lastName && (<InputErrorMessage errorMessage={errors.lastName}/>)}
        </div>
      </div>

      <div className={styles.row}>
        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.username}</label>
            <input type='text' name='userName' disabled={!edit} className={styles.registerInput} onChange={handleInputChange} value={userUpdateDto.userName}/>
            {errors.userName && (<InputErrorMessage errorMessage={errors.userName}/>)}
        </div>

        <div className={`mb-3 ${styles.inputContainer}`}>
            <label className={styles.label}>{LABELS.headings.email}</label>
            <input type='text' name='email' disabled={!edit} className={styles.registerInput} onChange={handleInputChange} value={userUpdateDto.email}/>
            {errors.email && (<InputErrorMessage errorMessage={errors.email}/>)}
        </div>
      </div>
        
      {edit && (
        <div className={styles.btns}>
          <button className={styles.cancel} onClick={cancelEdit}>Cancel</button>
          <button className={styles.save} onClick={handleSave}>Save</button>
        </div>
      )}


    </div>
  )
}

export default PersonalDetails