import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Form, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import Loader from "../../App/layout/Loader";

import { fetch, adddata, deletedata, Constants } from "../../network/Apicall";
import { validatedata } from '../../Validation/Validation';
import Pagination from 'react-responsive-pagination';

class Levels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Total_rows: 1,
            pageno: 0,
            data: [],
            validation_msg: '',
            showdata: true,
            edit: false,
            leveldescription: '',
            levelid: '',
            leveltitle: '',
            color: 'darkred',
            filter: '',
            searchdata: '',
            searchbox: true,
            leveldetails: {},
            loading: false,
            validation_err: {}
        }
    }

    async componentDidMount() {
        let params = {
            action: "fetchdata",
            pageno: this.state.pageno
        }
        this.setState({ loading: true });
        let result = await fetch(params, 'level')
        this.setState({ loading: false });
        if (result.status) {
            if (result.Total_rows && !(result.Total_rows == null)) {
                this.setState({ data: result.data, validation_msg: '', Total_rows: result.Total_rows, pageno: result.page_no });
            } else {
                this.setState({ data: result.data, validation_msg: '', pageno: result.page_no });
            }
            //this.setState({ data: result.data, pageno: result.page_no });
        } else {
            this.setState({ validation_msg: result.message, color: 'darkred' })
        }
    }

    loaddata = async () => {
        try {
            console.log("enterd load function");
            let params = {
                action: 'fetchdata',
                filter: this.state.filter,
                levelid: 0,
                leveltitle: '',
                pageno: this.state.pageno
            }
            switch (this.state.filter) {
                case 'id': params.levelid = this.state.searchdata;
                    params.filter = 'id';
                    break;
                case 'title':
                    params.leveltitle = this.state.searchdata;
                    params.filter = 'title';
                    break;
                default: params.filter = '';
            }
            // if (String(this.state.searchdata).length > 0) {
            let validation_result = await validatedata(params, 'level');
            if (validation_result.status) {
                //this.setState({ loading: true });
                let result = await fetch(params, 'level')
                // this.setState({ loading: false });
                if (result.status) {
                    console.log("page no = " + this.state.pageno);
                    if (result.Total_rows && !(result.Total_rows == null)) {
                        this.setState({ data: result.data, validation_msg: '', Total_rows: result.Total_rows, pageno: result.page_no });
                    } else {
                        this.setState({ data: result.data, validation_msg: '', pageno: result.page_no });
                    }
                    //this.setState({ data: result.data, validation_msg: '', pageno: result.page_no });
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' })
                }
            } else {
                this.setState({ validation_msg: validation_result.validation.leveltitle[0] })
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
                title: this.state.leveltitle,
                discription: this.state.leveldescription,
                levelid: this.state.levelid
            }
            let validation_result = await validatedata(params, 'level');
            if (validation_result.status) {
                this.setState({ loading: true });
                let result = await adddata(params, 'level');
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

    editdata = async (leveldata) => {
        try {
            console.log("level details ", (leveldata));
            this.setState({ showdata: false, edit: true, levelid: leveldata.Level_Id, leveltitle: leveldata.Level_Title, leveldescription: leveldata.Level_summary, leveldetails: leveldata });
            console.log("level State ", (this.state));
        } catch (err) {
            console.log(err);
        }
    }

    deletedata = async (data) => {
        try {
            let del = window.confirm("Do you want to proceed with deleting this level ");
            if (del) {
                console.log("state  = ", (this.state));
                let params = {
                    action: "deletedata",
                    levelid: data.Level_Id
                }
                let validation_result = await validatedata(params, 'level');
                if (validation_result.status) {
                    this.setState({ loading: true });
                    let result = await deletedata(params, 'level');
                    this.setState({ loading: false });
                    if (result.status) {
                        await this.loaddata();
                        alert(result.message);
                        this.setState({ validation_msg: result.message, color: 'darkgreen' });
                    } else {
                        this.setState({ validation_msg: result.message, color: 'darkred' });
                    }
                } else {
                    this.setState({ validation_msg: validation_result.validation.levelid[0] })
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
            default: console.log("Filter option acnnot be idwntified");
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
                                        <Card.Title as='h5'>Levels{/*String(this.state.validation_msg).length > 0 ? <p style={{ color: "darkred" }}>{this.state.validation_msg} </p> : null*/}</Card.Title>
                                        <center><p>{String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        </p></center>
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={this.addquestion} >Add Level</a></div>
                                        <div style={{ float: "right", flexDirection: 'row', paddingRight: 10, paddingBottom: 5 }}>
                                            <InputGroup  >
                                                <FormControl
                                                    placeholder="Search...."
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    name='search'
                                                    onChange={(e) => { this.setState({ searchdata: e.target.value }); setTimeout(() => { this.state.filter ? this.loaddata() : this.setState({ validation_msg: "Please Select Filter" }) }, 1000) }}
                                                />
                                                <Dropdown as={InputGroup.Append}>
                                                    <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic-2" />
                                                    {/*<Button variant="secondary" onClick={this.loaddata}>Search</Button>*/}
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item hred="#/action-1" onClick={() => { this.displayfilter('id') }}>Search by Id</Dropdown.Item>
                                                        <Dropdown.Item hred="#/action-2" onClick={() => { this.displayfilter('title') }}>Search by Name</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </InputGroup>
                                            <p><b>Filter : </b> {this.state.filter ? <b>Search By {this.state.filter}</b> : <b>Please select filter</b>}</p>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Level No</th>
                                                    <th>Level Name</th>
                                                    <th>Descriptions</th>
                                                    <th>last Modified_Time</th>
                                                    <th>Update/Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.data.length > 0 ?
                                                    this.state.data.map(item =>
                                                        <tr>
                                                            <th scope="row">
                                                                {i++}
                                                            </th>
                                                            <td>{item.Level_Title}</td>
                                                            <td>
                                                                <h6 className="mb-1">{item.Level_summary}</h6>
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
                                        {/* <div style={{ float: "right" }}>
                                            {this.state.pageno > 0 ? <Button variant="secondary" onClick={() => { this.setState({ pageno: this.state.pageno-- }); this.loaddata() }}><i className="feather icon-arrow-left text-c-white f-20 m-r-4" /></Button> : null}
                                            {this.state.data.length < 4 ? null : <Button variant="secondary" onClick={() => { this.setState({ pageno: this.state.pageno++ }); this.loaddata() }}><i className="feather icon-arrow-right text-c-white f-20 m-r-4" /></Button>}
                                                    </div>*/}
                                        <Pagination
                                            current={this.state.pageno + 1}
                                            total={Math.ceil(this.state.Total_rows / Constants.pagelimit)}
                                            onPageChange={async (selected_page) => { console.log("Selected page no = ", selected_page - 1); await this.setState({ pageno: selected_page - 1 }); this.loaddata() }}
                                        />
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
                                        <Card.Title as="h5">Level Details</Card.Title>
                                        {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ showdata: true }) }} >List Levels</a></div>

                                    </Card.Header>
                                    <Card.Body>
                                        <h5>Enter New Level Details</h5>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <Form>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Level Title</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Level" value={this.state.leveltitle} onChange={(e) => { this.setState({ leveltitle: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Level Title.
                                                    </Form.Text>
                                                        {this.state.validation_err.title ? <p style={{ color: "darkred" }}>{this.state.validation_err.title[0]}</p> : null}

                                                    </Form.Group>
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Level Description</Form.Label>
                                                        <Form.Control as="textarea" rows="3" value={this.state.leveldescription} onChange={(e) => { this.setState({ leveldescription: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Level Description in brief.
                                            </Form.Text>
                                                        {this.state.validation_err.discription ? <p style={{ color: "darkred" }}>{this.state.validation_err.discription[0]}</p> : null}

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

export default Levels;