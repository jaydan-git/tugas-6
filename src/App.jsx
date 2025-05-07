import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Users from './pages/Users'
import UserAdd from './pages/UserAdd'
import UserEdit from './pages/UserEdit'
import UserDetail from './pages/UserDetail'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/add" element={<UserAdd />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/user/:id/edit" element={<UserEdit />} />

          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
