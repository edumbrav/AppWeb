import React from 'react'
import {db} from '../firebase'
import RoomDisplay from '../components/RoomDisplay'
 

export default function  RoomFinal({room}){
   // console.log("consulta PROPS",room)
    const [habitaciones, setHabitaciones] = React.useState([])
   
    React.useEffect(() => {
     
        const obtenerDatos = async (room) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            
            //console.log(parseInt(room, 10))
              try {
                if (room === "Habitaciones"){
                    const snapshot = await db.collection('productos').get();
                    const arrayData=snapshot.docs.map((doc) => (
                        {
                        ...doc.data()
                    }))
                    setHabitaciones(arrayData)
                }
                else if(Number.isInteger((parseInt(room, 10))))
                {
                 
                    const snapshot = await db.collection('productos').where('precio','<',(parseInt(room, 10))).get()
                    const arrayData=snapshot.docs.map((doc) => (
                        {
                        ...doc.data()
                    }))
                    setHabitaciones(arrayData)
                }
                
                else {
                    const snapshot = await db.collection('productos').where('categoria','==',room).get()
                    const arrayData=snapshot.docs.map((doc) => (
                        {
                        ...doc.data()
                    }))
                    setHabitaciones(arrayData)
                }   
            } catch (error) {
              console.log(error)
            }
          }
          obtenerDatos(room)   
    }, [ room ])

    return (
        <section className="container " >
            <div className="row my-5 ">
                {habitaciones.map((habitacion,index) => {
                    return <RoomDisplay 
                    key={index}
                    habitacion={habitacion}/>;               
            })}
            </div>
        </section>
    )
}

 
