import "./App.scss"
import {makeStyles} from '@mui/styles'
import Header from "./Components/Header";
import { Routes , Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
function App() {

  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor: "#14161a",
      color:"white",
      minHeight:"100vh"
    }
  }))
  const classes = useStyles()
  

  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coins/:id" element={<Coinpage />} />
      </Routes>
    </div>
  );
}

export default App;
