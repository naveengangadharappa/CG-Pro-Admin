import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';


import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { Constants, adddata, Offlinestorage } from "../../network/Apicall";
import { validatedata } from '../../Validation/Validation';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            option: 'profile',
            choice: 'profile',
            password: '',
            userid: Constants.user_profile.userid,
            username: Constants.user_profile.username,
            useremail: Constants.user_profile.email,
            password: '',
            validation_err: {}
        }
    }

    submit = async () => {
        try {
            console.log("state  = ", (this.state));
            let params = {
                action: "updatedata",
                userid: this.state.userid,
                username: this.state.username,
                email: this.state.useremail,
            }
            let validation_result = await validatedata(params, 'master');
            if (validation_result.status) {
                this.setState({ loading: true })
                let result = await adddata(params, 'master');
                this.setState({ loading: false })
                if (result.status) {
                    let storageresult = await Offlinestorage({ choice: 'adddata', key: 'userprofile', value: { login_status: true, userid: this.state.userid, username: this.state.username, email: this.state.useremail } });
                    console.log("offline result =", (storageresult));
                    if (storageresult.status) {
                        Constants.user_profile.userid = this.state.userid;
                        Constants.user_profile.username = this.state.username;
                        Constants.user_profile.email = this.state.useremail;
                        alert(result.message);
                        this.setState({ validation_msg: result.message, color: 'darkgreen', showdata: true });
                    }
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' });
                }
            } else {
                this.setState({ validation_err: validation_result.validation });
            }
        } catch (err) {
            console.log(err);
        }
    }

    changepassword = async () => {
        try {
            console.log("state  = ", (this.state));
            let params = {
                action: "updatepassword",
                userid: this.state.userid,
                password: this.state.password,
            }
            let validation_result = await validatedata(params, 'master');
            if (validation_result.status) {
                this.setState({ loading: true })
                let result = await adddata(params, 'master');
                this.setState({ loading: false })
                if (result.status) {
                    alert("Password Update successfull Please Login !!");
                    this.setState({ validation_msg: "Password Updated successfull", color: 'darkgreen', showdata: true });
                    this.props.history.push({ pathname: '/auth/signin-1' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' });
                }
            } else {
                this.setState({ validation_err: validation_result.validation });
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.state.option == 'profile') {
            return (
                <Aux>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h5">Profile Details</Card.Title>
                                    {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                    <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ option: 'updatepassword' }) }} >update Password</a></div>
                                </Card.Header>
                                <Card.Body>
                                    <h5>Profile  Details</h5>
                                    <hr />
                                    <Row>
                                        <Col md={6}>
                                            <Form>
                                                <Form.Group controlId="EmployeeID">
                                                    <Form.Label>User ID</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter User Id" value={this.state.userid} />
                                                    <Form.Text className="text-muted">
                                                        Enter User  Id.
                                    </Form.Text>
                                                    {this.state.validation_err.userid ? <p style={{ color: "darkred" }}>{this.state.validation_err.userid[0]}</p> : null}

                                                </Form.Group>
                                                <Form.Group controlId="EmployeeName">
                                                    <Form.Label>Employee Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter User Name" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} />
                                                    <Form.Text className="text-muted">
                                                        Enter User Name.
                                    </Form.Text>
                                                    {this.state.validation_err.username ? <p style={{ color: "darkred" }}>{this.state.validation_err.username[0]}</p> : null}

                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Employee Email</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter User Offical Email " value={this.state.useremail} onChange={(e) => { this.setState({ useremail: e.target.value }) }} />
                                                    <Form.Text className="text-muted">
                                                        Enter User Offical Email Address.
                                    </Form.Text>
                                                    {this.state.validation_err.email ? <p style={{ color: "darkred" }}>{this.state.validation_err.email[0]}</p> : null}

                                                </Form.Group>
                                            </Form>
                                            <Button variant="primary" onClick={this.submit}>
                                                Submit
                            </Button>
                                        </Col>

                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Aux>
            );
        } else {
            return (
                <Aux>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h5">Profile Details</Card.Title>
                                    {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                    <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ option: 'profile' }) }} >update Profile</a></div>
                                </Card.Header>
                                <Card.Body>
                                    <h5>Profile  Details</h5>
                                    <hr />
                                    <Row>
                                        <Col md={6}>
                                            <Form>
                                                <Form.Group controlId="EmployeePassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter new Password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                                    <Form.Text className="text-muted">
                                                        Enter New Password.
                                    </Form.Text>
                                                    {this.state.validation_err.password ? <p style={{ color: "darkred" }}>{this.state.validation_err.password[0]}</p> : null}

                                                </Form.Group>
                                            </Form>
                                            <Button variant="primary" onClick={this.changepassword}>
                                                Submit
                                </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Aux>
            )
        }
    }
}

export default Profile;