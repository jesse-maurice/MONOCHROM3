import './App.css';

import {
  Route,
  Routes,
} from 'react-router-dom';

import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Main from './components/Main';
import Upload from './components/Upload';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Upload" element={<Upload />} />
    </Routes>
  );
}

export default App
