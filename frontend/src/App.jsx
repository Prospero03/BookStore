import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Routes, Route} from "react-router-dom"
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favorite from './components/Profile/Favorite'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Setting from './components/Profile/Setting'
import AllOrders from './pages/AllOrders'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'

const App = () => {

  {/*Предотвращает выход из системы после обновления*/}
  const dispatch = useDispatch();
  const role = useSelector((state)=> state.auth.role);
  useEffect(()=>{
    if(
        localStorage.getItem("id") &&
        localStorage.getItem("token") &&
        localStorage.getItem("role")
      ){
        dispatch(authActions.login());
        dispatch(authActions.changeRole(localStorage.getItem("role")))
      }
  }, [])

  return (
    <div>
      
        <Navbar/>
          <Routes>
            <Route exact path="/" element = {<Home/>} />
            <Route path="/all-books" element={<AllBooks/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/profile" element={<Profile/>}>

              {role === "user" ? 
              (<Route index element={<Favorite/>}/>
              ) : (
              <Route index element={<AllOrders/>}/>
              )}
              {role === "admin" && <Route path="/profile/add-book" element={<AddBook/>}/>}

              <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/>
              <Route path="/profile/settings" element={<Setting/>}/>
            </Route>
            
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/LogIn" element={<Login/>}/>

            <Route path="updateBook/:id" element={<UpdateBook/>} />

            <Route path="/view-book-details/:id" element={<ViewBookDetails/>}></Route>
            
          </Routes>
        <Footer/>
      
    </div>
  )
}

export default App;