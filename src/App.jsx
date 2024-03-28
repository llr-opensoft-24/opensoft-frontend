//import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';

import IndexRoute from './routes/index/index.route';
import DashboardRoute from './routes/dashboard/dashboard.route';
import RegisterRoute from './routes/register/register.route';
import LoginRoute from './routes/login/login.route';
import Poster from './components/movieposter/poster';

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<IndexRoute/>} />
      <Route path='login' element={<LoginRoute />} />
      <Route path='register' element={<RegisterRoute />} />
      <Route path='dashboard' element={<DashboardRoute />} />
      <Route path='poster' element={<Poster />} />


    </Routes>
  );
}

export default App;
