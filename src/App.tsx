import { useEffect, useState } from "react"
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Router from "./components/Router";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './App.css';
import Loader from "components/Loader";

function App() {
  const auth = getAuth(app);

  const [init, setInit] = useState<boolean>(false); //auth 체크 전
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser); //auth 체크 후

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer />
     {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader/>}
    </>
  );
}

export default App;
