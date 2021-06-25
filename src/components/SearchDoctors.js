import React, { Component } from 'react'
import image from './images/cardimg.jpg'
import axios from 'axios'
import BookApp from './BookAppointment'


class SearchDoctors extends Component {

    constructor(props) {
        super(props)

        if (localStorage.getItem('key') == null || localStorage.getItem('key') == undefined) {
            window.location = '/';
            alert('Yor are not logged in');
        }
        this.state = {
            data: [],
            id: "",
            dname: "",
            dspe: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        const API_URL = 'http://localhost:8080/u/getAllDoctor';
        axios.get(API_URL, {
            headers: {
                authorization: localStorage.getItem('key')
            }
        })
            .then(res => {
                const datas = res.data;
                this.setState({ data: datas });
                console.log(datas);
            })
            .catch(err => {
                console.log(err)
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        const API_URL = 'http://localhost:8080/u/searchDoctor?speciality=' + data.get('speciality');

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
            })
    }

    render() {
        var n1 = "";

        const dataList = this.state.data.map(x => {
            return (
                <div className="col-md-3 col-sm-6 vd">
                    <div className="bkjiu">
                        <img src={image} alt />
                        <h4>{x.name}</h4>
                        <p><b>Speciality: </b>{x.specialization}</p>
                        <p><b>Exp: </b>{x.experience} years</p>
                        {(localStorage.getItem('user_role') === "[ROLE_USER]") ?
                            <button className="btn btn-danger"
                                onClick={() => this.setState({ ...this.state, id: x.id, dname: x.name, dspe: x.specialization })}
                                data-toggle="modal"
                                data-target="#bookApp-ticket-modal">Book Now</button> : null
                        }

                    </div>
                </div>
            );
        });
        return (
            <div>
                <section id="process" className="donation-care">
                    <div className="container">
                        <div className="row session-title">
                            <h2>Search doctors</h2>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <select id="ticket-type" name="speciality" className="form-control">
                                            <option value>-- Select Speciality --</option>
                                            <option value="cardioraphy">Cardiology</option>
                                            <option value="neurology">Neurology</option>
                                            <option value="orthopaedic">Orthopaedic</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <button type="submit" className="btn btn-danger" style={{ width: '100%' }}>Search</button>
                                </div>
                            </div>
                        </form>
                        <br />
                        <div className="row">
                            {
                                (dataList.length == 0) ?
                                    <p className="text-center">No results found</p> :
                                    dataList
                            }
                        </div>
                    </div>
                </section>
                <BookApp did={this.state.id} dname={this.state.dname} dspe={this.state.dspe} />
            </div>
        );
    }
}

export default SearchDoctors
