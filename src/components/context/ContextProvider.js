import React, {createContext, useState } from 'react'

export const addData = createContext()
export const updateData = createContext()
export const dltdData = createContext()
const ContextProvider = ({children}) => {

    const [useradd , setUseradd] = useState("")
    const [update , setUpdate] = useState("")
    const [deleteData , setDeleteData] = useState("")

  return (
        <>
            <addData.Provider value={{useradd , setUseradd}}>
            <updateData.Provider value={{update , setUpdate}}>
            <dltdData.Provider value={{deleteData , setDeleteData}}>
            {children}
            </dltdData.Provider>
           
            </updateData.Provider>
                
            </addData.Provider>
        </>
    )
}

export default ContextProvider