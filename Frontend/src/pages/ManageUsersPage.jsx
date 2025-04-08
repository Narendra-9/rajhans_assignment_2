import React, { useEffect, useState } from 'react'
import styles from "../styles/ManageUsersPage.module.css"
import UserCard from '../components/ui/UserCard/UserCard'
import { getUsers , searchUsers} from '../services/userService'
import showToast from '../utils/customToast'
import { LABELS } from '../constants/labels'
import HeadingWithBullet from '../components/ui/HeadingWithBullet/HeadingWithBullet'
import UserCardSkeleton from '../components/ui/userCardSkeleton/UserCardSkeleton'
import { debounce } from 'lodash';

const ManageUsersPage = () => {
    const [users,setUsers] = useState(null)
    const [query,setQuery] = useState("")
    const [loading,setLoading] = useState(true)
    const [searchResult,setSearchResult]=useState(null)
    const [notFound,setNotFound] = useState(false)

    useEffect(() => {

        const fetchAllUsers= async() => {
            try{
                const response = await getUsers();
                await new Promise(resolve => setTimeout(resolve, 500));
                setUsers(response.data.body.content)
            }
            catch(e){
                showToast(LABELS.errorMessages.somethingWentWrong,LABELS.type.error)
                console.error(e)
            }
            finally{
                setLoading(false)
            }
            
        }

        fetchAllUsers();
        
    },[])

    const handleSearch=debounce(async(query)=>{

        if(query.trim() === ""){
            setSearchResult(null)
            setNotFound(false)
            return
        }
        try {
            setLoading(true);
            const response = await searchUsers(query.trim());
            setSearchResult(response.data.body.content);
            setNotFound(false)
        } catch (e) {
            if(e.response){
                if(e.response.status===404){
                    setNotFound(true)
                    setSearchResult(null)
                }
                else{
                    showToast(LABELS.errorMessages.somethingWentWrong,LABELS.type.error);
                }
            }else{
                showToast(LABELS.errorMessages.serverDown,LABELS.type.info);
            }
        } finally {
            setLoading(false);
        }

    },500);


    useEffect(() => {
        handleSearch(query);
        return () => {
          handleSearch.cancel();
        };
      }, [query]);


      const renderUsers = () => {
        if (loading) {
            return <UserCardSkeleton count={10} />;
        }
        if (notFound) {
            return <div className={styles.noResults}>
                <img src='/not_found_gif.gif' alt='no-results' height="350px"></img>
            </div>;
        }
        if (searchResult) {
            return searchResult.map(user => <UserCard user={user} key={user?.id} />);
        }
        return users?.map(user => <UserCard user={user} key={user?.id} />);
    };
    

    return (
    <div className={styles.container}>
        <HeadingWithBullet heading={LABELS.headings.managerusers}/>

        <div className={styles.searchContianer}>
            <input type='text' className={styles.search} name="search" placeholder='Search' onChange={(e)=>setQuery(e.target.value)} value={query}></input>
        </div>

        <div className={styles.usersContainer}>{renderUsers()}</div>
    </div>
  )
}

export default ManageUsersPage