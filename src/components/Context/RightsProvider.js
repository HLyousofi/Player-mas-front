import { createContext, useEffect, useState } from "react";

const RightsContext = createContext({
    createRight : null,
    updateRight : null,
    deleteRight : null,
    role : null,

    setCreateRight : () => {},
    setUpdateRight : () => {},
    setDeleteRight : () => {},
    setRole : () =>{},
});

export const RightsProvider = ({ children }) => {
    const [createRight, setCreateRight] = useState(false);
    const [updateRight, setUpdateRight] = useState((false));
    const [deleteRight, setDeleteRight] = useState((false));
    const [role, setRole] = useState('user');


    useEffect(() => {
        if(!createRight) setCreateRight(localStorage?.getItem('createRight') === "true");
        if(!updateRight) setUpdateRight(localStorage?.getItem('updateRight') === "true");
        if(!deleteRight) setDeleteRight(localStorage?.getItem('deleteRight') === "true");
        setRole(localStorage?.getItem('role'));

    })

  

    return (
        <RightsContext.Provider value={{ 
            createRight, 
            updateRight,
            deleteRight,
            role,
            setCreateRight,
            setUpdateRight,
            setDeleteRight,
            setRole
             }}>
            {children}
        </RightsContext.Provider>
    )
}

export default RightsContext;