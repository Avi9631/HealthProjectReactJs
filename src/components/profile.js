import React, { Component } from 'react'
import './profile.css'
import axios from 'axios';

class Profile extends Component {

    constructor(props) {
        super(props)
        if (localStorage.getItem('key') == null || localStorage.getItem('key') == undefined) {
            window.location = '/';
            alert('Yor are not logged in');
        }
        this.state = {
            data: [],
            app: [],
            slot: ""
        }
    }

    componentDidMount() {
        const API_URL = 'http://localhost:8080/u/loadprofile?' + 'id=' + localStorage.getItem("user_id");
        const API_URL1 = 'http://localhost:8080/u/getAppoint?' + 'id=' + localStorage.getItem("user_id");
        axios.get(API_URL, {
            headers: {
                authorization: localStorage.getItem('key')
            }
        })
            .then(res => {
                const datas = res.data;
                this.setState({ ...this.state, data: datas });
                console.log(datas);
            })
            .catch(err => {
                console.log(err)
            });

        axios.get(API_URL1, {
            headers: {
                authorization: localStorage.getItem('key')
            }
        })
            .then(res => {
                const appa = res.data;
                this.setState({ ...this.state, app: appa });
                console.log(appa);
            })
            .catch(err => {
                console.log(err)
            });

    }

    slotget(sl){
        
    }


    render() {
        const dataList = this.state.app.map(x => {
            return (
                <li style={{ backgroundColor: "#d6d6d6", padding: "10px", border: "2px solid black" }}>
                    <p>Scheduled At: {x.date},
                     {
                         (x.slot === "s1")? "11:00 AM":(x.slot === "s2")? "12:00 PM": 
                         (x.slot === "s3")? "01:00 PM":(x.slot === "s5")? "03:00 PM":
                         (x.slot === "s5")? "04:00 PM": null
                     }  
                     
                     
                     ||  Status: {x.status}</p>
                    <p>Doctor Name: {x.docname}</p>
                    <p>Speciality: {x.docSpe}</p>
                    <p>Prescription: {x.prescrip}</p>
                    <button>Click here to start the meeting</button>
                </li>
            );
        });
        return (
            <div>
                <div class="container">
                    <div class="main-body">
                        <div class="row gutters-sm">
                            <div class="col-md-8">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Full Name</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.name}
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Email</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.email}
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Mobile</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.mobile}
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">gender</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.gender}
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Date of Birth</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.dob}
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                </div>

                            </div>
                        </div>
                        {(localStorage.getItem("user_role") === "[ROLE_USER]") ?
                            <div>
                                <h2>My Appointments :</h2>
                                <ul>
                                    {(dataList.length === 0) ? "No appointments booked yet" :
                                        dataList}
                                </ul>
                            </div> : null
                        }

                    </div>
                </div>

                <br />
                <br />
            </div>
        )
    }
}

export default Profile