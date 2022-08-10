import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
import { auth, db } from '../firebase'
import 'moment/locale/es'
export const habitacionContext = React.createContext()

const PreReserved = ({datosT}) => {


    
 
    const prueba = () => {

    }



    return (

        <div className="container my-10 mt-5 p-5">
            <div className="row mt-6 ">
                <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4  mt-10">
                    <div>
                        <h1 className="display-4  mt-10">Detalles de Reserva</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12 my-auto">
                            
                        </div>
                        <div className="col-md-6 col-12 my-auto">
                            <h1>Detalle </h1>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>ID room</th>
                                        <td>{}</td>
                                    </tr>
                                    <tr>
                                        <th>Nombre</th>
                                        <td>{}</td>
                                    </tr>


                                </thead>
                            </table>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <h6 className="font-weight-bolder"> Desde :  {} </h6>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <h6 className="font-weight-bolder">Hasta :  {}  </h6>
                            </div>
                        </div>
                    </div>


                    <div className="row p-2">


                        <div className="col-md-6 col-12 my-4 ">
                            <mark> Hostería Rios y Montaña le recuerda que debe realizar el pago de la reserva en un periodo máximo de 2 días.</mark>
                            <p></p>
                            <p>Realizar el depósito a la cuenta # ---------------</p>
                            <p>Titular de la cuenta: --------------</p>
                            <p>Número de cédula del titular: ----------</p>
                            <p></p>
                            <h6 className="font-weight-bold">Total a pagar: <span className="text-primary">${}</span></h6>

                        </div>

                        <button onClick={() => prueba()}> OK </button>
                    </div>
                </div>
            </div>
        </div>

    )

}
export default withRouter(PreReserved) 