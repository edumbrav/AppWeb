
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
import { auth, db, storage } from '../firebase'
import 'moment/locale/es'
export const habitacionContext = React.createContext()

const Reserved = ({ habitacion2 }) => {
    const desde = moment(habitacion2.startDate.toDate()).format('LL')
    const hasta = moment(habitacion2.endDate.toDate()).format('LL')
    const { id, idCliente } = habitacion2
    const [cuenta, guardarCuentas] = useState([]);
    const [numero, setNumero] = useState();
    const [numeroC, setNumeroC] = useState();
    const [titular, setTitular] = useState();
    const [image, setImage] = useState()
    var usuario = auth.currentUser;
    const [url, setUrl] = React.useState("")


    const enviar = async (e) => {
        e.preventDefault()

        if ((image != null)){
            uploadFile(image)
            alert("Su comprobante a sido enviado")
        }else{
            alert("No ha seleccionado imagen ")
        }
    }
    const prueba = () => {

        console.log(cuenta[0])
    }

    useEffect(() => {
        const obtenerDatos = async () => {

            try {

                const snapshot2 = await db.collection('cuentas').where("estado", "==", true).where("TipoBanco", "==", habitacion2.metodoPago[1]).get()
                const arrayData2 = snapshot2.docs.map((doc) => (
                    {
                        ...doc.data()
                    }))
                guardarCuentas(arrayData2)
                setNumero(arrayData2[0].Numero)
                setNumeroC(arrayData2[0].NumeroCedula)
                setTitular(arrayData2[0].Titular)
            } catch (error) {
                console.log(error);

            }
        }
        obtenerDatos()
    }, [])

    const cancelarReserva = async () => {
        alert("¿Esta seguro de cancelar la reserva?")
        await db.collection('usuarios').doc(idCliente).collection('reservas').doc(id).update({ cancelada: true })
        window.location.reload(true)
    }

    const selectFile = imagen => {
        console.log(imagen.target.files[0])
        if (imagen.target.files[0]) {
            setImage(imagen.target.files[0])
        }
    }

    const uploadFile = async (image) => {
        console.log("ACTUALIZAR IMAGEN")
        try {
            const imgref = await storage.ref().child(usuario.email).child("Imagen")
            await imgref.put(image)
            const imgURL = await imgref.getDownloadURL()
            setUrl(imgURL);
                await db.collection('usuarios').doc(idCliente).collection('reservas').doc(id).update(
                {
                    comprobantePago: imgURL
                }
            )

            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }


    return (

        <div className="container my-10 mt-5 p-5">
            <div className="row mt-6 ">
                <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4  mt-10">
                    <div>
                        <h1 className="display-4  mt-10">Reserva Pendiente</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12 my-auto">
                            <img src={habitacion2.imagen} className="img-fluid" alt="selected room" />
                        </div>
                        <div className="col-md-6 col-12 my-auto">
                            <h1>Detalle </h1>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>ID room</th>
                                        <td>{habitacion2.idRoom}</td>
                                    </tr>
                                    <tr>
                                        <th>Nombre</th>
                                        <td>{habitacion2.nombre}</td>
                                    </tr>


                                </thead>
                            </table>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <h6 className="font-weight-bolder"> Desde :  {desde} </h6>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <h6 className="font-weight-bolder">Hasta :  {hasta}  </h6>
                            </div>
                        </div>
                    </div>

                    <div className="row p-2">


                        <div className="col-md-6 col-12 my-4">
                            <mark> Hostería Rios y Montaña le recuerda que debe realizar el pago de la reserva en un periodo máximo de 2 días.</mark>
                            <p></p>
                            <p>Realizar el depósito a la cuenta # {numero}</p>
                            <p>Titular de la cuenta: {titular}</p>
                            <p>Número de cédula del titular: {numeroC}</p>
                            <h6 className="font-weight-bold">Total a pagar: <span className="text-primary">${habitacion2.total}</span></h6>
                            

                        </div>
                        <input onChange={selectFile} type="file" className="imput-file" />
                    </div>
                    <button onClick={enviar} className='boton-alado'>Envia Comprobante de Pago</button>
                    <button className="boton-cancelar" onClick={() => cancelarReserva()}> Cancelar Reserva </button>

                </div>
            </div>
        </div>


    )

}
export default withRouter(Reserved) 