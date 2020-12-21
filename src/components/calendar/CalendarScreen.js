import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

//cambio a español
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages'

moment.locale('es');

const localizer = momentLocalizer(moment)

const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2,'hours').toDate()
}]

export const CalendarScreen = () => {

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
                messages = {messages}
                eventPropGetter = {eventStyleGetter}
                // style={{ height: 500 }}
            />
        </div>
    )
}
