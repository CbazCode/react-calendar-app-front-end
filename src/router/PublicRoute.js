import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PublicRoute = ({
  isAuthenticated,
  component: Component, //solo estoy renombrando component por Component  
  ...rest //resto de propiedades como el exact, path , etc
}) => {
    return (
        <Route {...rest}
            component = {(props)=>( //recibe el history, location y demas propiedades que da el router a las route
                (!isAuthenticated)
                ? (<Component {...props}/>)//y se lo pasamos al componente para que no las pierda
                : (<Redirect to = '/'/>)
            )}    
        />

     
    )
}

PublicRoute.prototype={
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired   
}
