import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

//cambio a español
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

moment.locale('es');

const localizer = momentLocalizer(moment)

const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2,'hours').toDate(),
    user: {
        _id: '123',
        name: 'Sebastian'
    }
}]

export const CalendarScreen = () => {
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onDoubleClick = (e) =>{
        console.log(e)
    }

    const onSelectEvent = (e) =>{
        console.log(e)
    }

    const onViewChange = (e) =>{
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    


    //Personaliza la caja donde se muestra el evento en las ventanas

    const eventStyleGetter = () =>{

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }
        return {
            style
        }

    }

    return (
        <div className = "calendar-screen">
            <Navbar/>
            <Calendar
                localizer={localizer}
                events={ events }
                startAccessor="start"
                endAccessor="end"
                //Personaliza los mensajes en la barra superior
                messages = { messages }
                //otorga estilos a la caja del evento
                eventPropGetter = { eventStyleGetter }
                //maneja la caja donde esta el evento
                components = { {
                    event: CalendarEvent
                } }
                onDoubleClickEvent = { onDoubleClick }
                onSelectEvent = { onSelectEvent }
                onView = { onViewChange }
                //define la vista que muestra el calendario
                view = {lastView}
            />

            <CalendarModal/>
        </div>
    )
}
