import React, { Component } from 'react'
import axios from 'axios'

class DoctorInterface extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id: "",
            user: []
        }
        this.uploadPrescip = this.uploadPrescip.bind(this);
    }

    uploadPrescip(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const API_URL = "http://localhost:8080/doctor/uploadPrescrip?id="
            + data.get("id") + "&prescrip=" + data.get("prescrip");
        axios.get(API_URL, {
            headers: {
                authorization: localStorage.getItem('key')
            }
        })
            .then(response => {
                alert("Prescription Uploaded");
                window.location = "/docarea";
            })
            .catch(err => {
                console.log(err);
            });
    }


    componentDidMount() {
        const API_URL = 'http://localhost:8080/doctor/getAppoint?' + 'id=' + localStorage.getItem("user_id");
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
    }

    render() {

        const datatlst = this.state.data.filter(s => s.status.includes("Pending"))
            .map(x => {
                return (
                    <li style={{ backgroundColor: "#d6d6d6", padding: "10px", border: "2px solid black" }}>
                        <p>App Date : {x.slot}  ||  Status : {x.status}</p>
                        <p>Prescription : {x.prescrip}</p>
                        <button className="btn btn-danger" data-toggle="modal"
                            data-target="#userdetails-ticket-modal" onClick={() => {
                                // this.setState({
                                //     ...this.state, id: x.userid
                                // });
                                // console.log(x.userid);
                                const API_URL= "http://localhost:8080/doctor/getuser?id="+x.userid;
                                axios.get(API_URL, {
                                    headers: {
                                        authorization: localStorage.getItem('key')
                                    }
                                })
                                    .then(res => {
                                        this.setState({...this.state,  user: res.data });
                                        console.log(res.data);
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    });
                            }}>Show Patient Details</button>
                        <button className="btn bnt-danger" onClick={() => {
                            const API_URL = 'http://localhost:8080/doctor/accept?id=' + x.id;
                            axios.get(API_URL, {
                                headers: {
                                    authorization: localStorage.getItem('key')
                                }
                            })
                                .then(res => {
                                    const datas = res.data;
                                    alert("Accepted");
                                    window.location = "/docarea";
                                })
                                .catch(err => {
                                    console.log(err)
                                });
                        }}>Accept</button>
                        <button className="btn bnt-danger" onClick={() => {
                            const API_URL = 'http://localhost:8080/doctor/reject?id=' + x.id;
                            axios.get(API_URL, {
                                headers: {
                                    authorization: localStorage.getItem('key')
                                }
                            })
                                .then(res => {
                                    const datas = res.data;
                                    alert("Rejected");
                                    window.location = "/docarea";
                                })
                                .catch(err => {
                                    console.log(err)
                                });
                        }}>Reject</button>
                    </li>
                );
            });

        const datatlst1 = this.state.data.filter(s => s.status.includes("Accepted"))
            .map(x => {
                return (
                    <li style={{ backgroundColor: "#d6d6d6", padding: "10px", border: "2px solid black" }}>
                        <p>App Date : {x.slot}  ||  Status : {x.status}</p>
                        <p>Prescription : {x.prescrip}</p>
                        <button className="btn bnt-danger" data-toggle="modal"
                            data-target="#userdetails-ticket-modal" onClick={() => {
                                const API_URL= "http://localhost:8080/doctor/getuser?id="+x.userid;
                                axios.get(API_URL, {
                                    headers: {
                                        authorization: localStorage.getItem('key')
                                    }
                                })
                                    .then(res => {
                                        this.setState({...this.state,  user: res.data });
                                        console.log(res.data);
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    });
                            }}>Show Patient Details</button>
                        <form onSubmit={this.uploadPrescip}>
                            <input type="text" name="id" style={{ pointerEvents: "none" }} value={x.id} />
                            <input type="text" name="prescrip" placeholder="Prescription" />
                            <input type="submit" value="Upload" />
                        </form>
                    </li>
                );
            })


        return (
            <div className="row" style={{ padding: "10px" }}>
                <div className="col-md-6">
                    <h1>Upcoming Appointments</h1>
                    <ul>
                        {datatlst}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h1>Scheduled Appointments</h1>
                    <ul>
                        {datatlst1}
                    </ul>
                </div>
                <div id="userdetails-ticket-modal" className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title ">User Detail</h4>

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <h6>Name : {this.state.user.name}</h6>
                            <h6>DOB : {this.state.user.dob}</h6>
                            <h6>Gender : {this.state.user.gender}</h6>
                        </div>
                    </div>
                </div>
               
            </div>
            
        )
    }
}

export default DoctorInterface
