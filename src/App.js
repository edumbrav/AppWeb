import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Rooms from './pages/Rooms';
 
import SingleRoom2 from './pages/SingleRoom2';
import Error from './pages/Error';
import Navbar from './components/Navbar';
import About from './pages/About';
import Profile from './pages/Profile';
import Reserva from './pages/Reserva';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Booknow2 from './pages/Booknow2';
import Login from './pages/login';
import Reset from './components/Reset';
import {auth } from './firebase'
import RoomProvider from './context/RoomProvider'
import Actividades from './pages/Actividades';
import Promociones from './pages/Promociones';
import RoomsProvider from './context/RoomsProvider';
import ReservaP from './pages/ReservasPendientes';
import ReservasC from './pages/ReservasCancelada';
import ReservasF from './pages/ReservasFinalizadas';
import PreReserva from './pages/preReserva';

function App(props) {
  const [firebaseUser, setFirebaseUser] = React.useState(false)
  React.useEffect(() => {
      auth.onAuthStateChanged(user => {
          console.log(user)
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
  }, [])
  return firebaseUser !== false ?(
    <div className="App">
      <BrowserRouter>
      <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Nosotros" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/Actividades" component={Actividades} />
          <Route exact path="/Promociones" component={Promociones} />
          <RoomProvider>
          <RoomsProvider>
          <Route exact path="/Reserva/" component={Reserva}/>
          <Route exact path="/ReservaP/" component={ReservaP}/>
          <Route exact path="/ReservasC/" component={ReservasC}/>
          <Route exact path="/ReservasF/" component={ReservasF}/>
          <Route exact path="/rooms/" component={Rooms}/>
          <Route exact path="/Login/" component={Login}/>
          <Route exact path="/Profile/" component={Profile}/>
          <Route exact path="/Reset/" component={Reset}/>
          <Route exact path="/rooms/:categoria">
            <SingleRoom2/>
          </Route>
          <Route exact path="/booknow/:slug">
            <Booknow2/>
          </Route>   
          </RoomsProvider>
          </RoomProvider> 
          <Route component={Error}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
   ): (
    <div>Cargando...</div>
)
}


export default App;