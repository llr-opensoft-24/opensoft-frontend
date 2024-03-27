//import './App.css';
import { Route, Routes } from 'react-router-dom';

import IndexRoute from './routes/index/index.route';
import DashboardRoute from './routes/dashboard/dashboard.route';
import RegisterRoute from './routes/register/register.route';
import LoginRoute from './routes/login/login.route';
import OtpRoute from './routes/otp/otp.route';
import FpForm from './components/login/components/ForgotPasswordForm';

const App = () => {


  return (
    <Routes>
      <Route path="/" element={<IndexRoute/>} />
      <Route path='login' element={<LoginRoute />} />
      <Route path='register' element={<RegisterRoute />} />
      <Route path='dashboard' element={<DashboardRoute />} />
      <Route path='otp' element={<OtpRoute/>} />
      <Route path='forgetpassword' element={<FpForm/>}/>
    </Routes>
  );
}

export default App;
