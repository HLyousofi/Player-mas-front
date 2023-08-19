import {useEffect, useState} from "react";
import api from '../../services/posts';
import axiosClient from "../../axios-client";







function AddStaff(props)  {

    const [showAddStaff , setShowAddStaff] = useState(false);
    const [addEchec, setAddEchec] = useState(null);
    const token = localStorage.getItem('apiToken');
    const [showAddContract, setShowAddContract] = useState(null);
    const [staff, setStaff] = useState({
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

    const [contract, setContract] = useState({
        
        beneficiaryId : 0,
        teamId : 1,
        startDate : '',
        endDate : '',
        salary : '',
        type : '',
        beneficiaryType : 'staff'
    });

    const [contractError, setContractError] = useState({
        beneficiaryId : false,
        teamId : false,
        startDate : false,
        endDate : false,
        salary : false,
        type : false,
        beneficiaryType : false,

    });

    useEffect(() => {
    
    if(contract.beneficiaryId != 0 ) saveContract() ;
    },[contract.beneficiaryId]);

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
        setShowAddStaff(true);
    };

    const echec = () => {
        setAddEchec(!addEchec);
    };

    const setStartDate= (e) => {
        setContract(prevState => ({
            ...prevState,
            startDate :  e.target.value
        }));
    };

    const setEndDate = (e) => {
        setContract(prevState => ({
            ...prevState,
            endDate :  e.target.value
        }));
    };

    const setSalary = (e) => {
        setContract(prevState => ({
            ...prevState,
            salary :  e.target.value
        }));
    }

    const setType = (e) => {
        setContract(prevState => ({
            ...prevState,
            type :  e.target.value
        }));
    };

    const showStaff = () => {
        setShowAddContract(false);
        setShowAddStaff(true);
    };

    

    const setBeneficiaryId = (e) => {

        setContract(prevState => ({
            ...prevState,
            beneficiaryId :  e
        }));
        
    }

    

    const next = () => {
        let isValid = true;
        Object.entries(staff).forEach(([key, value]) => {
            if(value == '' ){
                isValid = false;
                setStaffError(prevState => ({
                    ...prevState,
                    [key] : true
                }));
                
            }else {
                setStaffError(prevState => ({
                    ...prevState,
                    [key] : false
                }))
                
            };
        
        });

        if(isValid === false){
            return ;
          } else {
            setShowAddContract(true);
            setShowAddStaff(false);
          }
       
        
    }


    

    const save = () => {
        let isValid = true;
        Object.entries(contract).forEach(([key, value]) => {
            if(value === '' ){
                isValid = false;
                setContractError(prevState => ({
                    ...prevState,
                    [key] : true
                }))
                
            }else {
                setContractError(prevState => ({
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
    
    };

    const saveStaff = () => {
        
       
                axiosClient.post('/v1/staffs' ,staff).then(
                        (response) =>{setBeneficiaryId(response.data.data.id)
                                    }).catch(error => {
                                        console.error('An error occurred while show the Staff. Please try again later.');
                                        reset();
                                        props.reload('error');
                                    });
                
    };

    const saveContract = () => {
                axiosClient.post('/v1/contracts' ,contract).then(
                    (response) =>{
                        props.reload('edit');
                        reset();
                    }).catch(error => {
                        console.error('An error occurred while updating the match. Please try again later.');
                        setShowAddContract(false);
                        props.reload('error');
                        });
                
           
    }


    const reset = () => {
        setShowAddStaff(false);
        setShowAddContract(false);
        Object.entries(staff).forEach(([key, value]) => {
            setStaffError(prevState => ({
                ...prevState,
                [key] : false
            }));
            let val = '';
            val = (key === 'teamId') ? 1 : val;
                setStaff(prevState => ({
                ...prevState,
                [key] : val
                
            }))
        });

        Object.entries(contract).forEach(([key, value]) => {
            setContractError(prevState => ({
                ...prevState,
                [key] : false
            }));
            let val = '';
            val = (key === 'teamId') ? 1 : val;
            val = (key === 'beneficiaryType') ? 'staff' : val;
            val = (key === 'beneficiaryId') ? 0 : val;
                setContract(prevState => ({
                ...prevState,
                [key] : val
                
            }))
        });
        
    };



        return (
                <>
                    <button onClick={addStaff} className="inline-block rounded  bg-green-500 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] {this.state.dark}:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]" >
                                Ajouter
                    </button>
                    {showAddStaff ? (
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
                                                <label   className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Contact</label>
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
                                        <button type="button" onClick={() => next()} className="inline-block rounded ml-6 bg-blue-500 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                                             Suivant
                                         </button>
                                    
                                    </form>
                                </div>
                                
                            </div>
                        </div>
                    ): null 
                    }    
                     {showAddContract ? (
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                            <div className="w-[60%] bg-white">
                                <div className="px-6 py-6 lg:px-8">
                                    <h3 className="mb-4 text-xl font-medium text-gray-900 {dark}:text-white">Contract</h3>
                                    <form className="space-y-6" action="#">
                                        <div className="flex">
                                            <div className="flex-initial w-[45%]">
                                                <label   className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">DU</label>
                                                <input type="date" onChange={setStartDate} value={contract.startDate} className={contractError.startDate === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                            </div>
                                            <div className=" flex-initial w-[45%] ml-[10%]">
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {dark}:text-white">A</label>
                                                <input type="date"  onChange={setEndDate} value={contract.endDate} className={contractError.startDate === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className=" flex-initial w-[45%] ">
                                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {dark}:text-white">Type</label>
                                                    <select id="underline_select" onChange={setType} value={contract.type} className={contractError.type === false ? 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none ' : 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-500 appearance-none '}>
                                                        <option value= ''>Choisir type de Contract</option>
                                                        <option value = "contrat apprenti">contrat apprenti</option>
                                                        <option value = "contrat aspirant">contrat aspirant</option>
                                                        <option value = "contrat ou convention avec stagiaire">contrat ou convention avec stagiaire</option>
                                                        <option value = "contrat élite ou professionnel" >contrat élite ou professionnel</option>

                                                    </select>
                                            </div>
                                            
                                            <div className=" flex-initial w-[45%] ml-[10%]">
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {dark}:text-white">Salaire</label>
                                                <input type="number"  onChange={setSalary} value={contract.salary} className={contractError.salary === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                            </div>
                                        </div>
                                    
                                        <button type="button" onClick={() => reset()} className="inline-block rounded ml-[54%] bg-neutral-500 from-neutral-500 via-neutral-600 to-neutral-700 hover:bg-gradient-to-br  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                                            Annuler
                                        </button>
                                        <button type="button" onClick={() => showStaff()} className="inline-block rounded ml-6 bg-blue-500 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                                            precedant
                                        </button>
                                        <button type="button" onClick={() => save()} className="inline-block rounded ml-6 bg-green-500 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                                            Enregistrer
                                        </button>
                                    
                                    </form>
                                </div>
                                
                            </div>
                        </div>
            
                
                    ) : null}
                
                </>
        )
    }


export default AddStaff;