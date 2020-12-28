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
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment)



export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const { activeEvent } = useSelector( state => state.calendar );

    const { events } = useSelector( state => state.calendar );
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onDoubleClick = (e) =>{
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) =>{
        dispatch( eventSetActive(e) );
    }

    const onViewChange = (e) =>{
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = () =>{
        dispatch( eventClearActiveEvent() );
    }


    //Personaliza la caja donde se muestra el evento en las ventanas

    const eventStyleGetter = ( event, start, end , isSelected) =>{

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
                onSelectSlot = { onSelectSlot }
                selectable = { true }
                //define la vista que muestra el calendario
                view = {lastView}
            />
            <AddNewFab/>
            {
                (activeEvent) && <DeleteEventFab/>     
            }
            <CalendarModal/>
        </div>
    )
}
