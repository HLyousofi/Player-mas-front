import React,  { Component } from "react";
import api from '../../services/posts';
import axiosClient from "../../axios-client";




class Modal extends Component {

        
        static defaultProps = {
            dateRegex : /^\d{4}-\d{2}-\d{2}$/ ,
            emailRegex : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            auth : this.props 
            };

        constructor(props) {
            super(props);
            this.state = {
                showAddPlayer : false,
                showAddContract : false,
                dark : true ,
                succes : false,
                token : localStorage.getItem('apiToken'),
                player : {
                    teamId : 1,
                    name : '',
                    position : '',
                    birthDay : '',
                    adress : '',
                    phone : '',
                    mail : '',
                    number : ''
                },

                contract : {
                    beneficiaryId : 0,
                    teamId : 1,
                    startDate : '',
                    endDate : '',
                    salary : '',
                    type : '',
                    beneficiaryType : 'player'
                },

                playerError : {
                    name : false,
                    position : false ,
                    birthDay : false , 
                    adress : false ,
                    phone : false ,
                    mail : false
                },

                contractError : {
                 
                    teamId : false,
                    startDate : false,
                    endDate : false,
                    salary : false,
                    type : false,
                    number : false

                }

            }
            // function player form
            this.setName = this.setName.bind(this);
            this.setPosition = this.setPosition.bind(this);
            this.setBirthDay = this.setBirthDay.bind(this);
            this.setAdress = this.setAdress.bind(this);
            this.setPhone = this.setPhone.bind(this);
            this.setMail = this.setMail.bind(this);
            this.next = this.next.bind(this);
            this.setStartDate = this.setStartDate.bind(this);
            this.setEndDate = this.setEndDate.bind(this);
            this.setType = this.setType.bind(this);
            this.setSalary = this.setSalary.bind(this);
            this.setBeneficiaryId = this.setBeneficiaryId.bind(this);
            this.setSucces = this.setSucces.bind(this);
            this.setNumber = this.setNumber.bind(this);



        }
        
        showPlayer = () => {
           
            this.setState({showAddPlayer : true, showAddContract : false })
        }
        
        setSucces = () => {
            this.setState({ succes : !this.succes});
        }

        setName = (e) => {
            this.setState(prevState => ({
                player: {
                  ...prevState.player,
                  name: e.target.value
                }
              }))
        }

        setPosition = (e) => {
            this.setState(prevState => ({
                player: {
                  ...prevState.player,
                  position : e.target.value
                }
              }))
        }

        setBirthDay = (e) => {
            this.setState(prevState => ({
                player: {
                  ...prevState.player,
                  birthDay : e.target.value
                }
              }))
        }

        setAdress = (e) => {
            this.setState(prevState => ({
                player: {
                  ...prevState.player,
                  adress : e.target.value
                }
              }))
        }

        setPhone = (e) => {
            this.setState(prevState => ({
                player: {
                  ...prevState.player,
                  phone : e.target.value
                }
              }))
        }

        setMail = (e) => {
            this.setState(prevState => ({
                player: {
                  ...prevState.player,
                  mail : e.target.value
                }
              }))
        }
        setNumber = (e) => {
            this.setState(prevState => ({
                player: {
                  ...prevState.player,
                  number : e.target.value
                }
              }))
        }


        setStartDate = (e) => {
            this.setState(prevState => ({
                contract: {
                  ...prevState.contract,
                  startDate : e.target.value
                }
              }))
        }

        setEndDate = (e) => {
            this.setState(prevState => ({
                contract: {
                  ...prevState.contract,
                  endDate : e.target.value
                }
              }))
              
        }


        setType = (e) => {
            this.setState(prevState => ({
                contract: {
                  ...prevState.contract,
                  type : e.target.value
                }
              }))
        }

        setSalary = (e) => {
            this.setState(prevState => ({
                contract: {
                  ...prevState.contract,
                  salary : e.target.value
                }
              }))
        }

