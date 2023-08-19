import { useEffect, useState} from "react"
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AddPlayer from "../Modal/AddPlayer";
import EditPlayer from "../Modal/EditPlayer";
import Succes from "../Alert/Succes";
import Danger from "../Alert/Danger";
import * as Icons from "../../icons";
import DeleteModel from "../Modal/DeleteModel";
import axiosClient from "../../axios-client";
import useRights from "../hooks/useRights";



export default function Index(props){
    const [dark, setDark] = useState(false);
    const [players, setPlayers] = useState(0);
    const [reloaded,setReloaded] = useState(false);
    const [succes, setSucces] = useState(null);
    const [echec, setEchec] = useState(null);
    const [message, setMessage] = useState('');
    const {createRight, updateRight, deleteRight} = useRights();

    const { user, token } = useAuth();
    const fetchPlayers = async () =>{
  
        axiosClient.get('/v1/players').then((response => setPlayers(response.data))).catch(error => {
                console.error('An error occurred while show the players. Please try again later.');
            });
     }

            
    useEffect(() => {
    fetchPlayers(); 
    
    },[reloaded]);

    function Icon({icon, ...props}){
        Icon = Icons[icon];
        return <Icon {...props}/>
    }

    const age = (a) => {
        const today = new Date();
        const birthDate = new Date(a);
        const age_now = today.getFullYear() - birthDate.getFullYear();
        return age_now;

    }

    const playerSucces = () => {
        setSucces(!succes)
    }


    const playerEchec = () => {
        setEchec(!echec)
    }


            const reload = (type) => {
               //type == 'edit' ? setEditSucces(true) : setAddSucces(true);
               switch (type) {
                case 'add':
                  setMessage("Player ajouter avec succes.");
                  setSucces(true);
                  setReloaded(!reloaded);
                  break;
                case 'edit':
                  setMessage("Player modifier avec succes.");
                  setSucces(true);
                  setReloaded(!reloaded);
                  break;
                case 'delete':
                  setMessage("Player Supprimer avec succes.");
                  setSucces(true);
                  setReloaded(!reloaded);
                  break;
                case 'error':
                setMessage("Une erreur s'est produite lors de la mise à jour de la correspondance. Veuillez réessayer.");
                setEchec(true);
                break;  
              }
                
            }
 
           

    
    return (
    <>
        <div className=" ml-64 relative w-auto mr-4 ">
            <div className="flex justify-end my-5">
                  {createRight && <AddPlayer  reload={reload}/>}
            </div>
        
            
            <table className="w-full rounded-lg text-sm text-left text-gray-500   ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 {dark}:bg-gray-700 {dark}:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nom
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Position
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Numero
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Age
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Adresse
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Telephone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
            
                <tbody >
                { players.length > 0 ?(
                    players.map(player =>(
                    <tr key={player.id} className="bg-white border-b {dark}:bg-gray-800 {dark}:border-gray-700 hover:bg-gray-50 {dark}:hover:bg-gray-600">
                        
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap {dark}:text-white">
                            <div className="pl-3">
                                <div className="text-base font-semibold">{player.name}</div>
                                <div className="font-normal text-gray-500">{player.mail}</div>
                            </div>  
                        </th>
                        <td className="px-6 py-4">
                            {player.position}
                        </td>
                        <td className="px-6 py-4">
                            {player.number}
                        </td>
                        <td className="px-6 py-4">
                            {age(player.birth_day)}
                        </td>
                        <td className="px-6 py-4">
                        {player.adress}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                {player.phone}
                            </div>
                        </td>
                        <td className="px-6 py-4 inline-flex">
                        {updateRight && <EditPlayer player={player} reload={reload} /> } 
                        {deleteRight && <DeleteModel model='players' id={player.id} reload={reload} />}
                        </td>
                    </tr>
                    ))
                
            
                ) : ( <tr><td> Loading  </td></tr>)
            }
            </tbody>
            </table>
        </div>
        { succes ? 
            <Succes succes={playerSucces} msg={message} />
        : null}
        {echec ? 
            <Danger msg={message} echec={playerEchec}/>
        : null}
    </>    
    )
}