import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/posts';
import useAuth from "../hooks/useAuth";
import Danger from "../Alert/Danger";
import axiosClient from "../../axios-client";



export default function  UserForm(){

    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [echec, setEchec] = useState(false);
    const [dark, setDark] = useState(false);
    const [create, setCreate] = useState(false);
    const [update, setUpdate] = useState(false);
    const [rm, setRm] = useState(false);
    const [none, setNone] = useState(false);
    const [right, setRight] = useState([]);
     
    let x = [];


   
    const navigate = useNavigate()

    const userEchec = () => {
        setEchec(!echec);
    }

    const [user, setUser] = useState({
        id : null,
        name : '',
        email : '',
        password : '',
        password_confirmation : '' ,
        right : []

    });

    const [userError, setUserError] = useState({
        name : false,
        email : false,
        password : false,
        password_confirmation : false 

    })

    const nonRights = () => {
        setCreate(false);
        setRm(false);
        setUpdate(false);
        setNone(!none);

    }

   
    useEffect(() => {
        if(id){
            getUser();
        }

    }, []);

    useEffect(() => {
        if(create == false && update == false && rm == false) setNone(true);
        else setNone(false);
        createRights();
        
    },[create, update, rm, none])

    const getUser = async () =>{
        setLoading(true);
       
    try{
        axiosClient.get(`/v1/users/${id}`).then((response) =>{
             setLoading(false);
             setUser(response.data.data);
             (response.data.data.right).forEach(right => {
                switch (right) {
                    case  'create' :
                        setCreate(true);
                        break;
                    case  'update' :
                        setUpdate(true);
                        break;
                    case  'delete' :
                        setRm(true);
                        break;
                    case  'none' :
                        setNone(true);
                         break;

                } 
             });
             
            }).catch(error => {
            console.error('An error occurred while show the players. Please try again later.');
            setLoading(false);
        });
        
        }catch(err){
            console.log('ERROR',err.message);
        }
        
    }

    const  createRights = () =>{
     
        let x = [];
            if(none) x.push('none');
            if(create) x.push('create');
            if(update) x.push('update');
            if(rm) x.push('delete');
           setUser({...user,right : x})
       
         };


    const onSubmit = (ev, props) => {
        ev.preventDefault();
        if(user.id){
            
                axiosClient.put(`/v1/users/${id}`, user).then(() =>{
                    navigate('/Users',{state : {succes :true, msg : " Utilisateur modifier avec succes."}});
                }).catch(err => {
                    setMessage(err.message);
                    userEchec();
                    console.log('ERROR',err.message);
                
                })
        }
        else{
            axiosClient.post(`/v1/users`, user).then(() =>{
                     
                navigate('/Users',{state : {succes :true, message : " Utilisateur ajouter avec succes."}});
            
            }).catch(err => {
                setMessage(err.message);
                userEchec();
                console.log('ERROR',err.message);
            })

        }
        

    }


return(
<>
    <div className="  relative sm:ml-64 mr:0 ml-0 w-auto mr-4   mt-12 ">
    
        <div className="mx-32 p-8  ">

            {!user.id && <h3 className="mb-4 text-xl font-medium text-gray-900 {dark}:text-white" >Nouvel utilisateur</h3>}
            {user.id && <h3 className="mb-4 text-xl font-medium text-gray-900 {dark}:text-white" >Modifier utilisateur : {user.name}</h3>}
            {echec ? 
            <Danger msg={message} echec={userEchec} flx={true} />
            : null}
            <div className="bg-white  px-16 py-6 rounded">
                
                <form  onSubmit={onSubmit} >
                <div className="mb-6 ">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 {dark}:text-white">Nom :</label>
                    <input type="text" value={user.name} onChange={ev => setUser({...user, name : ev.target.value})}  className={userError.name == false ? "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 {dark}:bg-gray-700 {dark}:border-gray-600 {dark}:placeholder-gray-400 {dark}:text-white {dark}:focus:ring-blue-500 {dark}:focus:border-blue-500 {dark}:shadow-sm-light" : "shadow-sm bg-gray-50 border border-red-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 {dark}:bg-gray-700 {dark}:border-gray-600 {dark}:placeholder-gray-400 {dark}:text-white {dark}:focus:ring-blue-500 {dark}:focus:border-blue-500 {dark}:shadow-sm-light"   }/>
                </div>
                <div className="mb-6 ">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 {dark}:text-white">Email</label>
                    <input type="email" id="email" value={user.email} onChange={ev => setUser({...user, email : ev.target.value})} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 {dark}:bg-gray-700 {dark}:border-gray-600 {dark}:placeholder-gray-400 {dark}:text-white {dark}:focus:ring-blue-500 {dark}:focus:border-blue-500 {dark}:shadow-sm-light" placeholder="name@flowbite.com"  />
                </div>
                <div className="mb-6">
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 {dark}:text-white">Mot de passe</label>
                    <input type="password" id="password" onChange={ev => setUser({...user, password : ev.target.value})} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 {dark}:bg-gray-700 {dark}:border-gray-600 {dark}:placeholder-gray-400 {dark}:text-white {dark}:focus:ring-blue-500 {dark}:focus:border-blue-500 {dark}:shadow-sm-light"  />
                </div>
                <div className="mb-6 ">
                    <label for="repeat-password"  className="block mb-2 text-sm font-medium text-gray-900 {dark}:text-white">Confirmer votre mot de passe</label>
                    <input type="password" id="repeat-password" onChange={ev => setUser({...user, password_confirmation : ev.target.value})} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 {dark}:bg-gray-700 {dark}:border-gray-600 {dark}:placeholder-gray-400 {dark}:text-white {dark}:focus:ring-blue-500 {dark}:focus:border-blue-500 {dark}:shadow-sm-light"  />
                </div>
                <h3 className="mb-4 font-semibold text-gray-900 ">Droits</h3>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex  ">
                   
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
                        <div className="flex items-center pl-3">
                            <input id="react-checkbox-list" type="checkbox" value="add"  checked={create} onChange={(ev) => {setCreate(!create);setNone(false);}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  " />
                            <label for="react-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">Ajouter</label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
                        <div className="flex items-center pl-3">
                            <input id="angular-checkbox-list" type="checkbox" value="update" checked={update} onChange={() => {setUpdate(!update);setNone(false)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  " />
                            <label for="angular-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">Modifier</label>
                        </div>
                    </li>
                    <li className="w-full ">
                        <div className="flex items-center pl-3">
                            <input id="laravel-checkbox-list" type="checkbox" value="delete" checked={rm} onChange={() => {setRm(!rm);setNone(false)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  " />
                            <label for="laravel-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">Supprimer</label>
                        </div>
                    </li>
                     <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
                        <div className="flex items-center pl-3">
                            <input id="vue-checkbox-list" type="checkbox" value="" checked={none} onChange={() => nonRights()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  " />
                            <label for="vue-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">Aucun</label>
                        </div>
                    </li>
                </ul>

                <button type="submit" className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Enregistrer</button>
                </form>
            </div>
        </div>
        
    </div>

 </>
        
    )

}