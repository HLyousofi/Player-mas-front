import {useState} from "react";
import api from '../../services/posts';
import * as Icons from "../../icons";
import axios from "axios";
 import axiosClient from "../../axios-client";






function AddMatche(props)  {

    const [showAddMatche , setShowAddMatche] = useState(false);
    const [name, setName] = useState('PSG');
    const [addEchec, setAddEchec] = useState(null);
    const [matche, setMatche] = useState({
        teamId : 1,
        advName : '',
        matcheDate : '',
        league : '',
        type : '',
    });

    const [matcheError, setMatcheError] = useState({
        advName : false,
        matcheDate : false,
        league : false,
        type : false
    })

    const setAdvName = (e) => {
        setMatche(prevState => ({
            ...prevState,
            advName :  e.target.value
        }));
    };

    const setMatcheDate = (e) => {
        setMatche(prevState => ({
            ...prevState,
            matcheDate :  e.target.value
        }));
    };

    const setLeague = (e) => {
        setMatche(prevState => ({
            ...prevState,
            league :  e.target.value
        }));
    }

    const setType = (e) => {
        setMatche(prevState => ({
            ...prevState,
            type :  e.target.value
        }));
    };

    const addMatche = () => {
        setShowAddMatche(true);
    }

    const echec = () => {
        setAddEchec(!addEchec);
    }


    

    const save = () => {
        let isValid = true;
        Object.entries(matche).forEach(([key, value]) => {
            if(value == '' ){
                isValid = false;
                setMatcheError(prevState => ({
                    ...prevState,
                    [key] : true
                }))
                
            }else {
                setMatcheError(prevState => ({
                    ...prevState,
                    [key] : false
                }))
                
            }
        
        });
        
        if(isValid === false){
        
        return ;
        } else {
        saveMatche();
        }
    
    }

    const saveMatche = () => {
       
        
                axiosC.post('/v1/matches' ,matche).then(
                    (response) =>{
                        props.reload('add');
                        reset();
                    }).catch(error => {
                        console.error('An error occurred while updating the match. Please try again later.');
                        setShowAddMatche(false);
                        props.reload('error');
                        });;
                }


    const reset = () => {
        Object.entries(matche).forEach(([key, value]) => {
            let val = '';
            val = (key === 'teamId') ? 1 : val;
                setMatche(prevState => ({
                ...prevState,
                [key] : val
                
            }))
        });

        Object.entries(matcheError).forEach(([key, value]) => {
            setMatcheError(prevState => ({
                ...prevState,
                [key] : false
            }))
        });
        setShowAddMatche(false);
    }



        return (
                <>
                <button onClick={addMatche} className="inline-block rounded  bg-green-500 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] {this.state.dark}:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]" >
                            Ajouter
                    </button>
                {showAddMatche ? (
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[60%] bg-white">
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 {this.state.dark}:text-white" >Matche</h3>
                            <form className="space-y-6" action="#">
                            <div className="flex">
                                    <div className="flex-initial w-[45%]">
                                        <label   className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Matche</label>
                                        <input type="text"  value={name} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ' disabled/>
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Adverse</label>
                                        <input type="text"  onChange={setAdvName} value={matche.advName} className={matcheError.advName === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-initial w-[45%] ">
                                        <label   className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Date</label>
                                        <input type="datetime-local" onChange={setMatcheDate} value={matche.matcheDate} className={matcheError.matcheDate === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%] ">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">COMPÉTITION</label>
                                            <select id="underline_select" onChange={setLeague} value={matche.league} className={matcheError.type === false ? 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none ' : 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-500 appearance-none '}>
                                                <option value= ''>Choisir league</option>
                                                <option value = "League">League </option>
                                                <option value = "Coup">Coup</option>
                                                <option value = "Amecale">Amecale</option>
                                            </select>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className=" flex-initial w-[45%] ">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {this.state.dark}:text-white">Lieu</label>
                                            <select id="underline_select" onChange={setType} value={matche.type} className={matcheError.type === false ? 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none ' : 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-500 appearance-none '}>
                                                <option value= ''>Choisir ....</option>
                                                <option value = "home">à domicile</option>
                                                <option value = "away">à l’extérieur</option>
                                            </select>
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
                        
                ): null 
                }    
                
                </>
        )
    }


export default AddMatche;