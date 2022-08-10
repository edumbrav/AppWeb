
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from '../firebase'
import {

  FormGroup,
} from "reactstrap";
import { useHistory } from "react-router-dom";
const BotonTD = (datos) => {

  let history = useHistory();
  const [newTipoBanco, setnewTipoBanco] = useState();
  const [disable, setDisable] = useState(true);
  const [cuentas, guardarCuentas] = useState([]);
  var data = datos.datos




  useEffect(() => {
    const obtenerDatos = async () => {

      try {

        const snapshot2 = await db.collection('cuentas').where("estado", "==", true).get()
        const arrayData2 = snapshot2.docs.map((doc) => (
          {
            id: doc.id,
            ...doc.data()
          }))
        guardarCuentas(arrayData2)
      } catch (error) {
        console.log(error);

      }
    }
    obtenerDatos()
  }, [])

  function handleClick() {
    history.push("/ReservaP/");
  }

  const continuar = async () => {


    if ((data.startDate != null) && (data.endDate != null) && data.comprobarFecha) {
      alert("Su reserva esta en pendiente de aprobacion")

      var currentUser = (auth.currentUser.email)
      const user = await db.collection('usuarios').doc(currentUser).collection("reservas").add({
        cancelada: false,
        diasFuera: data.diasFuera,
        endDate: data.endDate,
        estado: false,
        existencia: false,
        idCliente: currentUser,
        imagen: data.imagen,
        imagenes: data.imagenes,
        metodoPago: ["Transferencia Bancaria", newTipoBanco],
        nombre: data.nombre,
        precio: data.precio,
        startDate: data.startDate,
        total: data.total,
        idRoom: data.idRoom,
        comprobantePago: ""
      }
      )

      handleClick();


    }
    else {
      alert("Ingrese fecha de Inicio y Fin para continuar");
    }
  }

  return (
    <div className="boton-t">

      <FormGroup>
        <label>
          Transferencia/Depositos
        </label>

        <select key={"select"} style={{ width: 180 + 'px' }} onChange={(event) => {
          setnewTipoBanco(event.target.value);
          setDisable(false);


        }} className="form-control">
          <option key={"hidden"} hidden>Seleccione un Banco</option>
          {cuentas.map((cuenta) => {
            return <option key={cuenta.id}>{cuenta.TipoBanco}</option>
          })}

        </select>
        <br></br>

        <button disabled={disable} className="btn btn-block btn-outline-primary" data-toggle="modal" onClick={
          () => {
            continuar();
          }
        }>
          Continuar
        </button>


      </FormGroup>

    </div>

  );
}

export default BotonTD
