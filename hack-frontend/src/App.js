import './App.css';
import Login from './pages/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import PrivateRoute from './Routes/Private';
import PublicRoute from './Routes/Public';
import Dashboard from './pages/Dashboard/Dashboard';
import BugDetail from './pages/BugDetail/BugDetail';
import Team from './pages/Team/Team';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute component={Login}/>} />
      <Route path="/signup" element={<PublicRoute component={Signup}/>} />
      <Route path="/" element={<PrivateRoute component={Dashboard}/>} />
      <Route path="/track/:id" element={<PrivateRoute component={BugDetail}/>} />
      <Route path="/team" element={<PrivateRoute component={Team}/>} />
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
  );
}

export default App;
