import { Route, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage/AdminPage'
import HomePage from './pages/HomePage/HomePage'

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/admin' element={<AdminPage />}></Route>
      </Routes>

    </>
  )
}

export default App
