import React, { Component } from 'react'
import { RoomContext } from '../context'
import Loading from './Loading';
import Room from './Rooms';
import Title from './Title'; 

export default class FeaturedRooms  extends Component {
    static contextType = RoomContext;
    render() {
        let { loading, featuredRooms : rooms } = this.context;
        console.log(rooms);
        rooms = rooms.map(room => {
            return <Room key={room.id} room={room}/>
        });
        return (
 
            <section className="featured-rooms container">
                <Title  title="Habitaciones más solicitadas" />
                <div className="row">
                  {loading ? <Loading/> : rooms}
                </div>
            </section>
        )
    }
}
