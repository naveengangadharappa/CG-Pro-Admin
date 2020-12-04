import React from 'react';
import Loader from "../../App/layout/Loader";
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
//import NavBar from '../../App/layout/AdminLayout/NavBar';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { fetch, Constants, adddata, deletedata } from "../../network/Apicall";
import { validatedata } from '../../Validation/Validation';

class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageno: 0,
            showdetailview: false,
            loading: false,
            password: '',
            data: [],
            employee_data: {},
            sublevel_data: [],
            question_data: [],
            tab: 'level',
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
            validation_err: {}
        }
    }

    async componentDidMount() {
        try {
            Constants.currentscreen = 'employee';
            let params = {
                action: "fetchdata"
            }
            this.setState({ loading: true });
            let result = await fetch(params, 'employee')
            this.setState({ loading: false });
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
                employeedesignation: '',
                pageno: this.state.pageno
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
            let validation_result = await validatedata(params, 'employee');
            if (validation_result.status) {
                //this.setState({ loading: true });
                let result = await fetch(params, 'employee')
                //this.setState({ loading: false });
                if (result.status) {
                    this.setState({ data: result.data, validation_msg: '' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' })
                }
            } else {
                this.setState({ validation_msg: validation_result.validation.employeeid[0] });
            }
            /* } else {
                 console.log("ëlse enterd")
                 this.setState({ validation_msg: 'Search Box Cannot be Empty', color: 'darkred' })
             }*/
        } catch (err) {
            console.log(err);
        }
    }

    Load_Employee_data = async (option, data) => {
        //this.setState({ showdetailview: true });
        let params = {};
        switch (option) {
            case "employee":
                params = {
                    action: "get_employee_details",
                    option: "employee",
                    empid: data.Emp_Id
                }
                this.setState({ loading: true, employeeid: data.Emp_Id });
                let result_emp = await fetch(params, 'employee')
                this.setState({ loading: false });
                if (result_emp.status) {
                    this.setState({ showdetailview: true, employee_data: result_emp.data, tab: 'level', validation_msg: '' });
                } else {
                    this.setState({ validation_msg: result_emp.message, color: 'darkred' })
                }
                break;
            case "sublevel":
                params = {
                    action: "get_employee_details",
                    option: "sublevel",
                    empid: this.state.employeeid,
                    levelid: data.Level_Id
                }
                this.setState({ loading: true });
                let result_sub = await fetch(params, 'employee')
                this.setState({ loading: false });
                if (result_sub.status) {
                    this.setState({ sublevel_data: result_sub.data, tab: 'sublevel', validation_msg: '' });
                } else {
                    this.setState({ validation_msg: result_sub.message, color: 'darkred' })
                }
                break;
            case "question":
                params = {
                    action: "get_employee_details",
                    option: "question",
                    empid: this.state.employeeid,
                    sublevelid: data.SubLevel_Id
                }
                this.setState({ loading: true });
                let result_question = await fetch(params, 'employee')
                this.setState({ loading: false });
                if (result_question.status) {
                    this.setState({ question_data: result_question.data, tab: 'question', validation_msg: '' });
                } else {
                    this.setState({ validation_msg: result_question.message, color: 'darkred' })
                }
                break;
            default:
                params = {
                    action: "get_employee_details",
                    option: "employee",
                    empid: data.Emp_Id
                }
                this.setState({ loading: true });
                let result = await fetch(params, 'employee')
                this.setState({ loading: false });
                if (result.status) {
                    this.setState({ level_data: result.data, tab: 'level', validation_msg: '' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' })
                }
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
                let validation_result = await validatedata(params, 'employee');
                if (validation_result.status) {
                    this.setState({ loading: true });
                    let result = await deletedata(params, 'employee');
                    this.setState({ loading: false });
                    if (result.status) {
                        await this.loaddata();
                        alert(result.message);
                        this.setState({ validation_msg: result.message, color: 'darkgreen', showdata: true });
                    } else {
                        this.setState({ validation_msg: result.message, color: 'darkred' });
                    }
                } else {
                    this.setState({ validation_msg: validation_result.validation.employeeid[0] });
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
                email: this.state.email,
                password: this.state.password
            }
            let validation_result = await validatedata(params, 'employee');
            if (validation_result.status) {
                this.setState({ loading: true });
                let result = await adddata(params, 'employee');
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

    loademployeedetails = async (item) => {
        this.setState({ showdetailview: true });
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
        if (this.state.loading) {
            return (<Loader />)
        } else {
            if (this.state.showdata) {
                let i = 1;
                if (this.state.showdetailview) {
                    const Questions = (
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Questions</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Sl.no</th>
                                            <th>Question Title</th>
                                            <th>completed time</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.question_data.length > 0 ?
                                            this.state.question_data.map(item =>
                                                <tr className="unread">
                                                    <td>{item.Question_Id}</td>
                                                    <td>
                                                        <h6 className="mb-1">{item.Question_Title}</h6>
                                                        <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{item.Completed_Time}</h6>
                                                    </td>
                                                    <td>{item.score}</td>
                                                </tr>
                                            ) : null}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    );

                    const SubLevel = (
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>SubLevel</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Sl.no</th>
                                            <th>SubLevel Title</th>
                                            <th>completed time</th>
                                            <th>Time taken</th>
                                            <th>SubLevel Score</th>
                                            <th>Questions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.sublevel_data.length > 0 ?
                                            this.state.sublevel_data.map(item =>
                                                <tr className="unread">
                                                    <td>{item.SubLevel_Id}</td>
                                                    <td>
                                                        <h6 className="mb-1">{item.SubLevel_Title}</h6>
                                                        <p className="m-0">{item.SubLevel_Description}</p>
                                                    </td>
                                                    <td>{item.Completed_Time}</td>
                                                    <td>
                                                        <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{item.Time_Taken_inTime}</h6>
                                                    </td>
                                                    <td>{item.sublevel_scores}</td>
                                                    <td><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.Load_Employee_data('question', item) }}>View Questions</a></td>
                                                </tr>
                                            ) : null}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    )

                    const Level = (
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Levels</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Sl.no</th>
                                            <th>Level Title</th>
                                            <th>completed time</th>
                                            <th>Time taken</th>
                                            <th>Level Score</th>
                                            <th>SubLevel</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.employee_data.Level && this.state.employee_data.Level.length > 0 ?
                                            this.state.employee_data.Level.map(item =>
                                                <tr className="unread">
                                                    <td>{item.Level_Id}</td>
                                                    <td>
                                                        <h6 className="mb-1">{item.Level_Title}</h6>
                                                        <p className="m-0">{item.Level_Description}</p>
                                                    </td>
                                                    <td>{item.Completed_Time}</td>
                                                    <td>
                                                        <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{item.Time_Taken_inTime}</h6>
                                                    </td>
                                                    <td>{item.Level_Scores}</td>
                                                    <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.Load_Employee_data('sublevel', item) }}>View Sublevels</a></td>
                                                </tr>
                                            ) : null}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    );

                    return (
                        <Aux>
                            <Row>
                                <Col md={6} xl={4}>
                                    <Card>
                                        <Card.Body>
                                            <h6 className='mb-4'>Total Scores</h6>
                                            <div className="row d-flex align-items-center">
                                                <div className="col-9">
                                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{this.state.employee_data.Emp_Totalscore}</h3>
                                                </div>

                                                <div className="col-3 text-right">
                                                    <p className="m-b-0">50%</p>
                                                </div>
                                            </div>
                                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6} xl={4}>
                                    <Card>
                                        <Card.Body>
                                            <h6 className='mb-4'>Rewards</h6>
                                            <div className="row d-flex align-items-center">
                                                <div className="col-9">
                                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5" /> {this.state.employee_data.Emp_Rewards ? this.state.employee_data.Emp_Rewards : "No Rewards"}</h3>
                                                </div>

                                                <div className="col-3 text-right">
                                                    <p className="m-b-0">36%</p>
                                                </div>
                                            </div>
                                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{ width: '35%' }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100" />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={6} xl={8}>
                                    <Card>
                                        <Card.Header>
                                            Employee Details
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                                                <div className="m-r-10 photo-table">
                                                    <p>Employee Id</p>
                                                </div>
                                                <div className="media-body">
                                                    <span className="float-right d-flex  align-items-center"><h6 className="m-0 d-inline">{this.state.employee_data.Emp_Id}</h6></span>
                                                </div>
                                            </div>
                                            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                                                <div className="m-r-10 photo-table">
                                                    <p>Employee Name</p>
                                                </div>
                                                <div className="media-body">
                                                    <span className="float-right d-flex  align-items-center"><h6 className="m-0 d-inline">{this.state.employee_data.Emp_Name}</h6></span>
                                                </div>
                                            </div>
                                            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                                                <div className="m-r-10 photo-table">
                                                    <p>Employee Email</p>
                                                </div>
                                                <div className="media-body">
                                                    <span className="float-right d-flex  align-items-center"><h6 className="m-0 d-inline">{this.state.employee_data.Emp_Email}</h6></span>
                                                </div>
                                            </div>
                                            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                                                <div className="m-r-10 photo-table">
                                                    <p>Employee Designation</p>
                                                </div>
                                                <div className="media-body">
                                                    <span className="float-right d-flex  align-items-center"><h6 className="m-0 d-inline">{this.state.employee_data.Emp_Designation}</h6></span>
                                                </div>
                                            </div>
                                            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                                                <div className="m-r-10 photo-table">
                                                    <p>Total Score</p>
                                                </div>
                                                <div className="media-body">
                                                    <span className="float-right d-flex  align-items-center"><h6 className="m-0 d-inline">{this.state.employee_data.Emp_Totalscore}</h6></span>
                                                </div>
                                            </div>
                                            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                                                <div className="m-r-10 photo-table">
                                                    <p>Rewards</p>
                                                </div>
                                                <div className="media-body">
                                                    <span className="float-right d-flex  align-items-center"><h6 className="m-0 d-inline">{this.state.employee_data.Emp_Rewards ? this.employee_data.Emp_Rewards : "No Rewards"}</h6></span>
                                                </div>
                                            </div>
                                            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                                                <div className="m-r-10 photo-table">
                                                    <p>Last Updated Time</p>
                                                </div>
                                                <div className="media-body">
                                                    <span className="float-right d-flex  align-items-center"><h6 className="m-0 d-inline">{this.state.employee_data.Last_Updated_Time}</h6></span>
                                                </div>
                                            </div>

                                        </Card.Body></Card>
                                </Col>
                                <Col md={6} xl={4}>
                                    <Card className='card-event'>
                                        <Card.Body>
                                            <div className="align-items-center justify-content-center">
                                                <div className="col">
                                                    <h5 className="text-muted mt-3 mb-0">Employee Avathar</h5>
                                                </div>
                                                <div className="col-auto">
                                                    <a href={`http://115.124.127.245:3002/Mission_Onboarding/get_file?fname=${this.state.employee_data.Emp_Avathar_id}`}><img style={{ width: '100%', height: '100%' }} src='http://115.124.127.245:3002/Mission_Onboarding/get_file?fname=303c263c22dca7fb484d3c30936591e0.png' alt="Profile not found" /></a>
                                                </div>
                                            </div>
                                            <h6 className="text-muted mt-3 mb-0">{this.state.employee_data.Emp_Nme}</h6>
                                            {/*<i className="fa fa-angellist text-c-purple f-50" />*/}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/*<Col md={6} xl={4}>
                                    <Card>
                                        <Card.Header>
                                            <Card.Title as='h5'>Rating</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="row align-items-center justify-content-center m-b-20">
                                                <div className="col-6">
                                                    <h2 className="f-w-300 d-flex align-items-center float-left m-0">4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow" /></h2>
                                                </div>
                                                <div className="col-6">
                                                    <h6 className="d-flex  align-items-center float-right m-0">0.4 <i className="fa fa-caret-up text-c-green f-22 m-l-10" /></h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-xl-12">
                                                    <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow" />5</h6>
                                                    <h6 className="align-items-center float-right">384</h6>
                                                    <div className="progress m-t-30 m-b-20" style={{ height: '6px' }}>
                                                        <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                                                    </div>
                                                </div>

                                                <div className="col-xl-12">
                                                    <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow" />4</h6>
                                                    <h6 className="align-items-center float-right">145</h6>
                                                    <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                                                        <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '35%' }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100" />
                                                    </div>
                                                </div>

                                                <div className="col-xl-12">
                                                    <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow" />3</h6>
                                                    <h6 className="align-items-center float-right">24</h6>
                                                    <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                                                        <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
                                                    </div>
                                                </div>

                                                <div className="col-xl-12">
                                                    <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow" />2</h6>
                                                    <h6 className="align-items-center float-right">1</h6>
                                                    <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                                                        <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '10%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-12">
                                                    <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow" />1</h6>
                                                    <h6 className="align-items-center float-right">0</h6>
                                                    <div className="progress m-t-30  m-b-5" style={{ height: '6px' }}>
                                                        <div className="progress-bar" role="progressbar" style={{ width: '0%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                    </Col>*/}
                                <Col md={6} xl={12} className='m-b-30'>
                                    <Tabs defaultActiveKey={this.state.tab} id="uncontrolled-tab-example" >
                                        <Tab eventKey="level" title="Level">
                                            {Level}
                                        </Tab>
                                        <Tab eventKey="subLevel" title="SubLevel">
                                            {SubLevel}
                                        </Tab>
                                        <Tab eventKey="question" title="Question">
                                            {Questions}
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>
                        </Aux>
                    );
                    /* return (
                         <Aux>
                             <Row>
                                 <Col>
                                     <Card className='Recent-Users'>
                                         <Card.Header>
                                             <Card.Title as='h5'>Employees Details</Card.Title>
                                             <center><p>{String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                             </p></center>
                                             <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ showdetailview: false }) }} >Employee List</a></div>
                                         </Card.Header>
                                         <Card.Body>
 
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
                     );*/
                } else {
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
                                                        onChange={(e) => { this.setState({ searchdata: e.target.value }); setTimeout(() => { this.state.filter ? this.loaddata() : this.setState({ validation_msg: "Please Select Filter" }) }, 1500) }}
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
                                                <p><b>Filter : </b> {this.state.filter ? <b>Search By {this.state.filter}</b> : null}</p>
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
                                                                    <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
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
                                                                <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.setState({ employeeid: item.Emp_Id, employeename: item.Emp_name, email: item.Emp_email, employeedesignation: item.Emp_designation, showdata: false, edit: true }) }}>Edit</a>
                                                                    <a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.Load_Employee_data("employee", item) }}>View Details</a>
                                                                    <a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.deletedata(item) }}>Delete</a></td>
                                                            </tr>
                                                        ) : null}
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
                }
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
                                                        {this.state.validation_err.employeeid ? <p style={{ color: "darkred" }}>{this.state.validation_err.employeeid[0]}</p> : null}

                                                    </Form.Group>
                                                    <Form.Group controlId="EmployeeName">
                                                        <Form.Label>Employee Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Employee Name" value={this.state.employeename} onChange={(e) => { this.setState({ employeename: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter User Name.
                                                </Form.Text>
                                                        {this.state.validation_err.employeename ? <p style={{ color: "darkred" }}>{this.state.validation_err.employeename[0]}</p> : null}

                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Employee Email</Form.Label>
                                                        <Form.Control type="email" placeholder="Enter Employee Offical Email " value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter User Offical Email Address.
                                                </Form.Text>
                                                        {this.state.validation_err.email ? <p style={{ color: "darkred" }}>{this.state.validation_err.email[0]}</p> : null}

                                                    </Form.Group>
                                                    <Form.Group controlId="Employeedesignation">
                                                        <Form.Label>Employee designation</Form.Label>
                                                        <Form.Control type="ext" placeholder="Enter User Offical Email " value={this.state.employeedesignation} onChange={(e) => { this.setState({ employeedesignation: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Employee designation.
                                                </Form.Text>
                                                        {this.state.validation_err.employeedesignation ? <p style={{ color: "darkred" }}>{this.state.validation_err.employeedesignation[0]}</p> : null}

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

export default Employee;