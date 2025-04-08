import React, { createContext,  useCallback,  useEffect, useMemo, useState } from 'react'
import SecureLS from "secure-ls";
import showToast from "../utils/customToast";
import { getUserById } from '../services/userService';
import { LABELS } from '../constants/labels';
import LoadingScreen from '../components/ui/LoadingScreen/LoadingScreen';

export const UserContext=createContext();

const ls = new SecureLS({ encodingType: LABELS.general.encodingType });

export function UserProvider({children}){

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    
    
    async function getUserDetails(userId) {
        try {
          const response = await getUserById(userId);
          return response.data.body;
        } catch (error) {
          showToast(LABELS.errorMessages.somethingWentWrong,LABELS.type.success)
          console.error(error);
          return null;
        }
      }
      
    useEffect(() => {
        const storedUser = ls.get(LABELS.general.user);
        if (storedUser) {
            const userId = JSON.parse(storedUser).id;
            const loginDirectly = async () => {
                const fetchedUser = await getUserDetails(userId);
                setUser(fetchedUser);
                setLoading(false)
            };
            loginDirectly();
        }
        else{
          setLoading(false)
        }
    }, []);

    const storeUser=useCallback((userData)=>{
      setUser(userData);
      ls.set("user",JSON.stringify(userData))
    },[])

    const handleLogout=useCallback(()=>{
      setUser(null);
      window.location.href="/login"
      ls.remove(LABELS.general.user);
    },[])

    const value = useMemo(()=> ({
      user,
      loading,
      storeUser,
      handleLogout
    }),[
      user,
      loading,
      storeUser,
      handleLogout
    ]);


    if (loading) return <LoadingScreen/>

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
    
}