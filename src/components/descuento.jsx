
import React, { useState, useEffect } from "react";
import { auth, db } from '../firebase'
import {

    FormGroup,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { consoleSandbox } from "@sentry/utils";
const Descuento = (datos) => {

    const [promo, guardarPromo] = useState([]);
    var data = datos.isLoggedIn

 

    function UserGreeting() {
        return (
            <>
                <h6 className="font-weight-bold">Precio por día : <span className="text-primary">$ {data.precio}</span>  </h6>
                <h6>Por <b>{data.promo}</b> tienes un descuento del: {data.descuento} % </h6>
                <h6 className="font-weight-bold">Total a pagar : <span className="text-primary">$ {data.total}</span></h6>
                <h6 className="font-weight-bold">Total a pagar (con descuento): <span className="text-primary">$ {(data.total) - (data.total * (data.descuento / 100))}</span></h6>

            </>);
            
        data.total = (data.total) - (data.total * (data.descuento / 100))


    }

    function GuestGreeting() {
        return (
            <>
                <h6 className="font-weight-bold">Precio por día : <span className="text-primary">$ {data.precio}</span>  </h6>
                <h6 className="font-weight-bold">Total a pagar : <span className="text-primary">$ {data.total}</span></h6>

            </>
        );
    }

    function Greeting() {
        /* console.log(isLoggedIn.startDate)
        console.log(promo) */

        if (data.isLoggedIn) {

            return <UserGreeting ></UserGreeting>
        }
        return <GuestGreeting></GuestGreeting>
    }


    return (

        <div className="col-md-6 col-12 my-4 ">

            <Greeting />


        </div>

    );
}

export default Descuento;
