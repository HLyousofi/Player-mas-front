
import { endPoint } from "./endPoint";
import axios from "axios";
import Index from "../components/Players/Index";
import { useNavigate } from "react-router-dom";


export  function   getPlayers(config) {
   
    // const  config = {
    //     headers: { Authorization: `Bearer ${auth.accessToken}` }
    //   };
    axios.get(endPoint.players, config ).then(response => {
        console.log('service', response.data);
        return response;
       
    }).catch(error => {
        console.error('Error fetchin data', error);
    })
};

export function addPlayer() {


};

export function updatPlayer() {


};

export function getPlayerById() {


};

export function deletePlayer() {


}