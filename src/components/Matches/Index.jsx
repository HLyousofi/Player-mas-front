import { useEffect, useState} from "react"
import api from '../../services/posts';
import * as Icons from "../../icons";
import { useLocation, Link} from "react-router-dom";
import EditMatche from "../Modal/EditMatche";
import Succes from "../Alert/Succes";
import Danger from "../Alert/Danger";
import DeleteModel from "../Modal/DeleteModel";
import useRights from "../hooks/useRights";
import axiosClient from "../../axios-client";



export default function Index(props){
    const location = useLocation();
    const [matches, setMatches] = useState(0);
    const [reloaded, setReloaded] = useState(false);
    const [succes, setSucces] = useState(location?.state?.login);
    const [echec, setEchec] = useState(null);
    const [message, setMessage] = useState(location?.state?.message);
    const {createRight, updateRight, deleteRight} = useRights();
    
        
        useEffect(() => {
            fetchMatches(); 
        
        }, [reloaded, createRight, updateRight, deleteRight]);

        const fetchMatches = async () =>{
                axiosClient.get('v1/matches/').then((response => setMatches(response.data))).catch(error => {
                    console.error('An error occurred while show the matchs. Please try again later.');
                })
        }

        const reload = (type) => {
            
           switch (type) {
            case 'add':
              setMessage("Matche ajouter avec succes.");
              setSucces(true);
              setReloaded(!reloaded);
              break;
            case 'edit':
              setMessage("Matche modifier avec succes.");
              setSucces(true);
              setReloaded(!reloaded);
              break;
            case 'delete':
              setMessage("Matche Supprimer avec succes.")
              setSucces(true);
              setReloaded(!reloaded);
              break;
            case 'error':
                setMessage("Une erreur s'est produite lors de la mise à jour de la correspondance. Veuillez réessayer.");
                setEchec(true);
               break;  
          }
           
        }    

        const matcheSucces = () => {
            setSucces(!succes)
        }
        
        const matcheEchec = () => {
            setEchec(!echec)
        }

        function Icon({icon, ...props}){
            Icon = Icons[icon];
            return <Icon {...props}/>
        }

       

    
    return (
    <>
    <div className="ml-64 relative w-auto mr-4 ">
        
         <div className="flex justify-end my-5">
            {/* <AddMatche  reload={reload}  /> */}
            {createRight  && <EditMatche add={true}  reload={reload} teamId={1} />  }
        </div>
        
        
        <table className="w-full text-sm text-left text-gray-500  border-collapse ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 {dark}:bg-gray-700 {dark}:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Equipe 1
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Equipe 2
                    </th>
                    <th scope="col" className="px-6 py-3">
                        League
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                    
                </tr>
            </thead>
        
            <tbody >
            { matches.length > 0 ?(
                matches.map(matche =>(
                <tr key={matche.id} className="bg-white border-b {dark}:bg-gray-800 {dark}:border-gray-700 hover:bg-gray-50 {dark}:hover:bg-gray-600">
                    
                
                    <td className="px-6 py-4">
                        {matche.name}
                    </td>
                    <td className="px-6 py-4">
                        {matche.adv_Name}
                    </td>
                    <td className="px-6 py-4">
                        {matche.league}
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                            {matche.matche_Date}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                            {matche.type == 'away' ? 'à l’extérieur': 'à domicile' }
                        </div>
                    </td>
                    <td className="px-6 py-4 inline-flex">
                        {updateRight  && <EditMatche edit ={true} matche={matche} reload={reload} /> }
                        <Link to={'/Matches/'+matche.id}><Icon className="w-5 h-5 ml-1" aria-hidden="true" icon='AddIcon' /></Link>   
                        <Icon className="w-5 h-5 ml-1" aria-hidden="true" icon='StaticsIcon' /> 
                        {deleteRight && <DeleteModel model='matches' id={matche.id} reload={reload} />}

                    </td>
                </tr>
                ))
            
        
            ) : ( <tr><td> Loading  </td></tr>)
        }
        </tbody>
        </table>
        
    </div>
    { succes ? 
        <Succes succes={matcheSucces} msg={message} />
    : null}
    {echec ? 
        <Danger msg={message} echec={matcheEchec}/>
    : null}
    </>

    )
}