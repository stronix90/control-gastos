import UserWidget from "./user/UserWidget"

export default function Unlogged() {
  return (
    <div style={{height: "calc(100vh - 56px)"}} className="grid content-center">
      <h5 className="text-slate-50 text-center">Se debe loguear para continuar</h5>
      <UserWidget/>
    </div>
  )
}