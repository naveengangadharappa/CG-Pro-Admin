import React from 'react';
import Loader from "../../App/layout/Loader";
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { fetch, Constants, adddata, deletedata } from "../../network/Apicall";
import { validatedata } from '../../Validation/Validation';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageno: 0,
            loading: false,
            data: [],
            validation_msg: '',
            showdata: true,
            edit: false,
            userid: '',
            username: '',
            email: '',
            color: 'darkred',
            filter: '',
            searchdata: '',
            searchbox: true,
            password: '',
            validation_err: {}
        }
    }

    async componentDidMount() {
        try {
            console.log("this.props.history =", (this.props.history))
            Constants.currentscreen = 'master';
            let params = {
                action: "fetchdata"
            }
            this.setState({ loading: true })
            let result = await fetch(params, 'master')
            this.setState({ loading: false })
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
                userid: 0,
                username: '',
            }
            switch (this.state.filter) {
                case 'id': params.userid = this.state.searchdata;
                    params.filter = 'id';
                    break;
                case 'name':
                    params.username = this.state.searchdata;
                    params.filter = 'title';
                    break;
                default: params.filter = '';
            }
            // if (String(this.state.searchdata).length > 0) {
            let validation_result = await validatedata(params, 'master');
            if (validation_result.status) {
                this.setState({ loading: true });
                let result = await fetch(params, 'master')
                this.setState({ loading: false });
                if (result.status) {
                    this.setState({ data: result.data, validation_msg: '' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' })
                }
            } else {
                this.setState({ validation_msg: validation_result.validation.username[0] });
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
            let del = window.confirm("Do you want to proceed with deleting this Master ");
            if (del) {
                console.log("state  = ", (this.state));
                let params = {
                    action: "deletedata",
                    userid: data.User_Id
                }
                let validation_result = await validatedata(params, 'master');
                if (validation_result.status) {
                    this.setState({ loading: true })
                    let result = await deletedata(params, 'master');
                    this.setState({ loading: false })
                    if (result.status) {
                        await this.loaddata();
                        alert(result.message);
                        this.setState({ validation_msg: result.message, color: 'darkgreen', showdata: true });
                    } else {
                        this.setState({ validation_msg: result.message, color: 'darkred' });
                    }
                } else {
                    this.setState({ validation_msg: validation_result.validation.userid[0] });
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
                userid: this.state.userid,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            let validation_result = await validatedata(params, 'master');
            if (validation_result.status) {
                this.setState({ loading: true })
                let result = await adddata(params, 'master');
                this.setState({ loading: false })
                if (result.status) {
                    await this.loaddata();
                    alert(result.message);
                    this.setState({ validation_msg: result.message, color: 'darkgreen', showdata: true });
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

    displayfilter = async (option) => {
        switch (option) {
            case 'id': this.setState({ filter: 'id', searchbox: true });
                break;
            case 'name': this.setState({ filter: 'name', searchbox: true });
                break;
        }
    }

    render() {
        if (this.state.loading) {
            return (<Loader />)
        } else {
            if (this.state.showdata) {
                let i = 1;
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card className='Recent-Users'>
                                    <Card.Header>
                                        <Card.Title as='h5'>Recent Users </Card.Title>
                                        <center><p>{String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        </p></center>
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ showdata: false, edit: false }) }} >Add Master User</a></div>
                                        <div style={{ float: "right", paddingRight: 5, flexDirection: 'row', paddingRight: 10, paddingBottom: 5 }}>
                                            <InputGroup  >
                                                {this.state.searchbox ? <FormControl
                                                    placeholder="Search...."
                                                    aria-label="Recipient's username"
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
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </InputGroup>
                                            <p><b>Filter : </b> {this.state.filter ? <b>Search By {this.state.filter}</b> : null}</p>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Sl.no</th>
                                                    <th>Emp No</th>
                                                    <th>First Name</th>
                                                    <th>Email</th>
                                                    <th>Last Modified</th>
                                                    <th>Edit/Delete</th>
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
                                                            <td>{item.User_Id}</td>
                                                            <td>
                                                                <h6 className="mb-1">{item.User_Name}</h6>
                                                            </td>
                                                            <td>
                                                                <h6 className="mb-1">{item.email}</h6>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15" />{item.modified_Time}</h6>
                                                            </td>
                                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.setState({ userid: item.User_Id, username: item.User_Name, email: item.email, showdata: false, edit: true }) }}>Edit</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.deletedata(item) }}>Delete</a></td>
                                                        </tr>
                                                    ) :
                                                    null}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    <Card.Footer>
                                        <div style={{ float: "right" }}>
                                            {this.state.pageno >= 1 ? <Button variant="primary" onClick={this.loaddata}>{'<-'}</Button> : null}
                                            <Button variant="secondary" onClick={this.loaddata}>{'<-'}</Button>
                                            <Button variant="secondary" onClick={() => { this.setState({ pageno: this.state.pageno++ }); this.loaddata() }}>{'->'}</Button>
                                        </div>
                                    </Card.Footer>
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
                                        <Card.Title as="h5">Master User Details</Card.Title>
                                        {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ showdata: true }) }} >List Master Users</a></div>

                                    </Card.Header>
                                    <Card.Body>
                                        <h5>Enter New Master User Details</h5>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <Form>
                                                    <Form.Group controlId="formUserID">
                                                        <Form.Label>User ID</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Users Employee Id" value={this.state.userid} onChange={(e) => { this.setState({ userid: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Users Employee Id.
                                                    </Form.Text>
                                                        {this.state.validation_err.userid ? <p style={{ color: "darkred" }}>{this.state.validation_err.userid[0]}</p> : null}
                                                    </Form.Group>
                                                    <Form.Group controlId="formUserName">
                                                        <Form.Label>User Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter User Name" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter User Name.
                                                    </Form.Text>
                                                        {this.state.validation_err.username ? <p style={{ color: "darkred" }}>{this.state.validation_err.username[0]}</p> : null}
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>User Email</Form.Label>
                                                        <Form.Control type="email" placeholder="Enter User Offical Email " value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter User Offical Email Address.
                                                    </Form.Text>
                                                        {this.state.validation_err.email ? <p style={{ color: "darkred" }}>{this.state.validation_err.email[0]}</p> : null}

                                                    </Form.Group>
                                                    <Form.Group controlId="formpassword">
                                                        <Form.Label>User Password</Form.Label>
                                                        <Form.Control type="password" placeholder="" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Temperory password for this Master User.
                                                    </Form.Text>
                                                        {this.state.validation_err.password ? <p style={{ color: "darkred" }}>{this.state.validation_err.password[0]}</p> : null}

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
}

export default Users;