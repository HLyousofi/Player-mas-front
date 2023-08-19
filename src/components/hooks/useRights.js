import { useContext } from "react";
import RightsContext from "../Context/RightsProvider";

const useRights = () => {
    return useContext(RightsContext);
}

export default useRights;