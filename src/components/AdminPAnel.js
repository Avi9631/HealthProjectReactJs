import React, { Component } from 'react'
import axios from 'axios';

class AdminPAnel extends Component {

    constructor(props) {
        super(props)
        this.handleaddDoc = this.handleaddDoc.bind(this);
        this.handledeleteDoc = this.handledeleteDoc.bind(this);
    }

    handleaddDoc(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const API_URL = 'http://localhost:8080/admin/adddoctor';

        const postdata = {
            "id": data.get('email'),
            "name": data.get('name'),
            "address": data.get('address'),
            "dob": data.get('dob'),
            "password": data.get('password'),
            "experience": data.get('experience'),
            "email": data.get('email'),
            "mobile": data.get('mobile'),
            "gender": data.get('gender'),
            "specialization": data.get('specialization'),
            "userrole": ""
        };
        axios.post(API_URL, postdata, {
            headers: {
                authorization: localStorage.getItem('key')
            }
        })
            .then(res => {
                const datas = res.data;
                console.log(datas);
                if (res.data === true) {
                    alert('Doctor Registered successfully!');
                } else {
                    alert('Email Already Exists');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    handledeleteDoc(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const API_URL = 'http://localhost:8080/admin/delete?id=' + data.get('email');

        axios.get(API_URL, {
            headers: {
                authorization: localStorage.getItem('key')
            }
        })
            .then(res => {
                const datas = res.data;
                console.log(datas);
                alert('Doctor Deleted successfully!');

            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="row" style={{ padding: "10px" }}>
                <div className="col-md-6">
                    <h2>ADD DOCTOR</h2>
                    <form onSubmit={this.handleaddDoc}>
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="Your Email" />
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control" name="name" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <input type="date" className="form-control" name="dob" placeholder="Your DOB" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder="Your Password" />
                        </div>
                        <div className="form-group">
                            <input type="tel" className="form-control" name="mobile" placeholder="Your mob" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="address" placeholder="Your Address" />
                        </div>
                        <div className="form-group">
                            <input type="number" className="form-control" name="experience" placeholder="Your Experience" />
                        </div>

                        <div className="form-group">
                            <select id="ticket-type" name="gender" className="form-control">
                                <option value="">-- Select Gender --</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select id="ticket-type" name="specialization" className="form-control">
                                <option value="">-- Select Specialization --</option>
                                <option value="cardioraphy">Cardiography</option>
                                <option value="neurology">Neurology</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-danger">Add Doctor</button>
                        </div>
                    </form>
                </div>

                <div className="col-md-6">
                    <h2>DELETE DOCTOR</h2>
                    <form onSubmit={this.handledeleteDoc}>
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="Your Email" />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-danger">Delete</button>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default AdminPAnel
