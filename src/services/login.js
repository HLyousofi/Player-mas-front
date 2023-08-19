import axios from "axios";
import { endPoint } from "./endPoint";



export  default async function  login(props) {

    return axios.post(endPoint.login, props).catch(function (error) {
    console.error(error.toJSON().message);// to do request error
  });
};



