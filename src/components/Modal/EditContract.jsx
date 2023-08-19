import { useState } from "react";
import * as Icons from "../../icons";
import api from '../../services/posts';
import { useEffect } from "react";






function EditContract(props){
       
    const [showEditContract , setShowEditContract] = useState(false);
    const token = localStorage.getItem('apiToken');
    const [contract, setContract] = useState({
        id : '',
        beneficiaryId : '',
        teamId : '',
        startDate : '',
        endDate : '',
        salary : '',
        type : '',
        beneficiaryType : ''
    });

    useEffect(() => {
       
        const setContractValues = (props) => {
            
            setContract(prevState => ({
                ...prevState,
                id : props.contract.id,
                beneficiaryId : props.contract.beneficiary_Id,
                teamId : props.contract.team_Id,
                startDate : props.contract.start_Date,
                endDate : props.contract.end_Date,
                salary : props.contract.salary,
                type : props.contract.type,
                beneficiaryType : props.contract.beneficiary_Type
            }))
        };
        
        setContractValues(props);

        },[props.contract, showEditContract]);
        
        const [contractError, setContractError] = useState({
            beneficiaryId : false,
            teamId : false,
            startDate : false,
            endDate : false,
            salary : false,
            type : false,
            beneficiaryType : false,

        })

           

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
                saveContract();
                }
            
            }

            const saveContract = () => {
            
                const  config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                    try{
                        api.put('/v1/contracts/'+contract.id ,contract , config).then(
                            (response) =>{
                                props.reload('edit');
                                reset();
                            }).catch(error => {
                                console.error('An error occurred while updating the match. Please try again later.');
                                setShowEditContract(false);
                                props.reload('error');
                                });
                        
                    }catch(err){
                        console.log('ERROR',err.message);
                        
                    }
            }


            const reset = () => {
                Object.entries(contract).forEach(([key, value]) => {
                    let val = '';
                    //val = (key === 'teamId') ? 1 : val;
                        setContract(prevState => ({
                        ...prevState,
                        [key] : val
                        
                    }))
                });

                Object.entries(contractError).forEach(([key, value]) => {
                    setContractError(prevState => ({
                        ...prevState,
                        [key] : false
                    }))
                });
                setShowEditContract(false);
            }


            
        

            function Icon({icon, ...props}){
                Icon = Icons[icon];
                return <Icon {...props}/>
            }

    return (
        <>
        <button onClick={() => setShowEditContract(true)}><Icon className="w-5 h-5 " aria-hidden="true" icon='EditIcon'  /></button>
        {showEditContract ? (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[60%] bg-white">
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 {this.state.dark}:text-white">Contract</h3>
                            <form className="space-y-6" action="#">
                                <div className="flex">
                                    <div className="flex-initial w-[45%]">
                                        <label   className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">DU</label>
                                        <input type="date" onChange={setStartDate} value={contract.startDate} className={contractError.startDate === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {this.state.dark}:text-white">A</label>
                                        <input type="date"  onChange={setEndDate} value={contract.endDate} className={contractError.endDate === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
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

export default EditContract;