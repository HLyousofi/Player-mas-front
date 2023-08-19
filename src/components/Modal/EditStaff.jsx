import {useState, useEffect} from "react";
import api from '../../services/posts';
import * as Icons from "../../icons";






function EditStaff(props)  {

    const [showEditStaff , setShowEditStaff] = useState(false);
    const [addEchec, setAddEchec] = useState(null);
    const token = localStorage.getItem('apiToken');
    const [staff, setStaff] = useState({
        id : '',
        teamId : 1,
        name : '',
        adress : '',
        phone : '',
        mail : '',
        role : ''
    });

    const [staffError, setStaffError] = useState({
        teamId : false,
        name : false,
        adress : false,
        phone : false,
        mail : false,
        role : false
    });

    useEffect(() => {
        const setStaffValues = (props) => {
            setStaff(prevState => ({
                ...prevState,
                id : props.staff.id,
                name : props.staff.name,
                role : props.staff.role,
                adress : props.staff.adress,
                phone : props.staff.phone,
                mail : props.staff.mail,

            }))
        };
        
        setStaffValues(props);

        },[props.staff,showEditStaff]);

    const setName = (e) => {
        setStaff(prevState => ({
            ...prevState,
            name :  e.target.value
        }));
    };

    const setAdress = (e) => {
        setStaff(prevState => ({
            ...prevState,
            adress :  e.target.value
        }));
    };

    const setPhone = (e) => {
        setStaff(prevState => ({
            ...prevState,
            phone :  e.target.value
        }));
    }

    const setMail = (e) => {
        setStaff(prevState => ({
            ...prevState,
            mail :  e.target.value
        }));
    };

    const setRole = (e) => {
        setStaff(prevState => ({
            ...prevState,
            role :  e.target.value
        }));
    };

    const addStaff = () => {
        setShowEditStaff(true);
    }

    const echec = () => {
        setAddEchec(!addEchec);
    }


    

    const save = () => {
        let isValid = true;
        Object.entries(staff).forEach(([key, value]) => {
            if(value == '' ){
                isValid = false;
                setStaffError(prevState => ({
                    ...prevState,
                    [key] : true
                }))
                
            }else {
                setStaffError(prevState => ({
                    ...prevState,
                    [key] : false
                }))
                
            }
        
        });
        
        if(isValid === false){
        
        return ;
        } else {
        saveStaff();
        }
    
    }

    const saveStaff = () => {
        const  config = {
            headers: { Authorization: `Bearer ${token}` }
        };
            try{
                api.put('/v1/staffs/'+staff.id ,staff , config).then(
                    (response) =>{
                        props.reload('edit');
                        reset();
                    }).catch(error => {
                        console.error('An error occurred while show the matchs. Please try again later.');
                        setShowEditStaff(false);
                        props.reload('error');
                    });
                
            }catch(err){
                echec();
                console.log('ERROR',err.message);
                
            }
    }


    const reset = () => {
        Object.entries(staff).forEach(([key, value]) => {
            let val = '';
            val = (key === 'teamId') ? 1 : val;
                setStaff(prevState => ({
                ...prevState,
                [key] : val
                
            }))
        });

        Object.entries(staffError).forEach(([key, value]) => {
            setStaffError(prevState => ({
                ...prevState,
                [key] : false
            }))
        });
        setShowEditStaff(false);
    }

    function Icon({icon, ...props}){
        Icon = Icons[icon];
        return <Icon {...props}/>
    }



        return (
                <>
               <button onClick={() => setShowEditStaff(true)}><Icon className="w-5 h-5 " aria-hidden="true" icon='EditIcon'  /></button>
                {showEditStaff ? (
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[60%] bg-white">
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 {this.state.dark}:text-white" >Personnel</h3>
                            <form className="space-y-6" action="#">
                            <div className="flex">
                                    <div className="flex-initial w-[45%]">
                                        <label   className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Nom</label>
                                        <input type="text"  value={staff.name} onChange={ setName } className={staffError.name === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Adress</label>
                                        <input type="text"  onChange={setAdress} value={staff.adress} className={staffError.adress === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-initial w-[45%] ">
                                        <label   className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Telephone</label>
                                        <input type="tel" onChange={setPhone} value={staff.phone} className={staffError.phone === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Mail</label>
                                        <input type="email"  onChange={setMail} value={staff.mail} className={staffError.mail === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                    
                                </div>
                                <div className="flex">
                                    <div className=" flex-initial w-[45%] ">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {this.state.dark}:text-white">Lieu</label>
                                            <select id="underline_select" onChange={setRole} value={staff.role} className={staffError.role === false ? 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none ' : 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-500 appearance-none '}>
                                                <option value= ''>Choisir ....</option>
                                                <option value = "Entraineur">Entraineur</option>
                                                <option value = "Aide Entraineur 1">Aide Entraineur 1</option>
                                                <option value = "Aide Entraineur 2">Aide Entraineur 2</option>
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


export default EditStaff;