import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './components/Context/AuthProvider';
import { RightsProvider } from './components/Context/RightsProvider';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <>


        

        <AuthProvider>
            <RightsProvider>
                    <Router>
                        <Routes>
                            <Route path='/*' element={<App />} />
                        </Routes>
                    </Router>
            </RightsProvider>
      </AuthProvider>
    </>
    
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

