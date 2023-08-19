import { useEffect, useState} from "react"
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Succes from "../Alert/Succes";
import Danger from "../Alert/Danger";
import * as Icons from "../../icons";
import axiosClient from "../../axios-client";
import useRights from "../hooks/useRights";



export default function SelectPlayer(props){
    const [dark, setDark] = useState(false);
    const [players, setPlayers] = useState(0);
    const [reloaded,setReloaded] = useState(false);
    const [succes, setSucces] = useState(null);
    const [echec, setEchec] = useState(null);
    const [message, setMessage] = useState('');
    const [startingPlayers, setStartingPlayers] = useState([]);
    const [draggedItem, setDraggedItem] = useState();
    const [droppedItems, setDroppedItems] = useState([]);
    const [substitutes, setSubstitutes] = useState([]);
    const {createRight, updateRight, deleteRight} = useRights();

    const { user, token } = useAuth();
    const fetchPlayers = async () =>{
  
        axiosClient.get('/v1/players').then((response => setPlayers(response.data))).catch(error => {
                console.error('An error occurred while show the players. Please try again later.');
            });
     }

            
    useEffect(() => {
    fetchPlayers(); 
    
    },[reloaded]);

    function Icon({icon, ...props}){
        Icon = Icons[icon];
        return <Icon {...props}/>
    }

    const handleDragStart = (e, item) => {
       
        setDraggedItem(item);
      };

    const handleDrop = (e) => {
       if(droppedItems && droppedItems.length < 11 ){
            const dropX = e.clientX; // X coordinate of the drop
            const dropY = e.clientY; // Y coordinate of the drop
        
            // Calculate the position of the drop relative to the image
            const dropPosition = {
                x: dropX - e.target.getBoundingClientRect().left,
                y: dropY - e.target.getBoundingClientRect().top,
            };

            setPlayers(players.filter((item) => item.id !== draggedItem.id));
                // if (draggedItem && draggedItem.id === id) {
                // }
            
        
            // Update the dropped items with the new position
            setDroppedItems([...droppedItems, { item: draggedItem, position: dropPosition }]);
        
            // Reset dragged item
            setDraggedItem(null);
       }else {
        setMessage('c deja 11 joueurs')
        setEchec(true);
       }
      };

      const handleDropSubstitute = () => {
        setPlayers(players.filter((item) => item.id !== draggedItem.id));
        setSubstitutes([...substitutes, draggedItem ]);

      }
    
      const handleDragOver = (e) => {
        e.preventDefault();
      };

      const removeItem = (item) => {
        const updatedItem = droppedItems.filter((tmp) => tmp.item.id != item.id );
        setDroppedItems(updatedItem);
        setPlayers([...players, item]);
      }

      const selectPlayerEchec = () => {
        setEchec(false);
      }


    

   

  
           
                
    
 
           

    
    return (
    <>
        <div className=" ml-64 relative w-auto mr-4 ">
            <div className=" items-center mt-5">
                <div className="flex bg-gray-50 " >
                    <div  className="w-full" >
                        <img src="/stade.jpg" alt="stadium" className="h-screen" onDrop={handleDrop} onDragOver={handleDragOver} />
                            {droppedItems.map((dropped, index) => (
                                <div
                                key={index}
                                className="absolute  items-center  text-white  rounded-full"
                                style={{
                                  left: dropped.position.x + 'px',
                                  top: dropped.position.y + 'px',
                                  transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    <div className="relative">
                                    <img src="/fancy.png" alt="outfit" className="w-12" />
                                        <Icon className="absolute w-5 h-5 ml-1 top-0  left-0" aria-hidden="true" icon='deletex' onClick={() => removeItem(dropped.item) } />
                                        <div className="absolute top-1/2  left-1/2 transform -translate-x-1/2  text-white rounded-full w-5 h-0 flex items-center justify-center text-xs font-bold">
                                        { dropped.item.number}
                                        </div>
                                        <div className="relative top-1  left-1/2 transform -translate-x-1/2  text-white rounded-full w-6 h-0 flex items-center justify-center text-xs font-bold">
                                            { dropped.item.name.split(' ')[0]}
                                        </div>
                                        
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="flex ml-2  max-h-screen w-64  ">
                        <ul className="w-full">
                            <li class="mb-2">
                                <h2 class="text-xl font-semibold">Tout les Joueurs</h2>
                               
                            </li>
                            { players.length > 0 ?(
                                    players.map(player => (
                                    <li key={player.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, player)}
                                        className="p-2 mb-1 flex  w-56  bg-white shadow rounded-lg cursor-move">
                                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-400 mr-2">
                                        <span className="text-white text-lg font-semibold">{player.number}</span>
                                        </div>
                                        {player.name}
                                    </li>
                                    ))
                                ) : (  <sping>Loading</sping>  )
                            }
                        </ul>
                    </div>
                    <div className="flex ml-2  max-h-screen w-64" onDrop={handleDropSubstitute} onDragOver={handleDragOver}>
                        <ul className="w-full">
                            <li class="mb-2">
                                <h2 class="text-xl font-semibold">Remplaçant </h2>
                               
                            </li>
                            { substitutes?.length > 0 ?(
                                    substitutes.map(substitute => (
                                    <li key={substitute.id}
                                        className="p-2 mb-1 flex  w-56  bg-white shadow rounded-lg cursor-move">
                                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-400 mr-2">
                                        <span className="text-white text-lg font-semibold">7</span>
                                        </div>
                                        {substitute.name}
                                    </li>
                                    ))
                                ) : (  <sping>Loading</sping>  )
                            }
                        </ul>
                    </div>
            
                </div>
            </div>
        </div>
        {echec &&  
        <Danger msg={message} echec={selectPlayerEchec} />
        
    }
    </>    
    )
}