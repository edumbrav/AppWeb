import React, { useEffect, useState } from "react";
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero'
import Title from '../components/Title';
import {getPromociones} from '../Data/PromocionesData';


const Promociones = () => {
    
    const [promociones, setPromociones] = useState([]);
    const getlist = async () => { 
        try {
            const list = await getPromociones();
            setPromociones(list);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        getlist();
    }, []);

    const Card = (props) => (
        <div className="col mb-4"> 
            <div className="card text-center shadow-lg h-100">
                    <div id="cardPromocionHeader" className="card-header " width="100px">{props.data.Titulo}</div>
                    <div className="row g-0 h-100">
                        <div className="col-md-7">
                            <div className="card-body">
                                <p className="card-text mb-1">Fecha inicio: {props.data.f_inicial}</p>  
                                <p className="card-text">Fecha fin: {props.data.f_final}</p> 
                                <p className="card-text">Cantidad: {props.data.Cantidad}% descuento</p>  
                            </div>
                        </div>
                        <div className="col-md-5">
                            <img src={props.data.Imagen}  className="card-img-top h-100 " alt="..."></img>
                        </div>
                </div>
                <div id="cardPromocionFooter" className="card-footer ">Duracion: {props.data.Duracion}</div>
            </div>
        </div>
    )
    return (
        <div>
                <Hero hero="promocionesHero"></Hero>
                <Banner title="Promociones" subtitle="Por formar parte de nuestra página disfruta estas promociones">
                        <Link to="/" className="btn btn-primary">
                            Volver al Inicio
                        </Link>
                </Banner>

                <div className=" mb-5 p-5">
                    <Title title="Promociones Disponibles" />
                    <div className="row row-cols-1 row-cols-md-3 mt-5">
                            <> 
                            {promociones.map((info, i) => (
                                 <Card data={info} key={i}></Card>
                             ) )}
                            
                            </>
                    </div>
                </div>
        </div>
    )
}

export default Promociones
