'use client'

import { useEffect } from "react"
import { getGroupsDB } from "../services/db"
import { useUserAuth } from "../../src/context/userAuthContext";

export default function Groups() {
  // const { user } = useUserAuth();

  // useEffect(() => {
  //   getGroupsDB({uid: user.uid}).then(res => console.log(res))
  // }, [])

  return (
    <h2 className="text-slate-100">Acá están listado los grupos</h2>
  )
}