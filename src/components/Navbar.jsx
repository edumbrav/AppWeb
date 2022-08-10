import React, { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import jquery from 'jquery';
import rym from '../images/rym.jpg'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
// for changing navbar  color
import { auth } from '../firebase'

jquery(window).scroll(function () {
    jquery('nav').toggleClass('scrolled', jquery(this).scrollTop() > 0);
})


const Navbar = (props) => {

    const [dropdown, setdropdown] = useState(false);

    const abrircerrardropdown = () => {
        setdropdown(!dropdown)
    }
    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/Login')
            })
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark py-2 sticky-top ">
                <div className="container d-flex justify-content-center  p-1">
                    <div className="ml-2 mb-4 mb-lg-0 ">
                        <img src={rym} alt="logo-rios-y-montañas" width="230" height="230" className="img-fluid " />
                        <button className="navbar-toggler ml-2 "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#responsive-navbar-nav"
                            aria-controls="responsive-navbar-nav"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span>
                                <FaAlignRight className="nav-icon" /></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="responsive-navbar-nav">
                        <ul className="navbar-nav mr-auto mb-2 ">
                            <li className="nav-item">
                                <NavLink className="nav-link  " activeClassName="active_class" exact to="/">Inicio</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link  " activeClassName="active_class" exact to="/rooms">Habitaciones</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link  " activeClassName="active_class" exact to="/Actividades">Actividades</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active_class" exact to="/Nosotros">Nosotros</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active_class" exact to="/Contact">Contáctanos</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="navbar-collapse collapse w-100 order-3 justify-content-end dual-collapse2" id="navbarSupportedContent">


                        {
                            props.firebaseUser !== null ? (
                                <ul className="navbar-nav ml-auto "  >
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact to="/Promociones">Promociones</NavLink>
                                    </li>

                                    <li className="dropdown first">
                                        <Dropdown isOpen={dropdown} toggle={abrircerrardropdown} >
                                            <DropdownToggle className="botonDropdown">
                                                Mis Reservas
                                            </DropdownToggle>
                                            <DropdownMenu className="menu-item-drop">
                                                <DropdownItem tag={Link} to="/Reserva/" className='item-drop'>Reservas Aprobadas</DropdownItem>
                                                <DropdownItem tag={Link} to="/ReservaP/" className='item-drop'>Reservas en Curso</DropdownItem>
                                                <DropdownItem tag={Link} to="/ReservasF/" className='item-drop'>Reservas Finalizadas</DropdownItem>
                                                <DropdownItem tag={Link} to="/ReservasC/" className='item-drop'>Reservas Canceladas</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>

                                    </li>


                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact to="/Profile/">Perfil</NavLink>
                                    </li>
                                    <li className="nav-item text-center">
                                        <button className="btn btn-outline-light text-center" onClick={() => cerrarSesion()}>Cerrar Sesión</button>
                                    </li>
                                </ul>


                            ) : (
                                <ul className="navbar-nav ml-auto "  >
                                    <li className="nav-item">
                                        <NavLink className="nav-link ml-auto" to="/Login">Login</NavLink>
                                    </li>

                                </ul>

                            )
                        }


                    </div>

                </div>
            </nav>
        </>
    );
}
export default withRouter(Navbar)