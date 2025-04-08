import './App.css'
import {Route, Routes}  from "react-router-dom";
import {Toaster} from "react-hot-toast";
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import NavBar from './components/layouts/navbar/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NewPasswordPage from './pages/NewPasswordPage';
import ManageUsersPage from './pages/ManageUsersPage';
import { SkeletonTheme } from 'react-loading-skeleton';
import ManageUserPage from './pages/ManageUserPage';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <div className='app'>
     <SkeletonTheme baseColor="#47555F" highlightColor="#5E6A73">
      <Toaster/>
      <NavBar/>
      <Routes>

        {/* Public Urls */}
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/reset-password/:token' element={<NewPasswordPage/>}></Route>

        {/* Private Urls */}
        <Route path='/' element={<PrivateRoute role={["ROLE_USER","ROLE_ADMIN","ROLE_MANAGER"]}><HomePage/></PrivateRoute>}></Route>
        <Route path='/profile' element={<PrivateRoute role={["ROLE_USER","ROLE_ADMIN","ROLE_MANAGER"]}><ProfilePage/></PrivateRoute>}></Route>
        <Route path='/manage-users' element={<PrivateRoute role={["ROLE_ADMIN","ROLE_MANAGER"]}><ManageUsersPage/></PrivateRoute>}></Route>
        <Route path='/manage-users/:id' element={<PrivateRoute role={["ROLE_ADMIN","ROLE_MANAGER"]}><ManageUserPage/></PrivateRoute>}></Route>

        <Route path='*' element={<ErrorPage/>}></Route>

      </Routes>
    </SkeletonTheme>
    </div>
  )
}

export default App
