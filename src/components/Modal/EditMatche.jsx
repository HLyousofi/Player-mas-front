import { useState } from "react";
import * as Icons from "../../icons";
import api from '../../services/posts';
import { useEffect } from "react";
import useRights from "../hooks/useRights";




function EditMatche (props){
       
    const [showEditMatche , setShowEditMatche] = useState(false);
    const [teamName, setTeamName] = useState('');
    const token = localStorage.getItem('apiToken');
    const {createRight, updateRight, deleteRight} = useRights();
    const [matche, setMatche] = useState({
        id : '',
        teamId : '',
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

    useEffect(() => {
       setTeamName('PSG');
        const setMatcheValues = (props) => {
            setMatche(prevState => ({
                ...prevState,
                id : props?.matche?.id,
                teamId : 1,
                advName : props?.matche?.adv_Name,
                matcheDate : props?.matche?.matche_Date,
                league : props?.matche?.league,
                type : props?.matche?.type,
            }))
        };
        
        setMatcheValues(props);

        },[props.matche]);
             

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
    const setId = (e) => {
        setMatche(prevState => ({
            ...prevState,
            id :  e
        }));
    };

            

    const save = () => {
        let isValid = true;
        if(props.add) setId(0);
        Object.entries(matche).forEach(([key, value]) => {
            if(value === ''){
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
    
        const  config = {
            headers: { Authorization: `Bearer ${token}` }
        };
           if(props.edit){ 
                try{
                        api.put('/v1/matches/'+matche.id ,matche , config).then(
                            response =>{
                                props.reload('edit');
                                reset();
                            }).catch(error => {
                                console.error('An error occurred while updating the match. Please try again later.');
                                setShowEditMatche(false);
                                props.reload('error');
                                });
                        
                    }catch(err){
                        
                        console.log('ERROR',err.message);
                    
                }
            }else if(props.add){
                try{
                    api.post('/v1/matches' ,matche , config).then(
                        (response) =>{
                            props.reload('add');
                            reset();
                        }).catch(error => {
                            console.error('An error occurred while adding the match. Please try again later.');
                            setShowEditMatche(false);
                            props.reload('error');
                            });;
                    
                }catch(err){
                    props.reload('error');
                    console.log('ERROR',err.message);
                    
                }
            }
    }


    const reset = () => {
        Object.entries(matche).forEach(([key, value]) => {
            setMatcheError(prevState => ({
                ...prevState,
                [key] : false
            }))
            let val = '';
            val = (key === 'teamId') ? 1 : val;
                setMatche(prevState => ({
                ...prevState,
                [key] : val
                
            }))
        });

        // Object.entries(matcheError).forEach(([key, value]) => {
        //     setMatcheError(prevState => ({
        //         ...prevState,
        //         [key] : false
        //     }))
        // });
        setShowEditMatche(false);
    }


    function Icon({icon, ...props}){
        Icon = Icons[icon];
        return <Icon {...props}/>
    }

    return (
        <>
        {props.edit ? 
        <button onClick={() => setShowEditMatche(true)}><Icon className="w-5 h-5 " aria-hidden="true" icon='EditIcon'  /></button>
        : ''}
        
        {props.add ? <button onClick={() => setShowEditMatche(true)} className="inline-block rounded  bg-green-500 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] {this.state.dark}:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]" >
                            Ajouter
        </button>
        : ''}
        {showEditMatche ? (
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                <div className="w-[60%] bg-white">
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 {this.state.dark}:text-white" >Matche</h3>
                        <form className="space-y-6" action="#">
                        <div className="flex">
                                <div className="flex-initial w-[45%]">
                                    <label   className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Equipe</label>
                                    <input type="text"  value={teamName} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ' disabled/>
                                </div>
                                <div className=" flex-initial w-[45%] ml-[10%]">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {this.state.dark}:text-white">Adverse</label>
                                    <input type="text" value={matche.advName} onChange={setAdvName}  className={matcheError.advName === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-initial w-[45%] ">
                                    <label   className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Date</label>
                                    <input type="datetime-local"  value={matche.matcheDate} onChange={setMatcheDate} className={matcheError.matcheDate === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                </div>
                                <div className=" flex-initial w-[45%] ml-[10%] ">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {dark}:text-white">COMPÉTITION</label>
                                        <select id="underline_select"  value={matche.league} onChange={setLeague} className={matcheError.league === false ? 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none ' : 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-500 appearance-none '}>
                                            <option value= ''>Choisir league</option>
                                            <option value = "League" >League </option>
                                            <option value = "Coup">Coup</option>
                                            <option value = "Amecale">Amecale</option>
                                        </select>
                                </div>
                            </div>
                            <div className="flex">
                                <div className=" flex-initial w-[45%] ">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {dark}:text-white">Lieu</label>
                                        <select id="underline_select"  value={matche.type} onChange={setType} className={matcheError.type === false ? 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none ' : 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-500 appearance-none '}>
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
        ): null}
        
        </>
    )









}

export default EditMatche;