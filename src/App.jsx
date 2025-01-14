import { Outlet } from "react-router-dom"
import Header from "./SharedComponents/Header"
import Footer from "./SharedComponents/Footer"


function App() {

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
