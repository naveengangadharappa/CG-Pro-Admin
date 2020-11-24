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

class Pattern extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageno: 0,
            loading: false,
            data: [],
            validation_msg: '',
            showdata: true,
            edit: false,
            patternid: '',
            patterntitle: '',
            color: 'darkred',
            filter: '',
            searchdata: '',
            searchbox: true,
            patterndetails: {},
            validation_err: {}
        }
    }

    async componentDidMount() {
        let params = {
            action: "fetchdata"
        }
        this.setState({ loading: true });
        let result = await fetch(params, 'pattern');
        this.setState({ loading: false });
        if (result.status) {
            this.setState({ data: result.data });
        } else {
            this.setState({ validation_msg: result.message, color: 'darkred' })
        }
    }

    loaddata = async () => {
        try {
            console.log("enterd load function");
            let params = {
                action: 'fetchdata',
                filter: '',
                patterntitle: '',
                patternid: 0,
            }
            switch (this.state.filter) {
                case 'id': params.patternid = this.state.searchdata;
                    params.filter = 'id';
                    break;
                case 'title':
                    params.patterntitle = this.state.searchdata;
                    params.filter = 'title';
                    break;
                default: params.filter = '';
            }
            // if (String(this.state.searchdata).length > 0) {
            let validation_result = await validatedata(params, 'pattern');
            if (validation_result.status) {
                this.setState({ loading: true });
                let result = await fetch(params, 'pattern')
                this.setState({ loading: false });
                if (result.status) {
                    this.setState({ data: result.data, validation_msg: '' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' })
                }
                /* } else {
                     console.log("ëlse enterd")
                     this.setState({ validation_msg: 'Search Box Cannot be Empty', color: 'darkred' })
                 }*/
            } else {
                this.setState({ validation_msg: validation_result.validation.patternid[0] })
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
                title: this.state.patterntitle,
                patternid: this.state.patternid
            }
            let validation_result = await validatedata(params, 'pattern');
            if (validation_result.status) {
                this.setState({ loading: true });
                let result = await adddata(params, 'pattern');
                this.setState({ loading: false });
                if (result.status) {
                    await this.loaddata();
                    alert(result.message);
                    this.setState({ validation_msg: result.message, color: 'darkgreen', showdata: true });
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' });
                }
            } else {
                console.log(validation_result);
                this.setState({ validation_err: validation_result.validation });
            }
        } catch (err) {
            console.log(err);
        }
    }

    addquestion = async () => {
        try {
            this.setState({ showdata: false })
        } catch (err) {
            console.log(err);
        }
    }

    editdata = async (patterndata) => {
        try {
            console.log("Pattern details ", (patterndata));
            this.setState({ showdata: false, edit: true, patternid: patterndata.pattern_Id, patterntitle: patterndata.pattern_Title, patterndetails: patterndata });
            console.log("Pattern State ", (this.state));
        } catch (err) {
            console.log(err);
        }
    }

    deletedata = async (data) => {
        try {
            let del = window.confirm("Do you want to proceed with deleting this Pattern ");
            if (del) {
                console.log("state  = ", (this.state));
                let params = {
                    action: "deletedata",
                    patternid: data.pattern_Id
                }
                let validation_result = await validatedata(params, 'pattern');
                if (validation_result.status) {
                    this.setState({ loading: true });
                    let result = await deletedata(params, 'pattern');
                    this.setState({ loading: false });
                    if (result.status) {
                        await this.loaddata();
                        alert(result.message);
                        this.setState({ validation_msg: result.message, color: 'darkgreen', showdata: true });
                    } else {
                        this.setState({ validation_msg: result.message, color: 'darkred' });
                    }
                } else {
                    this.setState({ validation_msg: validation_result.validation.patternid[0] })
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    displayfilter = async (option) => {
        let params = {
            action: "fetchdata"
        }
        switch (option) {
            case 'id': this.setState({ filter: 'id', searchbox: true, });
                break;
            case 'title': this.setState({ filter: 'title', searchbox: true, });
                break;
            case 'description':
                let levelresult = await fetch(params, 'level')
                if (levelresult.status) {
                    this.setState({ filter: 'level', searchbox: false, level: levelresult.data });
                } else {
                    this.setState({ validation_msg: levelresult.message })
                }
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
                                        <Card.Title as='h5'>Pattern{/*String(this.state.validation_msg).length > 0 ? <p style={{ color: "darkred" }}>{this.state.validation_msg} </p> : null*/}</Card.Title>
                                        <center><p>{String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        </p></center>
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={this.addquestion} >Add Pattern</a></div>
                                        <div style={{ float: "right", paddingRight: 5, flexDirection: 'row', paddingRight: 10, paddingBottom: 5 }}>
                                            <InputGroup  >
                                                <FormControl
                                                    placeholder="Search...."
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    name='search'
                                                    onChange={(e) => { this.setState({ searchdata: e.target.value }) }}
                                                />
                                                <Dropdown as={InputGroup.Append}>
                                                    <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic-2" />
                                                    <Button variant="secondary" onClick={this.loaddata}>Search</Button>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item hred="#/action-1" onClick={() => { this.displayfilter('id') }}>Search by Id</Dropdown.Item>
                                                        <Dropdown.Item hred="#/action-2" onClick={() => { this.displayfilter('title') }}>Search by Name</Dropdown.Item>
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
                                                    <th>Pattern No</th>
                                                    <th>Pattern Title</th>
                                                    <th>last Modified_Time</th>
                                                    <th>Update/Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.data.length > 0 ?
                                                    this.state.data.map(item =>
                                                        <tr>
                                                            <th scope="row">
                                                                {item.pattern_Id}
                                                                <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                                                            </th>
                                                            <td>{item.Title}</td>
                                                            <td>
                                                                <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15" />{item.modified_time}</h6>
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
                                        <Card.Title as="h5">Pattern Details</Card.Title>
                                        {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ showdata: true }) }} >List Patterns</a></div>

                                    </Card.Header>
                                    <Card.Body>
                                        <h5>Enter New Pattern Details</h5>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <Form>
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Pattern Title</Form.Label>
                                                        <Form.Control as="textarea" rows="3" value={this.state.patterntitle} onChange={(e) => { this.setState({ patterntitle: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter pattern Description in brief.
                                                </Form.Text>
                                                        {this.state.validation_err.patterntitle ? <p style={{ color: "darkred" }}>{this.state.validation_err.patterntitle[0]}</p> : null}

                                                    </Form.Group>
                                                    <Button variant="primary" onClick={this.submit}>
                                                        Submit
                                                </Button>
                                                </Form>
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

export default Pattern;