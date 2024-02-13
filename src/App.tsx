import { useEffect, useState, useContext } from "react"
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Router from "./components/Router";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './App.css';
import Loader from "components/Loader";

import ThemeContext from "context/ThemeContext";

function App() {
  const context = useContext(ThemeContext)
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
    <div className={context.theme === 'light' ? 'light' : 'dark'}>
      <ToastContainer />
     {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader/>}
    </div>
  );
}

export default App;
