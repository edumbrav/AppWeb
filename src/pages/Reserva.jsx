import React from 'react'
import { auth, db } from '../firebase'
import ReservaDisplay from './ReservaDisplay';
import Reserved from './Reserved';

const Reserva = (props) => {
  var id = auth.currentUser.email;//mail para el id
  const [habitaciones, setHabitaciones] = React.useState([])
  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const snapshot = await db.collection('usuarios').doc(id).collection("reservas").where("existencia", "==", true).where("estado","==",false).get()
        // console.log("data",snapshot)
        const arrayData = snapshot.docs.map((doc) => (
          {
            ...doc.data()
          }))

        setHabitaciones(arrayData)

      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  }
    , [])

  return (
    <>
      <div className="container">

        {habitaciones.map((habitacion, index) => {
          return <ReservaDisplay
            key={index}
            habitacion={habitacion} />;
        })}
      </div>
    </>
  )
}
export default Reserva