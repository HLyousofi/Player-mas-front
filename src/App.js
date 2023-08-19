
import React, { useEffect , useLocation} from "react";
import { Routes , Route } from "react-router-dom";
import { Imports } from "./components/Imports";



function App() {
    
    
    
  return (
                <Routes>
                    <Route path="/" element={<Imports.Login />} />
                    <Route element={<Imports.RequireAuth />}>
                        <Route element={<Imports.Layout />} >
                            <Route path="/LogoutModal" element={<Imports.LogoutModal />} /> 
                            <Route path="/Players" element={<Imports.Players />} /> 
                            <Route path="/Matches" element={<Imports.Matches />} />
                            <Route path="/Matches/:id" element={<Imports.SelectPlayer />} /> 
                            <Route path="/Staff" element={<Imports.Staff />} /> 
                            <Route path="/Contracts" element={<Imports.Contracts />} /> 
                            <Route path="/EditMatche" element={<Imports.EditMatche />} />
                            <Route path="/Users" element={<Imports.Users />} />
                            <Route path="/Users/new" key="userCreate" element={<Imports.UserForm />} />
                            <Route path="/Users/:id" key="userUpdate" element={<Imports.UserForm />} />
                        </Route>
                    </Route>
                </Routes>
    
  );
}

export default App;
