import React from 'react'
import './styles/card.css'
import { connect } from 'react-redux'
import { Link, useLocation } from "react-router-dom"

function CardDetailComponent(props) {
    let location = useLocation();
    return (

        < div >
            {console.log('location', location)}
            <div className=" header container-fluid">
                <h3 className="header-title">Welcome to Card Details</h3>
            </div>

            <div className=" cardss container-fluid">
                <div className="card col-lg-12  ">
                    <div className="card-header bg-transparent border-success">
                        <h5 className="card-title text-success"> Card Id: {location.state.id}</h5>
                    </div>
                    <div className="card-body ">
                        <h5 className="card-title">Title:</h5>
                        <p className="card-text">{location.state.title}</p>

                    </div>
                    <div className="card-body ">
                        <h5 className="card-title">BODY:</h5>
                        <p className="card-text">{location.state.body}</p>
                    </div>
                </div>

            </div>


        </div >
    )
}

const mapStateToProps = ({ cardReducer }) => {
    console.log("cardReducer", cardReducer)
    return {
        cardlist: cardReducer.cardlist
    }
}


export default connect(mapStateToProps, null)(CardDetailComponent)