        setBeneficiaryId = (e) => {
            return new Promise((resolve, reject) => {
                this.setState(prevState => ({
                    contract: {
                    ...prevState.contract,
                    beneficiaryId : e
                    }
                }),() => {
                    resolve();
                });
            });
        }

        next = () => {
            let isValid = true;
            Object.entries(this.state.player).forEach(([key, value]) => {
                    if(value === '' ){
                        isValid = false;
                        this.setState(prevState => ({
                            playerError : {
                            ...prevState.playerError,
                            [key] : true
                            }
                        }))
                    }else {
                        this.setState(prevState => ({
                            playerError : {
                            ...prevState.playerError,
                            [key] : false
                            }
                        }))
                    }
                
              });

              if(isValid === false){
                return ;
              } else {
                this.setState({showAddPlayer : false , showAddContract : true });
              }

        }

        reset = () => {
            Object.entries(this.state.player).forEach(([key, value]) => {
                    let val = '';
                    val = (key === 'teamId') ? 1 : val;
                    this.setState(prevState => ({
                        player : {
                          ...prevState.player,
                           [key] : val
                        }
                      }))
              });

              Object.entries(this.state.playerError).forEach(([key, value]) => {
                this.setState(prevState => ({
                    playerError : {
                      ...prevState.playerError,
                       [key] : false
                    }
                  }))
          });

          Object.entries(this.state.contract).forEach(([key, value]) => {

            this.setState(prevState => ({
                contractError : {
                  ...prevState.contractError,
                   [key] : false
                }
              }));
            let val = '';
            val = (key === 'teamId') ? 1 : val;
            val = (key === 'beneficiaryType') ? 'player' : val;
            val = (key === 'beneficiaryId') ? 0 : val;

           
            this.setState(prevState => ({
                contract : {
                  ...prevState.contract,
                   [key] : val
                }
              }));
      });

            this.setState({showAddPlayer : false , showAddContract : false });
        }

        save = () => {
            
            
            let isValid = true;
            Object.entries(this.state.contract).forEach(([key, value]) => {
                
                    if(value === '' ){
                        isValid = false;
                        this.setState(prevState => ({
                            contractError : {
                            ...prevState.contractError,
                            [key] : true
                            }
                        }))
                    }else {
                        this.setState(prevState => ({
                            contractError : {
                            ...prevState.contractError,
                            [key] : false
                            }
                        }))
                    }
                
              });
               
              if(isValid === false){
                
                return ;
              } else {
                this.savePlayer();
              }

        }



        savePlayer = () => {
            
            
                axiosClient.post('/v1/players',this.state.player).then(
                    (response) => {this.setBeneficiaryId(response.data.data.id).then(() => {
                        this.saveContract();
                    }).catch(error => {
                        console.error('An error occurred while updating the player. Please try again later.');
                        this.setState({showAddPlayer : false , showAddContract : false });
                        this.props.reload('error');
                        });                   
                }
                
            ).catch(error => {
                console.error('An error occurred while updating the player. Please try again later.');
                this.setState({showAddPlayer : false , showAddContract : false });
                this.props.reload('error');
                });    
            
            

        }

        saveContract = () => {
           
            
                    axiosClient.post('/v1/contracts',this.state.contract).then(
                        (response) =>{
                            this.props.reload('add');
                            this.setState({showAddContract : false});
                            this.reset();
                        }).catch(error => {
                            console.error('An error occurred while updating the contract. Please try again later.');
                            this.setState({showAddPlayer : false , showAddContract : false });
                            this.props.reload('error');
                            });
      
        }



