import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import LoginContainer from './pages/Login/LoginContainer'
import MainPage from './pages/Main/MainPage'
import PrivateRouter from './router/PrivateRouter'
import Notification from './components/Notification/Notification'

function App() {
	return (
		<div className='app'>
			<Routes>
				<Route element={<PrivateRouter />}>
					<Route path='/*' element={<MainPage />} />
				</Route>
				<Route path='/login' element={<LoginContainer />} />
			</Routes>
			<ToastContainer />
			<Notification />
		</div>
	)
}

export default App
