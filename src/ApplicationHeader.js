import React from 'react';
import './libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';

const ApplicationHeader = (props) => {
    return (

        <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
                <div className="panel panel-header app-background">
                    <h3>Readable: content and comments</h3>
                </div>

            </div>
        </div>
    )

};

export default ApplicationHeader; 