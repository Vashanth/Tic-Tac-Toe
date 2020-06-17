import React from  'react'
import {Link} from 'react-router-dom'
import "./Mode.css"

const Mode = () =>
{
        return (
            <div class="container">
                <center><h2>CHOOSE PLAYER</h2></center>
                <div class="row">
                    <div  className="col-md-6">
                        <Link to="/play/o">
                            <div className="left">
                                <img src="https://pluspng.com/img-png/letter-o-png-open-2000.png"/>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Link to="/play/x">
                            <div className="right">
                            <img src="https://www.dreamincode.net/forums/uploads/post-97990-1260678617.png"/>   
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
}

export default Mode