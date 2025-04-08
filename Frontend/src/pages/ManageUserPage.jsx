import React, { useEffect, useState } from 'react'
import styles from "../styles/ManageUserPage.module.css"
import { useParams } from 'react-router-dom';
import { LABELS } from '../constants/labels';
import LoadingScreen from '../components/ui/LoadingScreen/LoadingScreen';
import BrokenUrl from '../components/ui/BrokenUrl/BrokenUrl';
import { getUserById } from '../services/userService';
import ManageUser from '../components/ui/ManageUser/ManageUser';



const ManageUserPage = () => {
    const { id } = useParams();
    const [employee,setEmployee]=useState(null);
    const [loading,setLoading]=useState(true);
    const [noUserFound,setNoUserFound]=useState(false);


    useEffect(()=>{
        const getUser = async() => {
            try{
                const response = await getUserById(id);
                setEmployee(response.data.body);
            }
            catch(e){
                setNoUserFound(true)
                console.error(e)
            }
            finally{
                setLoading(false);
            }
        }

        getUser();
    },[id])

    const updateEmployee = (data)=>{
        setEmployee(prev=>(
            {...prev,...data}
        ))
    }

    if(loading) return <LoadingScreen/>

    if(noUserFound) return <BrokenUrl/>

    

  return (
    <div className={styles.container}>
        <ManageUser user={employee} updateEmployee={updateEmployee}/>
    </div>
  )
}

export default ManageUserPage