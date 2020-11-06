import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';


import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { Constants } from "../../network/Apicall";

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            choice: 'showquestion',
            userid: Constants.user_profile.userid,
            username: Constants.user_profile.username,
            useremail: Constants.user_profile.email,
            password: ''
        }
    }
    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Profile Details</Card.Title>
                                {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ showdata: true }) }} >List Master Users</a></div>

                            </Card.Header>
                            <Card.Body>
                                <h5>Profile  Details</h5>
                                <hr />
                                <Row>
                                    <Col md={6}>
                                        <Form>
                                            <Form.Group controlId="EmployeeID">
                                                <Form.Label>User ID</Form.Label>
                                                <Form.Control type="text" placeholder="Enter User Id" value={this.state.userid} onChange={(e) => { this.setState({ userid: e.target.value }) }} />
                                                <Form.Text className="text-muted">
                                                    Enter User  Id.
                                        </Form.Text>
                                            </Form.Group>
                                            <Form.Group controlId="EmployeeName">
                                                <Form.Label>Employee Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter User Name" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} />
                                                <Form.Text className="text-muted">
                                                    Enter User Name.
                                        </Form.Text>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Employee Email</Form.Label>
                                                <Form.Control type="email" placeholder="Enter User Offical Email " value={this.state.useremail} onChange={(e) => { this.setState({ useremail: e.target.value }) }} />
                                                <Form.Text className="text-muted">
                                                    Enter User Offical Email Address.
                                        </Form.Text>
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
    }
}

export default Profile;