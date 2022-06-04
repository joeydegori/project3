import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import NavBar from './components/NavBar';

//pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';

//providers
import { UserProvider } from './contexts/UserContext';
import { LikeProvider } from './contexts/LikeContext';
// import ProtectedRoute from './routeGuard/ProtectedRoute';
// import AdminRoute from './routeGuard/AdminRoute';

const App = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <LikeProvider>
                    <div className='App'>
                        <NavBar />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='login' element={<Login />} />
                            <Route path='profile' element={<Profile />} />
                        </Routes>
                    </div>
                </LikeProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
