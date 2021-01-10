import moment from 'moment';

export const prepareEvents = ( events = [] , uid) => {

    let eventsFilters = events.filter( (e) => {
        return (e.user._id === uid)
        } 
    )


    return eventsFilters.map( (e) => { 
        return {
            ...e,
            end: moment( e.end ).toDate(),
            start: moment( e.start).toDate()
        }
    })
}