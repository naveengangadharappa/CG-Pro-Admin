import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { fetch, Constants, adddata, deletedata } from "../../network/Apicall";

class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            validation_msg: '',
            showdata: true,
            edit: false,
            employeeid: '',
            employeename: '',
            employeedesignation: '',
            email: '',
            color: 'darkred',
            filter: '',
            searchdata: '',
            searchbox: true,
        }
    }

    async componentDidMount() {
        try {
            Constants.currentscreen = 'employee';
            let params = {
                action: "fetchdata"
            }
            let result = await fetch(params, 'employee')
            if (result.status) {
                this.setState({ data: result.data });
            } else {
                this.setState({ validation_msg: result.message })
            }
        } catch (err) {
            console.log(err)
        }
    }


    loaddata = async () => {
        try {
            console.log("enterd load function");
            let params = {
                action: 'fetchdata',
                filter: '',
                employeeid: 0,
                employeename: '',
                employeedesignation: ''
            }
            switch (this.state.filter) {
                case 'id': params.employeeid = this.state.searchdata;
                    params.filter = 'id';
                    break;
                case 'name':
                    params.employeename = this.state.searchdata;
                    params.filter = 'title';
                    break;
                case 'designation':
                    params.employeedesignation = this.state.searchdata;
                    params.filter = 'designation';
                    break;
                default: params.filter = '';
            }
            // if (String(this.state.searchdata).length > 0) {
            let result = await fetch(params, 'employee')
            if (result.status) {
                this.setState({ data: result.data, validation_msg: '' });
            } else {
                this.setState({ validation_msg: result.message, color: 'darkred' })
            }
            /* } else {
                 console.log("ëlse enterd")
                 this.setState({ validation_msg: 'Search Box Cannot be Empty', color: 'darkred' })
             }*/
        } catch (err) {
            console.log(err);
        }
    }




    deletedata = async (data) => {
        try {
            let del = window.confirm("Do you want to proceed with deleting this Employee ");
            if (del) {
                let params = {
                    action: "deletedata",
                    employeeid: data.Emp_Id
                }
                let result = await deletedata(params, 'employee');
                if (result.status) {
                    await this.loaddata();
                    alert(result.message);
                    this.setState({ validation_msg: result.message, color: 'darkgreen', showdata: true });
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }


    submit = async () => {
        try {
            console.log("state  = ", (this.state));
            let params = {
                action: this.state.edit ? "updatedata" : "adddata",
                employeeid: this.state.employeeid,
                employeename: this.state.employeename,
                employeedesignation: this.state.employeedesignation,
                email: this.state.email
            }
            let result = await adddata(params, 'employee');
            if (result.status) {
                await this.loaddata();
                alert(result.message);
                this.setState({ validation_msg: result.message, color: 'darkgreen', showdata: true });
            } else {
                this.setState({ validation_msg: result.message, color: 'darkred' });
            }
        } catch (err) {
            console.log(err);
        }
    }

    displayfilter = async (option) => {
        switch (option) {
            case 'id': this.setState({ filter: 'id', searchbox: true });
                break;
            case 'name': this.setState({ filter: 'name', searchbox: true });
                break;
            case 'designation': this.setState({ filter: 'designation', searchbox: true });
                break;
        }
    }


    render() {
        if (this.state.showdata) {
            let i = 0;
            return (
                <Aux>
                    <Row>
                        <Col>
                            <Card className='Recent-Users'>
                                <Card.Header>
                                    <Card.Title as='h5'>Employees</Card.Title>
                                    <center><p>{String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                    </p></center>
                                    <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ showdata: false, edit: false }) }} >Add Employee</a></div>
                                    <div style={{ float: "right", paddingRight: 5, flexDirection: 'row', paddingRight: 10, paddingBottom: 5 }}>
                                        <InputGroup  >
                                            {this.state.searchbox ? <FormControl
                                                placeholder="Search...."
                                                aria-label="Recipient's employeename"
                                                aria-describedby="basic-addon2"
                                                name='search'
                                                onChange={(e) => { this.setState({ searchdata: e.target.value }) }}
                                            /> : null
                                            }
                                            <Dropdown as={InputGroup.Append}>
                                                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic-2" />
                                                <Button variant="secondary" onClick={this.loaddata}>Search</Button>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item hred="#/action-1" onClick={() => { this.displayfilter('id') }}>Search by Id</Dropdown.Item>
                                                    <Dropdown.Item hred="#/action-2" onClick={() => { this.displayfilter('name') }}>Search by Name</Dropdown.Item>
                                                    <Dropdown.Item hred="#/action-2" onClick={() => { this.displayfilter('designation') }}>Search by Designation</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </InputGroup>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>Sl.no</th>
                                                <th>Emp No</th>
                                                <th>Employee Name</th>
                                                <th>Email</th>
                                                <th>Employee Designation</th>
                                                <th>Last Active</th>
                                                <th>Update/Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.data.length > 0 ?
                                                this.state.data.map(item =>
                                                    <tr>
                                                        <th scope="row">
                                                            {i++}
                                                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                                                        </th>
                                                        <td>{item.Emp_Id}</td>
                                                        <td>
                                                            <h6 className="mb-1">{item.Emp_name}</h6>
                                                        </td>
                                                        <td>
                                                            <h6 className="mb-1">{item.Emp_email}</h6>
                                                        </td>
                                                        <td>
                                                            <h6 className="mb-1">{item.Emp_designation}</h6>
                                                        </td>
                                                        <td>
                                                            <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15" />{item.modified_time}</h6>
                                                        </td>
                                                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.setState({ employeeid: item.Emp_Id, employeename: item.Emp_name, email: item.Emp_email, employeedesignation: item.Emp_designation, showdata: false, edit: true }) }}>Edit</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.deletedata(item) }}>Delete</a></td>
                                                    </tr>
                                                ) : null}
                                        </tbody>
                                    </Table>
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
                                    <Card.Title as="h5">Employee Details</Card.Title>
                                    {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                    <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ showdata: true }) }} >List Master Users</a></div>

                                </Card.Header>
                                <Card.Body>
                                    <h5>Enter New Employee Details</h5>
                                    <hr />
                                    <Row>
                                        <Col md={6}>
                                            <Form>
                                                <Form.Group controlId="EmployeeID">
                                                    <Form.Label>Employee ID</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Employee Id" value={this.state.employeeid} onChange={(e) => { this.setState({ employeeid: e.target.value }) }} />
                                                    <Form.Text className="text-muted">
                                                        Enter Employee  Id.
                                                </Form.Text>
                                                </Form.Group>
                                                <Form.Group controlId="EmployeeName">
                                                    <Form.Label>Employee Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Employee Name" value={this.state.employeename} onChange={(e) => { this.setState({ employeename: e.target.value }) }} />
                                                    <Form.Text className="text-muted">
                                                        Enter User Name.
                                                </Form.Text>
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Employee Email</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter Employee Offical Email " value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                                    <Form.Text className="text-muted">
                                                        Enter User Offical Email Address.
                                                </Form.Text>
                                                </Form.Group>
                                                <Form.Group controlId="Employeedesignation">
                                                    <Form.Label>Employee designation</Form.Label>
                                                    <Form.Control type="ext" placeholder="Enter User Offical Email " value={this.state.employeedesignation} onChange={(e) => { this.setState({ employeedesignation: e.target.value }) }} />
                                                    <Form.Text className="text-muted">
                                                        Enter Employee designation.
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
}

export default Employee;