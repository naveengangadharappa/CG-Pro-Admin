import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import Loader from "../../App/layout/Loader";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { fetch, adddata, deletedata } from "../../network/Apicall";
import { validatedata } from '../../Validation/Validation';

class Sublevels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageno: 0,
            loading: false,
            data: [],
            level: [],
            validation_msg: '',
            showdata: true,
            edit: false,
            subleveldescription: '',
            levelid: 0,
            sublevelid: 0,
            leveltitle: '',
            subleveltitle: '',
            color: 'darkred',
            filter: '',
            searchdata: '',
            searchbox: true,
            validation_err: {}
        }
    }

    async componentDidMount() {
        let params = {
            action: "fetchdata"
        }
        this.setState({ loading: true });
        let result = await fetch(params, 'sublevel')
        this.setState({ loading: false });
        if (result.status) {
            this.setState({ data: result.data });
        } else {
            this.setState({ validation_msg: result.message })
        }
    }


    loaddata = async () => {
        try {
            console.log("enterd load function");
            let params = {
                action: 'fetchdata',
                filter: '',
                sublevelid: 0,
                subleveltitle: '',
                leveltitle: 0,
            }
            switch (this.state.filter) {
                case 'id': params.sublevelid = this.state.searchdata;
                    params.filter = 'id';
                    break;
                case 'title':
                    params.subleveltitle = this.state.searchdata;
                    params.filter = 'title';
                    break;
                case 'level':
                    params.leveltitle = this.state.searchdata;
                    params.filter = 'level';
                    break;
                default: params.filter = '';
            }
            // if (String(this.state.searchdata).length > 0) {
            //this.setState({ loading: true });
            let result = await fetch(params, 'sublevel')
            // this.setState({ loading: false });
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

    submit = async () => {
        try {
            console.log("state  = ", (this.state));
            let params = {
                action: this.state.edit ? "updatedata" : "adddata",
                title: this.state.subleveltitle,
                discription: this.state.subleveldescription,
                levelid: this.state.levelid,
                sublevelid: this.state.sublevelid
            }
            let validation_result = await validatedata(params, 'sublevel');
            if (validation_result.status) {
                this.setState({ loading: true });
                let result = await adddata(params, 'sublevel');
                this.setState({ loading: false });
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

    addsublevel = async () => {
        //this.setState({ showdata: false })
        try {
            let params = {
                action: "fetchdata"
            }
            this.setState({ showdata: false })
            this.setState({ loading: true });
            let levelresult = await fetch(params, 'level')
            this.setState({ loading: false });
            if (levelresult.status) {
                this.setState({ level: levelresult.data });
            } else {
                this.setState({ validation_msg: levelresult.message, color: 'darkred' })
            }
        } catch (err) {
            console.log(err);
        }
    }

    editdata = async (subleveldata) => {
        try {
            console.log("level details ", (subleveldata));
            this.setState({ showdata: false, edit: true, sublevelid: subleveldata.Id, subleveltitle: subleveldata.title, subleveldescription: subleveldata.Discription, subleveldetails: subleveldata });
            let params = {
                action: "fetchdata"
            }
            this.setState({ loading: true });
            let levelresult = await fetch(params, 'level')
            this.setState({ loading: false });
            if (levelresult.status) {
                let title = levelresult.data.filter(item => { if (item.Level_Id == subleveldata.level_id) { return item.Level_Title } })
                this.setState({ level: levelresult.data, leveltitle: title[0].Level_Title, levelid: title[0].Level_Id });
            } else {
                this.setState({ validation_msg: levelresult.message, color: 'darkred' })
            }
        } catch (err) {
            console.log(err);
        }
    }

    deletedata = async (data) => {
        try {
            let del = window.confirm("Do you want to proceed with deleting this Sublevel ");
            if (del) {
                console.log("state  = ", (this.state));
                let params = {
                    action: "deletedata",
                    sublevelid: data.Id
                }
                let validation_result = await validatedata(params, 'sublevel');
                if (validation_result.status) {
                    this.setState({ loading: true });
                    let result = await deletedata(params, 'sublevel');
                    this.setState({ loading: false });
                    if (result.status) {
                        await this.loaddata();
                        alert(result.message);
                        this.setState({ validation_msg: result.message, color: 'darkgreen', showdata: true });
                    } else {
                        this.setState({ validation_msg: result.message, color: 'darkred' });
                    }
                } else {
                    this.setState({ validation_msg: validation_result.validation.subleveltitle[0] });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    displayfilter = async (option) => {
        switch (option) {
            case 'id': this.setState({ filter: 'id', searchbox: true });
                break;
            case 'title': this.setState({ filter: 'title', searchbox: true });
                break;
            case 'level': this.setState({ filter: 'level', searchbox: true, });
                break;
        }
    }



    render() {
        if (this.state.loading) {
            return (<Loader />)
        } else {
            if (this.state.showdata) {
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card className='Recent-Users'>
                                    <Card.Header>
                                        <Card.Title as='h5'>Sublevels</Card.Title>
                                        <center><p>{String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        </p></center>
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={this.addsublevel} >Add SubLevel</a></div>
                                        <div style={{ float: "right", paddingRight: 5, flexDirection: 'row', paddingRight: 10, paddingBottom: 5 }}>
                                            <InputGroup  >
                                                {this.state.searchbox ? <FormControl
                                                    placeholder="Search...."
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    name='search'
                                                    onChange={(e) => { this.setState({ searchdata: e.target.value }); setTimeout(() => { this.state.filter ? this.loaddata() : this.setState({ validation_msg: "Please Select Filter" }) }, 1500) }}
                                                /> : null
                                                }
                                                <Dropdown as={InputGroup.Append}>
                                                    <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic-2" />
                                                    {/*<Button variant="secondary" onClick={this.loaddata}>Search</Button>*/}
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item hred="#/action-1" onClick={() => { this.displayfilter('id') }}>Search by Id</Dropdown.Item>
                                                        <Dropdown.Item hred="#/action-2" onClick={() => { this.displayfilter('title') }}>Search by Name</Dropdown.Item>
                                                        <Dropdown.Item hred="#/action-3" onClick={() => { this.displayfilter('level') }}>Search by level</Dropdown.Item>
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
                                                    <th>SubLevel No</th>
                                                    <th>SubLevel Name</th>
                                                    <th>Descriptions</th>
                                                    <th>Level Id</th>
                                                    <th>Last Modification Time</th>
                                                    <th>Update/Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.data.length > 0 ?
                                                    this.state.data.map(item =>
                                                        <tr>
                                                            <th scope="row">
                                                                {item.Id}
                                                                <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                                                            </th>
                                                            <td>{item.title}</td>
                                                            <td>
                                                                <h6 className="mb-1">{item.Discription}</h6>
                                                            </td>
                                                            <td>
                                                                <h6 className="mb-1">{item.level_id}</h6>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted">{item.modified_time}</h6>
                                                            </td>
                                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.editdata(item) }}>Edit</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.deletedata(item) }}>Delete</a></td>
                                                        </tr>
                                                    ) :
                                                    null}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    <Card.Footer>
                                        <div style={{ float: "right" }}>
                                            {this.state.pageno >= 1 ? <Button variant="secondary" onClick={this.loaddata}>{'<-'}</Button> : null}
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
                                        <Card.Title as="h5">Question Details</Card.Title>
                                        {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ showdata: true }) }} >List SubLevel</a></div>

                                    </Card.Header>
                                    <Card.Body>
                                        <h5>Enter New Question Details</h5>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <Form>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>subLevel Title</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter sublevel Title" value={this.state.subleveltitle} onChange={(e) => { this.setState({ subleveltitle: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter SubLevel Title.
                                                    </Form.Text>
                                                        {this.state.validation_err.subleveltitle ? <p style={{ color: "darkred" }}>{this.state.validation_err.subleveltitle[0]}</p> : null}

                                                    </Form.Group>
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>SubLevel Discription</Form.Label>
                                                        <Form.Control as="textarea" rows="3" value={this.state.subleveldescription} onChange={(e) => { this.setState({ subleveldescription: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Brief discription.
                                            </Form.Text>
                                                        {this.state.validation_err.subleveldescription ? <p style={{ color: "darkred" }}>{this.state.validation_err.subleveldescription[0]}</p> : null}

                                                    </Form.Group>

                                                </Form>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Select Level</Form.Label>
                                                    <Form.Control as="select" onChange={(e) => { this.setState({ levelid: e.target.value }) }}>
                                                        <option value={this.state.levelid} selected>{this.state.leveltitle}</option>
                                                        {this.state.level.length > 0 ?
                                                            this.state.level.map(item => <option value={item.Level_Id}>{item.Level_Title}</option>) : null
                                                            //this.state.level.map(item => item.Level_Id == this.state.levelid ? null : <option value={item.Level_Id}>{item.Level_Title}</option>) : null
                                                        }
                                                        {this.state.validation_err.levelid ? <p style={{ color: "darkred" }}>{"Please Select level"}</p> : null}
                                                    </Form.Control>
                                                </Form.Group>
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

export default Sublevels;