
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { useState } from "react";
import Header from "./Sidebar/Header";
import useAuth from "./hooks/useAuth";




export default function Layout(){

   
   const {user} = useAuth();
    return(
        <>
            
            <div  className="h-screen bg-gray-200 overflow-y-auto">
                <Header   user={user}/>
                <Sidebar />
                <Outlet />
            </div>
        </>

    




    );

}