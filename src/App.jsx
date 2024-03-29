//import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';

import IndexRoute from './routes/index/index.route';
import DashboardRoute from './routes/dashboard/dashboard.route';
import RegisterRoute from './routes/register/register.route';
import LoginRoute from './routes/login/login.route';
import OtpRoute from './routes/otp/otp.route';
import FpForm from './components/login/components/ForgotPasswordForm';
import Poster from './components/movieposter/poster';
import DashHeader from './components/dashboard/header';
import Video from './components/player/Video';

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<IndexRoute/>} />
      <Route path='login' element={<LoginRoute />} />
      <Route path='register' element={<RegisterRoute />} />
      <Route path='xxxx' element={<DashboardRoute />} />
      <Route path='otp' element={<OtpRoute/>} />
      <Route path='forgotpassword' element={<FpForm/>}/>
      <Route path='poster' element={<Poster />} />
      <Route path='dashboard' element= {<DashHeader />}/>
      <Route path='player' element={<Video/>}/>
    </Routes>
  );
}

export default App;