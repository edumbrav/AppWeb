
import React from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/es'
export const habitacionContext=React.createContext()
const ReservaDisplay = ({habitacion}) => {
    const desde=  moment(habitacion.startDate.toDate()).format('LL')
    const hasta=  moment(habitacion.endDate.toDate()).format('LL')
    return (
        <div className="container  p-2">
        <div className="row  ">
            <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4  mt-4">
                <div>
                    <h1 className="display-4  ">Reserva Actual</h1>
                </div>
                    <div className="row">
                        <div className="col-md-6 col-12 my-auto">
                            <img src={habitacion.imagen} className="img-fluid" alt="selected room" />
                        </div>
                        <div className="col-md-6 col-12 my-auto">
                            <h1>Detalle </h1>
                            <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>ID room</th>
                                            <td>{habitacion.id}</td>
                                        </tr>
                                        <tr>
                                            <th>Nombre</th>
                                            <td>{habitacion.nombre}</td>
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
                                <h6 className="font-weight-bolder">Días de reserva: {habitacion.diasFuera}</h6>
                                <mark>Por favor, asegurese de realizar su salida en la hora indicada</mark>
                                
                            </div>
                        
                            <div className="col-md-6 col-12 my-4 ">
                                <h6 className="font-weight-bold">Precio por día : <span className="text-primary">${habitacion.precio}</span>  </h6>
                                <h6 className="font-weight-bold">Descuento : <span className="text-primary">$</span>  </h6>
                                <h6 className="font-weight-bold">Total a pagar: <span className="text-primary">${habitacion.total}</span></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
export default withRouter(ReservaDisplay) 