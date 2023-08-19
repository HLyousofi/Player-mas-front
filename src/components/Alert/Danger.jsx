import * as Icons from "../../icons";
import { useEffect } from "react";

function Icon({icon, ...props}){
    Icon = Icons[icon];
    return <Icon {...props}/>
}





function Danger (props){
const clsName = props?.flx ? 'flex items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 ' : "fixed w-[81%] ml-64 mr-4 bottom-0 flex p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " ;
    useEffect(() => {
        setTimeout(() =>  {
            props?.echec();
          }, 3000);
    

    });
    return (
 

    <div className={ clsName } role="alert">

        {/* <span className="sr-only">Info</span> */}
        <div>
            <Icon icon="InfoIcon" className="flex-shrink-0 inline w-5 h-5 mr-3" />
            {props.msg}
        </div>
    </div>
    );
}
export default Danger;