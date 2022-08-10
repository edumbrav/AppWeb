import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'
import { RoomContext } from '../context/RoomProvider';
import { db } from '../firebase';
import BotonPayPal from "../components/botonPaypal";
//import BotonPayphone from "../components/botonPayphone";
import BotonTransferencia from "../components/botonTranferencia"
import { Form, FormGroup } from 'reactstrap';
import Descuento from '../components/descuento';


registerLocale("es", es)


export const habitacionContext = React.createContext()


export default class Booknow extends Component {

    userData;

    constructor(props) {
        super(props);

        this.state = {
            nombre: "",
            precio: 0,
            total: 0,
            diasFuera: 0,
            idRoom: "",
            imagen: "",
            imagenes: [],
            existencia: "",
            startDate: null,
            endDate: null,
            idCliente: "",
            metodoPago: "",
            cancelada: "",
            estado: "",
            fechas: [],
            fechas2p: [],
            enable: true,
            clear: false,
            isLoggedIn: false,
            promo: "",
            descuento: 0,
            comprobarFecha: false,

        };

        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);

    }
    handleCrearFecha = (date) => {
        let fechas = [...this.state.fechas];
        let fechas2p = [...this.state.fechas2p];

        //add
        fechas.push(date)
        fechas2p.push(date)

        //update
        this.setState({ fechas })
        this.setState({ fechas2p })
    }

    handleChangeStart(date) {


        this.setState({
            startDate: date,
            endDate: "",
            isLoggedIn: false
        });

        let fechas2p = [...this.state.fechas2p];

        //add
        fechas2p.push(date)

        //update
        this.setState({ fechas2p })

        //active
        if (date == null) {
            this.setState({
                enable: true,
                isLoggedIn: false
            })
        } else {
            this.setState({
                enable: false
            })
        }

    }
    handleChangeEnd(date) {


        if (date != null) {
            this.setState({
                endDate: date,
                isLoggedIn: false,
                comprobarFecha: true
            });
            this.comprobarReservaEntreDias()
            this.comprobarPromocion()
        }
        else{
            this.setState({comprobarFecha: false})
        }

    }
    componentDidMount() {//para que sacar los dias donde ya hay reserva y bloquearlos
        this.setState({ 
            isLoggedIn: false        
        });
        db.collectionGroup('reservas').where("existencia", "==", true).where("nombre", "==", this.state.nombre).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var fechai = (doc.data().startDate.seconds) * 1000; var fechaf = (doc.data().endDate.seconds) * 1000;
                fechai = new Date(fechai); fechaf = new Date(fechaf)
                var fechaformatoi = fechai.getFullYear().toString() + "/" + fechai.getMonth().toString() + "/" + fechai.getDate().toString();
                var fechaformatof = fechaf.getFullYear().toString() + "/" + fechaf.getMonth().toString() + "/" + fechaf.getDate().toString();
                fechaformatoi = new Date(fechaformatoi);
                fechaformatof = new Date(fechaformatof);
                while (fechaformatof.getTime() >= fechaformatoi.getTime()) {
                    this.handleCrearFecha(new Date(fechaformatoi.getFullYear(), (fechaformatoi.getMonth() + 1), fechaformatoi.getDate()));
                    fechaformatoi.setDate(fechaformatoi.getDate() + 1);
                }

            })
        })
    }
    /*    obtenerDias() {
          var fechasBloqueadas = [];
          db.collectionGroup('reservas').where("existencia", "==", true).where("nombre", "==", this.state.nombre).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  var fechai = (doc.data().startDate.seconds) * 1000; var fechaf = (doc.data().endDate.seconds) * 1000;
                  fechai = new Date(fechai); fechaf = new Date(fechaf)
                  var fechaformatoi = fechai.getFullYear().toString() + "/" + fechai.getMonth().toString() + "/" + fechai.getDate().toString();
                  var fechaformatof = fechaf.getFullYear().toString() + "/" + fechaf.getMonth().toString() + "/" + fechaf.getDate().toString();
                  fechaformatoi = new Date(fechaformatoi);
                  fechaformatof = new Date(fechaformatof);
                  while (fechaformatof.getTime() >= fechaformatoi.getTime()) {
                      fechasBloqueadas[fechasBloqueadas.length] = new Date((fechaformatoi.getFullYear(), (fechaformatoi.getMonth() + 1), fechaformatoi.getDate()))
                      this.handleCrearFecha(new Date(fechaformatoi.getFullYear(), (fechaformatoi.getMonth() + 1), fechaformatoi.getDate()));
                      fechaformatoi.setDate(fechaformatoi.getDate() + 1);
                  }
  
              })
          })
  
          return fechasBloqueadas;
      } 
   */

    calculateDaysLeft(startDate, endDate) {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);
        return endDate.diff(startDate, "days");
    }

    comprobarPromocion() {
        var fechai; var fechaf;
        var BreakException = {};
        try {
            db.collection('Promociones').where("existencia", "==", true).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    fechaf = doc.data().f_inicial
                    fechai = doc.data().f_final
                    var fecha_min = (new Date(fechai))
                    var fecha_max = (new Date(fechaf))
                    fecha_min.setDate(fecha_min.getDate() + 1)
                    fecha_max.setDate(fecha_max.getDate() + 1)
                    var fecha_inicial = (this.state.startDate)
                    var fecha_final = (this.state.endDate)
                    console.log(fecha_inicial+" "+fecha_final)
                    console.log(fecha_max+" "+fecha_min)
                    if ((fecha_inicial >= fecha_max && fecha_final <= fecha_min)) {
                        console.log(this.state.comprobarFecha)
                        this.setState({
                            isLoggedIn: true,
                            promo: doc.data().Titulo,
                            descuento: doc.data().Cantidad
                        })
                        throw BreakException;

                    }else{
                        this.setState({
                            isLoggedIn: false
                        })
                    }
                })
            })

        } catch (e) {
            if (e !== BreakException) throw e;

        }
    }

    comprobarReservaEntreDias() {

        db.collectionGroup('reservas').where("existencia", "==", true).where("nombre", "==", this.state.nombre).get().then((querySnapshot) => {
            var BreakException = {};
            try {
                querySnapshot.forEach((doc) => {
                    var fechai = (doc.data().startDate.seconds) * 1000; var fechaf = (doc.data().endDate.seconds) * 1000;
                    fechai = new Date(fechai); fechaf = new Date(fechaf)
                    var fechaformatoi = fechai.getFullYear().toString() + "/" + (fechai.getMonth() + 1).toString() + "/" + fechai.getDate().toString();
                    var fechaformatof = fechaf.getFullYear().toString() + "/" + (fechaf.getMonth() + 1).toString() + "/" + fechaf.getDate().toString();
                    fechaformatoi = new Date(fechaformatoi);
                    fechaformatof = new Date(fechaformatof);
                    var fecha_inicial = (this.state.startDate)
                    var fecha_final = (this.state.endDate)
                    if (fechaformatoi > fecha_inicial && fechaformatof < fecha_final) {
                        alert("No puedes hacer esta reserva porque hay una entre los dias que seleccionaste")
                        this.setState({
                            isLoggedIn: false,
                            endDate: "",
                            comprobarFecha: false
                        })
                        throw BreakException;
                    }
                })
            } catch (e) {
                if (e !== BreakException) throw e;
            }





        })

    }




    static contextType = RoomContext;

    render() {


        const room = this.context
        const { startDate, endDate } = this.state;
        const daysLeft = this.calculateDaysLeft(startDate, endDate);
        const total = daysLeft * room.room.precio
        this.state.precio = room.room.precio
        this.state.nombre = room.room.categoria
        this.state.idRoom = room.room.nombre
        this.state.total = total
        this.state.diasFuera = daysLeft
        this.state.existencia = false
        this.state.imagen = room.room.imagen
        this.state.cancelada = false
        this.state.estado = false



        return (
            <div className="container my-10 mt-5 p-5">
                <FormGroup>
                    <div className="row mt-6 ">
                        <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4  mt-10">
                            <div>
                                <h1 className="display-4  mt-10">Registro</h1>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-12 my-auto">
                                    <img src={room.room.imagen} className="img-fluid" alt="selected room" />
                                </div>
                                <div className="col-md-6 col-12 my-auto">
                                    <h1>Detalles de habitación</h1>
                                    <table className="table ">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>ID room</th>
                                                <td>{room.room.nombre}</td>
                                            </tr>
                                            <tr>
                                                <th>Capacidad</th>
                                                <td>2</td>
                                            </tr>

                                            <tr>
                                                <th>Desayuno</th>
                                                <td> Desayuno gratis incluido</td>
                                            </tr>
                                            <tr>
                                                <th>Mascotas </th>
                                                <td> No se admite</td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="Fromdate" className="font-weight-bolder mr-3" >Desde : </label>
                                        <DatePicker
                                            required
                                            locale="es"
                                            selected={this.state.startDate}
                                            onChange={this.handleChangeStart}
                                            className="form-control"
                                            placeholderText="Fecha de inicio"
                                            excludeDates={this.state.fechas}
                                            minDate={new Date()}
                                            dateFormat="MMMM d, yyyy"
                                            isClearable

                                        />


                                    </div>

                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="Todate" className="font-weight-bolder mr-3" >Hasta :    </label>
                                        <DatePicker
                                            required
                                            locale="es"
                                            disabled={this.state.enable}
                                            selected={this.state.endDate}
                                            minDate={this.state.startDate}
                                            onChange={this.handleChangeEnd}
                                            excludeDates={this.state.fechas.concat([this.state.startDate])}
                                            placeholderText="Fecha Fin"
                                            className="form-control"
                                            dateFormat="MMMM d, yyyy"
                                            value={this.handleChangeEnd}

                                        />



                                    </div>
                                </div>
                            </div>


                            <div className="row p-2">
                                <div className="col-md-6 col-12 my-4">
                                    <h6 className="font-weight-bolder">Días de reserva: {daysLeft}</h6>
                                    <mark>Nota: En caso de elegir transferencia Bancaria realizar el pago en un periodo máximo de dos días </mark>

                                </div>

                                <div className="col-md-6 col-12 my-4 ">


                                    <Descuento isLoggedIn={this.state} />




                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="payment" className="font-weight-bolder mb-1">Opciones de pago</label>

                                        <p></p>
                                        <BotonPayPal />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 my-4 ">
                                    <div className="col-md-6 col-12 float-right my-1 px-4">

                                    </div>
                                    <BotonTransferencia datos={this.state} />
                                </div>

                            </div>
                        </div>
                    </div>
                </FormGroup>
                <div className="modal fade" id="thanks">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body p-4">
                                <h3>Gracias! </h3>
                                <p className="lead">Su habitación ha sido registrada con éxito!....</p>
                            </div>
                            <div className="modal-footer">
                                <Link to="/" className="btn btn-dark">Ir al inicio</Link>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}