        render() {
        return (
            <>
                <button onClick={() => this.showPlayer()} className="inline-block rounded  bg-green-500 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] {this.state.dark}:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]" >
                    Ajouter
            </button>
            {this.state.showAddPlayer ? (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[60%] bg-white">
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 ">Nouveau Joueur</h3>
                            <form className="space-y-6" action="#">
                                <div className="flex">
                                    <div className="flex-initial w-[45%]">
                                        <label htmlFor="email"  className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Nom</label>
                                        <input type="text" onChange={this.setName} value={this.state.player.name} className={this.state.playerError.name === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' }/>
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Date de naissance</label>
                                        <input type="date" onChange={this.setBirthDay} value={this.state.player.birthDay} className={this.state.playerError.birthDay === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' }  />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-initial w-[45%]">
                                        <label htmlFor="email"  className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Adress</label>
                                        <input  id="text" onChange={this.setAdress} value={this.state.player.adress} className={this.state.playerError.adress === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' }   />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                        <input type="email" onChange={this.setMail} value={this.state.player.mail}  className={this.state.playerError.mail === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' }  />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-initial w-[45%]">
                                        <label htmlFor="email"  className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">Contact </label>
                                        <input type="text" onChange={this.setPhone} value={this.state.player.phone} className={this.state.playerError.phone === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Position</label>
                                            <select id="underline_select" onChange={this.setPosition} value={this.state.player.position} className={this.state.playerError.position === false ? 'block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none' : 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-500 appearance-none '}>
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
                                        <input type="number" onChange={this.setNumber} value={this.state.player.number} className={this.state.playerError.number === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                </div>    
                                <button type="button" onClick={() => this.reset()} className="inline-block rounded ml-[72%] bg-neutral-500 from-neutral-500 via-neutral-600 to-neutral-700 hover:bg-gradient-to-br  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                                    Annuler
                                </button>
                                <button type="button" onClick={() => this.next()} className="inline-block rounded ml-6 bg-blue-500 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                                    Suivant
                                </button>
                            
                            </form>
                        </div>
                        
                    </div>
                </div>
            
                
            ) : null}
            {this.state.showAddContract ? (
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[60%] bg-white">
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 {this.state.dark}:text-white">Contract</h3>
                            <form className="space-y-6" action="#">
                                <div className="flex">
                                    <div className="flex-initial w-[45%]">
                                        <label   className="block flex-initial w-[45%] mb-2 text-sm font-medium text-gray-900 ">DU</label>
                                        <input type="date" onChange={this.setStartDate} value={this.state.contract.startDate} className={this.state.contractError.startDate === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {this.state.dark}:text-white">A</label>
                                        <input type="date"  onChange={this.setEndDate} value={this.state.contract.endDate} className={this.state.contractError.startDate === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className=" flex-initial w-[45%] ">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {this.state.dark}:text-white">Type</label>
                                            <select id="underline_select" onChange={this.setType} value={this.state.contract.type} className={this.state.contractError.type === false ? 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none ' : 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-500 appearance-none '}>
                                                <option value= ''>Choisir type de Contract</option>
                                                <option value = "contrat apprenti">contrat apprenti</option>
                                                <option value = "contrat aspirant">contrat aspirant</option>
                                                <option value = "contrat ou convention avec stagiaire">contrat ou convention avec stagiaire</option>
                                                <option value = "contrat élite ou professionnel" >contrat élite ou professionnel</option>

                                            </select>
                                    </div>
                                    
                                    <div className=" flex-initial w-[45%] ml-[10%]">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 {this.state.dark}:text-white">Salaire</label>
                                        <input type="number"  onChange={this.setSalary} value={this.state.contract.salary} className={this.state.contractError.salary === false ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5 ': 'bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-y-red-200 focus:border-blue-500  block w-full p-2.5' } />
                                    </div>
                                </div>
                            
                                <button type="button" onClick={() => this.reset()} className="inline-block rounded ml-[54%] bg-neutral-500 from-neutral-500 via-neutral-600 to-neutral-700 hover:bg-gradient-to-br  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                                    Annuler
                                </button>
                                <button type="button" onClick={() => this.showPlayer()} className="inline-block rounded ml-6 bg-blue-500 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                                    precedant
                                </button>
                                <button type="button" onClick={() => this.save()} className="inline-block rounded ml-6 bg-green-500 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                                    Enregistrer
                                </button>
                            
                            </form>
                        </div>
                        
                    </div>
                </div>
            
                
            ) : null}
            {this.state.succes ? (
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Success alert!</span> Change a few things up and try submitting again.
          </div> ): null}
            </>
        )
    }
}

export default Modal;