
import { useEffect } from "react";
import * as Icons from "../../icons";






function Succes (props){
    

    useEffect(() => {
        setTimeout(() =>  {
            props.succes();
          }, 3000);
    

    });
    
      function Icon({icon, ...props}){
        Icon = Icons[icon];
        return <Icon {...props}/>
    }
    
    return (
 
    <div className="fixed w-[81%] ml-64 mr-4 bottom-0 flex p-4 text-sm   text-green-800 border border-green-300 rounded-lg bg-green-50 " role="alert">
        {/* <span clasNames="sr-only">Info</span> */}
        <div>
            <Icon icon="InfoIcon" className="flex-shrink-0 inline w-5 h-5 mr-3" />
            {props.msg}
        </div>
    </div>
    )
    
    }
export default Succes;