import { useState } from "react";
import * as Icons from "../../icons";
import api from '../../services/posts';
import { useEffect } from "react";
import moment from "moment/moment";






function EditPlayer (props){
       
    
    const [showEditPlayer , setShowEditPlayer] = useState(false);
    const [teamName, setTeamName] = useState('');
    const token = localStorage.getItem('apiToken');
    const [player, setPlayer] = useState({
                    teamId : 1,
                    name : '',
                    position : '',
                    birthDay : '',
                    adress : '',
                    phone : '',
                    mail : '',
                    number : ''
    });

    useEffect(() => {
        const setPlayerValues = (props) => {
            setPlayer(prevState => ({
                ...prevState,
                id : props.player.id,
                name : props.player.name,
                position : props.player.position,
                birthDay : moment(props.player.birthDay).format("YYYY-MM-DD"),
                adress : props.player.adress,
                phone : props.player.phone,
                mail : props.player.mail,
                number : props.player.number

            }))
        };
        
        setPlayerValues(props);

        },[props.player,showEditPlayer]);
        

        const [playerError, setPlayerError] = useState({
                    name : false,
                    position : false,
                    birthDay : false,
                    adress : false,
                    phone : false,
                    mail : false,
                    number : false
        })

           

            const setName = (e) => {
                setPlayer(prevState => ({
                    ...prevState,
                    name :  e.target.value
                }));
            };

            const setPosition = (e) => {
                setPlayer(prevState => ({
                    ...prevState,
                    position :  e.target.value
                }));
            };

            const setBirthDay = (e) => {
                setPlayer(prevState => ({
                    ...prevState,
                    birthDay :  e.target.value
                }));
            }

            const setAdress = (e) => {
                setPlayer(prevState => ({
                    ...prevState,
                    adress :  e.target.value
                }));
            };

            const setPhone = (e) => {
                setPlayer(prevState => ({
                    ...prevState,
                    phone :  e.target.value
                }));
            };
            const setMail = (e) => {
                setPlayer(prevState => ({
                    ...prevState,
                    mail :  e.target.value
                }));
            };

            const setNumber = (e) => {
                setPlayer(prevState => ({
                    ...prevState,
                    number :  e.target.value
                }));
            };

            

            const save = () => {
                console.log(player)
                let isValid = true;
                Object.entries(player).forEach(([key, value]) => {
                    if(value === '' ){
                        isValid = false;
                        setPlayerError(prevState => ({
                            ...prevState,
                            [key] : true
                        }))
                        
                    }else {
                        setPlayerError(prevState => ({
                            ...prevState,
                            [key] : false
                        }))
                        
                    }
                
                });
                
                if(isValid === false){
                
                return ;
                } else {
                savePlayer();
                }
            
            }

            const savePlayer = () => {
            
                const  config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                    try{
                        api.put('/v1/players/'+player.id ,player , config).then(
                            (response) =>{
                                props.reload('edit');
                                reset();
                            }).catch(error => {
                                console.error('An error occurred while show the matchs. Please try again later.');
                                setShowEditPlayer(false);
                                props.reload('error');
                            });
                        
                    }catch(err){
                        console.log('ERROR',err.message);
                        
                    }
            }


            const reset = () => {
                Object.entries(player).forEach(([key, value]) => {
                    const val =(key == 'teamId') ? 1 : '';
                        setPlayer(prevState => ({
                        ...prevState,
                        [key] : val
                        
                    }))
                });

                Object.entries(playerError).forEach(([key, value]) => {
                    setPlayerError(prevState => ({
                        ...prevState,
                        [key] : false
                    }))
                });
                setShowEditPlayer(false);
            }


            
        

            function Icon({icon, ...props}){
                Icon = Icons[icon];
                return <Icon {...props}/>
            }

    return (
        <>
        <button onClick={() => setShowEditPlayer(true)}><Icon className="w-5 h-5 " aria-hidden="true" icon='EditIcon'  /></button>
        {showEditPlayer ? (
             <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
             <div className="w-[60%] bg-white">
                 <div className="px-6 py-6 lg:px-8">
                     <h3 className="mb-4 text-xl font-medium text-gray-900 ">Nouveau Joueur</h3>
                     <form className="space-y-6" action="#">
                         <div className="flex">
                             <div className="flex-initial w-[45%]">
                                 <label htmlFor="email"  className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Nom</label>
                                 <input type="text" onChange={setName} value={player.name} className={playerError.name === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' }/>
                             </div>
                             <div className=" flex-initial w-[45%] ml-[10%]">
                                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Date de naissance</label>
                                 <input type="date" onChange={setBirthDay} value={ player.birthDay} className={playerError.birthDay === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' }  />
                             </div>
                         </div>
                         <div className="flex">
                             <div className="flex-initial w-[45%]">
                                 <label htmlFor="email"  className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Adress</label>
                                 <input  id="text" onChange={setAdress} value={player.adress} className={playerError.adress === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' }   />
                             </div>
                             <div className=" flex-initial w-[45%] ml-[10%]">
                                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                 <input type="email" onChange={setMail} value={player.mail}  className={playerError.mail === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' }  />
                             </div>
                         </div>
                         <div className="flex">
                             <div className="flex-initial w-[45%]">
                                 <label htmlFor="email"  className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Contact </label>
                                 <input type="text" onChange={setPhone} value={player.phone} className={playerError.phone === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                             </div>
                             <div className=" flex-initial w-[45%] ml-[10%]">
                                     <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Position</label>
                                     <select id="underline_select" onChange={setPosition} value={player.position} className={playerError.position === false ? 'block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none' : 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-500 appearance-none '}>
                                         <option value="">Choisir la position</option>
                                         <option value="G">Gardien</option>
                                         <option value="D D">Défenseur Droit</option>
                                         <option value="D G">Défenseur Gauche</option>
                                         <option value="D C">Défenseur Central</option>
                                         <option value="MD G">Milieu Défensif Gauche</option>
                                         <option value="MD D">Milieu Défensif Droit</option>
                                         <option value="MD C">Milieu Défensif Central</option>
                                         <option value="M G">Milieu Gauche</option>
                                         <option value="M D">Milieu Droit</option>
                                         <option value="M C">Milieu Central</option>
                                         <option value="MO G">Milieu Offensif Gauche</option>
                                         <option value="MO D">Milieu Offensif Droit</option>
                                         <option value="MO A">Milieu Offensif Axial</option>
                                         <option value="A G">Attaquant Gauche</option>
                                         <option value="A D">Attaquant Droit</option>
                                         <option value="A A">Attaquant Axial</option>
                                     </select>
                             </div>
                         </div>
                         <div className="flex">
                            <div className="flex-initial w-[45%]">
                                <label htmlFor="email"  className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Numero </label>
                                <input type="number" onChange={setNumber} value={player.number} className={playerError.number === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                            </div>
                          </div>
                         <button type="button" onClick={reset} className="inline-block rounded ml-[70%] bg-neutral-500 from-neutral-500 via-neutral-600 to-neutral-700 hover:bg-gradient-to-br  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                             Annuler
                         </button>
                         <button type="button" onClick={save} className="inline-block rounded ml-6 bg-green-500 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                             Enregistrer
                         </button>
                     
                     </form>
                 </div>
                 
             </div>
         </div>
            
        ): null}
        
        </>
    )









}

export default EditPlayer;