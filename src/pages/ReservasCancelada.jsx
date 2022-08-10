import React from 'react'
import { auth, db } from '../firebase'
import ReservaC from './ReservaC';

const ReservasC = (props) => {
    var id = auth.currentUser.email;//mail para el id
    const [habitaciones2, setHabitaciones2] = React.useState([])
    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const snapshot2 = await db.collection('usuarios').doc(id).collection("reservas").where("cancelada","==",true).get()

                const arrayData2 = snapshot2.docs.map((doc) => (
                    {
                        id: doc.id,
                        ...doc.data()
                    }))
                setHabitaciones2(arrayData2)
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

                {habitaciones2.map((habitacion2) => {
                    return <ReservaC
                        key={habitacion2.id}
                        habitacion2={habitacion2} />;
                })
                }

            </div>
        </>
    )
}
export default ReservasC;