import '../styles/globals.css'
import '../styles/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'

// import Providers from './providers'

export const metadata = {
  title: 'Control de gastos',
  description: 'Controlá los gastos de manera compartida',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* <Providers> */}
          {children}
        {/* </Providers> */}
      </body>
    </html>
  )
}
