import { useEffect, useState } from "react";
import api from '../../services/posts';
import * as Icons from "../../icons";
import DeleteModel from "../Modal/DeleteModel";
import EditContract from "../Modal/EditContract";
import Succes from "../Alert/Succes";
import Danger from "../Alert/Danger";
import axiosClient from "../../axios-client";
import useRights from "../hooks/useRights";








export default function Contracts(){
    const [reloaded, setReloaded] = useState(false);
    const [contracts, setContracts] = useState('');
    const [succes, setSucces] = useState(null);
    const [echec, setEchec] = useState(null);
    const token = localStorage.getItem('apiToken');
    const [message, setMessage] = useState('');
    const [beneficiaryType, setBeneficiaryType] = useState('');
    const [filteredContracts, setFilteredContracts] = useState('');
    const {createRight, updateRight, deleteRight} = useRights();
    useEffect(() => {
        const fetchContracts = async () =>{
           
            axiosClient.get('/v1/contracts').then((response => setContracts(response.data))).catch(error => {
                    console.error('An error occurred while show the contracts. Please try again later.');
                });
                
            
        }
      
        fetchContracts(); 
        
    },[reloaded]);

    useEffect(() => {
        if(contracts){
         const result =(beneficiaryType != '') ? contracts.filter(contract => contract.beneficiary_Type === beneficiaryType) : contracts;
         setFilteredContracts(result);
        }
    },[beneficiaryType, contracts])
    
    function Icon({icon, ...props}){
        Icon = Icons[icon];
        return <Icon {...props}/>
    }

    const contractSucces = () => {
        setSucces(!succes)
    }

    const contractEchec = () => {
        setEchec(!echec)
    }

  

    const reload = (type) => {
            
        switch (type) {
         case 'add':
           setMessage("Contract ajouter avec succes.");
           setSucces(true);
           setReloaded(!reloaded);
           break;
         case 'edit':
           setMessage("Contract modifier avec succes.");
           setSucces(true);
           setReloaded(!reloaded);
           break;
         case 'delete':
           setMessage("Contract Supprimer avec succes.");
           setSucces(true);
           setReloaded(!reloaded);
           break;
         case 'error':
            setMessage("Une erreur s'est produite lors de la mise à jour de la correspondance. Veuillez réessayer plus.");
            setEchec(true);
            break;  
       }
     }    

   
    return (
    <>    
        <div className="ml-64 relative w-auto mr-4    ">
            <div className=" my-4   flex justify-center  ">
                <button type="button" onClick={() => setBeneficiaryType('player')} className={ beneficiaryType === 'player' ?  "px-4 py-2 text-sm font-medium  bg-white border border-gray-200 rounded-l-lg z-10 ring-2 ring-blue-700 text-blue-700" : "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 "}>
                    Joueur
                </button>
                <button type="button" onClick={() => setBeneficiaryType('')} className={beneficiaryType === '' ?  "px-4 py-2 text-sm font-medium  bg-white border-t border-b border-gray-200  z-10 ring-2 ring-blue-700 text-blue-700 " :"px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 "}>
                    Tout
                </button>
                <button type="button" onClick={() => setBeneficiaryType('staff')} className={beneficiaryType === 'staff' ? " px-4 py-2 text-sm font-medium  bg-white border border-gray-200 rounded-r-md  z-10 ring-2 ring-blue-700 text-blue-700" : "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700  " }>
                    Personnel
                </button>
            </div>
        <table className="w-full rounded-lg text-sm text-left text-gray-500   ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 {dark}:bg-gray-700 {dark}:text-gray-400">
                <tr>
                    {/* <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 {dark}:focus:ring-blue-600 {dark}:ring-offset-gray-800 {dark}:focus:ring-offset-gray-800 focus:ring-2 {dark}:bg-gray-700 {dark}:border-gray-600" />
                            <label for="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                    </th> */}
                    <th scope="col" className="px-6 py-3">
                        Nom
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Debut 
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Fin
                    </th>
                    <th scope="col" className="px-6 py-3">
                       Salary
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Edite
                </th>
                </tr>
            </thead>
           
            <tbody >
            { filteredContracts.length > 0 ?(
                filteredContracts.map(contract =>(
                <tr key={contract.id} className="bg-white border-b {dark}:bg-gray-800 {dark}:border-gray-700 hover:bg-gray-50 {dark}:hover:bg-gray-600">
                    
                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap {dark}:text-white">
                        <div className="pl-3">
                            <div className="text-base font-semibold">{contract.name}</div>
                        </div>  
                    </th>
                    <td className="px-6 py-4">
                        {contract.start_Date}
                    </td>
                    <td className="px-6 py-4">
                        {contract.end_Date}
                    </td>
                    <td className="px-6 py-4">
                    {contract.salary}
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                             {contract.type}
                        </div>
                    </td>
                    <td className="px-6 py-4 inline-flex">
                    {updateRight && <EditContract contract={contract} reload={reload} />}
                    {deleteRight && <DeleteModel model='contracts' id={contract.id} reload={reload} />}
                    </td>
                </tr>
                ))
              
           
             ) : ( <tr><td> Loading  </td></tr>)
         }
        </tbody>
        </table>
    </div>
    { succes ? 
        <Succes succes={contractSucces} msg={message} />
    : null}
    {echec ? 
        <Danger msg={message} echec={contractEchec}/>
    : null}
    </>
    )
}