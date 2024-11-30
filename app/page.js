import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <h1 className='text-slate-100'>Esto es una landing page</h1>
      <Link href={"/app"}>Ingresar a la aplicación</Link>
    </>
  )
}

function HomePage2() {
  const { user } = useUserAuth();

  if (!user) {
    return (
      <Unlogged/>
    )
  }
  else {
    getGroupsDB({ uid: user.uid }).then(res => console.log(res))
  }


  return (
    <>
      <Script src="https://kit.fontawesome.com/ea1b9abd34.js" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></Script>

      {/* <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      
      <h1>Grupos</h1>
    </>
  )
}
