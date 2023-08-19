import {useRef, useState, useEffect } from 'react';
import login from '../../services/login';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Danger from '../Alert/Danger';
import useRights from '../hooks/useRights';




export default function Login(){

   
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const { setToken, setUser, token } = useAuth();
    const {setCreateRight, setUpdateRight, setDeleteRight, setRole} = useRights();
    const [echec, setEchec] = useState(false);
    const navigate = useNavigate();
    const echecConnexion = () => {
        setEchec(true);
    }
    useEffect(()=> {
        if(token){
            navigate('/Matches');
        }

    })
   

    
   
    const handleLogin = async (event) => {
        event.preventDefault();
            login({email:email,password : pwd}).then( function(res){
                if(!res){
                    setErrMsg("Désolé, nous rencontrons actuellement des problèmes avec nos serveurs, ce qui affecte notre page de connexion.");
                    echecConnexion();
                }else if(res.data.succes === false){
                    setErrMsg('Votre mot de passe est incorrect. Veuillez le vérifier.');
                    echecConnexion();
                }else if( res.data.succes === true){
                    setToken( res.data.accessToken);
                    setUser( res.data.name);
                    localStorage.setItem('role', res.data.role);
                    res.data.rights.forEach(right => {
                        if(right == "create") {setCreateRight(true);localStorage.setItem('createRight', true)};
                        if(right == "update") {setUpdateRight(true);localStorage.setItem('updateRight', true)};
                        if(right == "delete") {setDeleteRight(true);localStorage.setItem('deleteRight', true)};
                    });
                    navigate('/Matches',{state : {login :true, message : " Vous êtes maintenant connecté à votre compte."}});
                    setEmail('');
                    setPwd('');
                
                }
            });
    }


    return(
        
        <div className="  w-full h-screen  bg-gray-200">
             
            <div className=" mx-auto px-[36%] pt-[14%] ">
            { echec ? 
                    <Danger msg={errMsg} echec={echecConnexion} flx={true} />
             : ''} 
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col ">
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                            Email
                            </label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)}  className="shadow  border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" required />
                        </div>
                        <div className="mb-6">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                            Mot de passe
                            </label>
                            <input value={pwd} onChange={(e) => setPwd(e.target.value)} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-800 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="submit">
                            Se connecter
                            </button>
                            <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
                            Mot de passe oublier?
                            </a>
                        </div>
                    </form>
                </div>
            </div> 
        </div>   
    
    
    )
}