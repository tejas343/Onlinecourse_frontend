import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import Navigation from './Component/Navigation';
import Studentlogin from './Component/Studentlogin';
import TeacherRegister from './Component/TeacherRegister';
import StudentRegister from './Component/StudentRegister';
import Teacherlogin from './Component/Teacherlogin';

ReactDOM.render(
  <React.StrictMode>
    <StudentRegister/>

  </React.StrictMode>,
  document.getElementById('root')
);
//hi

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
