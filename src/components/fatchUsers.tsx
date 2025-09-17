import { useContext } from "react"
import { myContext } from "./Context"
import { Member } from "./types"

const fatchUsers = () => {
    const ctx = useContext(myContext)
    if(!ctx)return;
  return (
    <>
    </>
  )
}

export default fatchUsers