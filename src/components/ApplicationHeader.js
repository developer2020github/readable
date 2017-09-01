import React from 'react';
import '../libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';
import { Link } from 'react-router-dom'; 

const ApplicationHeader = (props) => {
    let header = <h3>Readable: content and comments</h3>
    if (props.inludeLink){
       header = <Link to="/">{header}</Link>
    }

    return (

        <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
                <div className="panel panel-header app-background">
                    {header}
                </div>

            </div>
        </div>
    )

};

export default ApplicationHeader; 