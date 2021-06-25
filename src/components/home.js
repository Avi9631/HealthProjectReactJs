import React, { Component } from 'react'
import image from './images/slider/banner.jpg'

export class Home extends Component {
    render() {
        return (
            <div>
                <div>

                    <div className="slider-detail">

                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">

                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src={image} alt="First slide" />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5 className=" bounceInDown">Health Platform</h5>
                                        <p className=" bounceInLeft">Best Virtual Doctor Appointment Application</p>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>
            </div>
        )
    }
}

export default Home