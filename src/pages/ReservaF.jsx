
import React from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/es'
export const habitacionContext=React.createContext()
const ReservaF = ({habitacion2}) => {


    const desde=  moment(habitacion2.startDate.toDate()).format('LL')
    const hasta=  moment(habitacion2.endDate.toDate()).format('LL')
    
    return (
        <>
        {habitacion2.existencia&&<div className="container my-10 mt-5 p-5">
        <div className="row mt-6 ">
            <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4  mt-10">
                <div>
                    <h1 className="display-4  mt-10">Reserva Finalizada</h1>
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
                                <h6 className="font-weight-bolder">Días de reserva: {habitacion2.diasFuera}</h6>
                                
                            </div>
                        
                            <div className="col-md-6 col-12 my-4 ">
                                <h6 className="font-weight-bold">Total Pagado: <span className="text-primary">${habitacion2.total}</span></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            </>
        )

    }
export default withRouter(ReservaF) 