//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Default page displayed if nothing else is found
//========================================================================================
import React from 'react';
import { Link } from 'react-router-dom';
import '../libs/bootstrap/dist/css/bootstrap.min.css'


const  DefaultPage = ()=> <div className="text-center"><h1>Error 404: page not found</h1><Link to="/">Back to main page</Link></div>

export default DefaultPage; 
