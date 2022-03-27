import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import * as lobbyService from './services/lobbyService'
import MakeALobby from './pages/MakeALobby/MakeALobby'
import AddAGame from './pages/AddAGame/AddAGame'
import LobbyList from './pages/LobbyList/LobbyList'
import EditALobby from './pages/EditALobby/EditALobby'





const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [lobby, setLobby] = useState([])
  
  useEffect(()=>{
    if(user){
      lobbyService.getAllLobby()
      .then(allLobby => setLobby(allLobby))
    }
}, [user])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  function handleCreateLobby(newLobby) {
    lobbyService.createLobby(newLobby)
      .then(lobby => {
        navigate('/')
      })
      .catch(navigate('/'))
  }

  const handleDeleteLobby = id => {
    lobbyService.deleteOneLobby(id)
    .then(deleteOneLobby => setLobby(lobby.filter(lobby => lobby._id !== deleteOneLobby._id)))
  }


  function handleEditLobby() {
    console.log('Connected!')
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} lobby={lobby} handleDeleteLobby={handleDeleteLobby} /> } />
        <Route path="/" element={<Landing user={user} lobby={lobby}/>} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin}  />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin} /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-lobby"
          element={user ? < MakeALobby handleCreateLobby={handleCreateLobby} /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-lobby"
          element={user ? < EditALobby handleEditLobby={handleEditLobby} /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-game"
          element={user ? < AddAGame /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  )
}


export default App
