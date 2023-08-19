import { useEffect, useState} from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import * as Icons from "../../icons";
import DeleteModel from "../Modal/DeleteModel";
import Succes from "../Alert/Succes";
import Danger from "../Alert/Danger";
import axiosClient from "../../axios-client";


export default function Users(){
    const location = useLocation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {token} = useAuth();
    const [succes, setSucces] = useState(location?.state?.succes);
    const [echec, setEchec] = useState(location?.state?.echec);
    const [message, setMessage] = useState(location?.state?.msg);
    const [reloded, setReloaded] = useState(false);


    useEffect(() => {
        console.log(echec);
        getUsers();

    }, [reloded]);

    const reload = (type) => {
        if(type === 'delete'){
            setMessage("Utilisateur Supprimer avec succes.");
            setReloaded(!reloded);
            userSucces();
        }
        else if(type === 'error'){
            setMessage('Une erreur s est produite lors de la suppression. Veuillez réessayer plus tard.');
            userEchec();
        }
    }

    const userSucces = () => {
        setSucces(!succes);
    }

    const userEchec = () => {
        setEchec(!echec);
    }

    function Icon({icon, ...props}){
        Icon = Icons[icon];
        return <Icon {...props}/>
    }

    const getUsers = async () =>{
        setLoading(true);                
        axiosClient.get('/v1/users').then((response) =>{
             setLoading(false);
             setUsers(response.data.data)}).catch(error => {
            console.error('An error occurred while show the players. Please try again later.');
            setLoading(false);
        });
        
   
 }


    return (
        <>
        <div className="  relative ml-64 w-auto mr-4   ">
            <div className="flex justify-end my-5">
                   <Link className="inline-block rounded  bg-green-500 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] {this.state.dark}:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"  to="/Users/new">Ajouter</Link>
            </div>
        
            
            <table className="w-full rounded-lg text-sm text-left text-gray-500   ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 {dark}:bg-gray-700 {dark}:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            NOM  
                        </th>
                        <th scope="col" className="px-6 py-3">
                            email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            create_at
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                        
                    </tr>
                </thead>
            
                <tbody >
                { users.length > 0 ?(
                    users.map(user =>(
                    <tr key={user.id} className="bg-white border-b {dark}:bg-gray-800 {dark}:border-gray-700 hover:bg-gray-50 {dark}:hover:bg-gray-600">
                        
                    
                        <td className="px-6 py-4">
                            {user.id}
                        </td>
                        <td className="px-6 py-4">
                            {user.name}
                        </td>
                        <td className="px-6 py-4">
                        {user.email}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                {user?.created_at}
                            </div>
                        </td>
                        <td className="px-6 py-4 inline-flex">
                            <Link to={'/Users/'+user.id} ><Icon className="w-5 h-5 ml-1" aria-hidden="true" icon='EditIcon' /></Link>
                            <DeleteModel model='users' id={user.id} reload={reload} />
                        </td>
                    </tr>
                    ))
                
            
                ) : ( <tr><td> Loading  </td></tr>)
            }
            </tbody>
            </table>
        </div>
        { succes ? 
            <Succes succes={userSucces} msg={message}  />
        : null}
        {echec ? 
            <Danger msg={message} echec={userEchec}/>
        : null}
    </>    
        
    )


}