
import * as Icons from "../../icons"
import { Link, useLocation } from "react-router-dom";
import routes from "../Routes/menuRoutes";
import { useState, useEffect } from "react";



   
  export default function Sidebar() {
    const location = useLocation();
    const role = localStorage.getItem('role');
    

    function Icon({icon, ...props}){
        Icon = Icons[icon];
        return <Icon {...props}/>
    }

    function getStringBetweenSlashes(str) {
        const regex = /\/(.*?)\//;
        const match = str.match(regex);
        return match ? match[1] : null;
      }

  

      
        
   
    return (
       

    <aside id="sidebar-multi-level-sidebar" className="fixed top-0 bg-gray-900  z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto  ">
            <span className="mx-2 text-2xl pt-11  font-semibold text-white">Player-MAS</span>
            <ul className="space-y-2 font-medium pt-32">
               
                {routes.map((r, index) => {

                if(role != "admin" && r.name == "Users") return;

                return (    
                    <li key={index} >
                        <Link to={r.path} className={"flex items-center p-2 rounded-lg  hover:text-gray-100 hover:bg-gray-800 " + ((r.path === location.pathname || r.path.slice(1) === getStringBetweenSlashes(location.pathname))  ? 'text-gray-100 bg-gray-800':'text-gray-500 ')}>
                        <Icon className="w-5 h-5" aria-hidden="true" icon={r.icon} />
                        <span className="flex-1 ml-3 whitespace-nowrap">{r.name}</span>
                        </Link>
                    </li>
                )})}
                
            </ul>
        </div>
    </aside>

        
        
    
    );
  }