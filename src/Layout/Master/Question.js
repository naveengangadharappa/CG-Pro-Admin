import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import NavSearch from '../../App/layout/AdminLayout/NavBar/NavLeft';
import { fetch, adddata, fileupload, Constants } from "../../network/Apicall";

/*showdata: true,
showoptions: false,
showhint: false,
addquestion: false,
addoption: false,
addhint: false,
editquestion: false,
editoption: false,
edithint: false,*/
class Questions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            choice: 'showquestion',
            data: [],
            options: [],
            hint: [],
            validation_msg: '',
            edit: false,
            level: [],
            sublevel: [],
            pattern: [],
            optionid: '',
            optiontitle: '',
            hintid: '',
            hinttitle: '',
            questiondescription: '',
            questionid: '',
            levelid: '',
            leveltitle: '',
            sublevelid: '',
            subleveltitle: '',
            patternid: '',
            patterntitle: '',
            file: [],
            color: 'darkred',
            filter: '',
            searchdata: '',
            questiondetails: {},
            searchbox: true,
            questiontitle: '',
            fileid: ''
        }
    }

    async componentDidMount() {
        try {
            Constants.currentscreen = 'question';
            let params = {
                action: "fetchdata"
            }
            let result = await fetch(params, 'question')
            if (result.status) {
                this.setState({ data: result.data });
            } else {
                this.setState({ validation_msg: result.message, color: 'darkred' })
            }
        } catch (err) {
            console.log(err);
        }
    }

    loadoptions = async (questiondetails) => {
        try {
            Constants.currentscreen = 'option';
            let params = {
                action: "fetchdata",
                filter: "question",
                questionid: questiondetails.Question_Id
            }
            let result = await fetch(params, 'option')
            if (result.status) {
                this.setState({ questionid: questiondetails.Question_Id, patternid: questiondetails.pattern_Id, patterntitle: questiondetails.patterntitle, options: result.data, questiontitle: questiondetails.Question_Title, patternid: questiondetails.pattern_Id, patterntitle: questiondetails.patterntitle, choice: 'showoption', showoptions: true });
            } else {
                this.setState({ validation_msg: result.message, color: 'darkred', })
            }
        } catch (err) {
            console.log(err);
        }
    }

    loadHints = async (questiondetails) => {
        try {
            Constants.currentscreen = 'option';
            let params = {
                action: "fetchdata",
                filter: "id",
                id: questiondetails.hintid
            }
            console.log("pattern id = " + questiondetails.pattern_Id);
            let result = await fetch(params, 'hint')
            if (result.status) {
                this.setState({ questionid: questiondetails.Question_Id, patternid: questiondetails.pattern_Id, patterntitle: questiondetails.patterntitle, hint: result.data, questiontitle: questiondetails.Question_Title, choice: 'showhint' });
            } else {
                this.setState({ validation_msg: result.message, color: 'darkred', })
            }
        } catch (err) {
            console.log(err);
        }
    }

    loaddata = async () => {
        try {
            console.log("enterd load function");
            let params = {
                action: 'fetchdata',
                filter: '',
                questionid: 0,
                questiontite: '',
                levelid: 0,
                sublevelid: 0,
                patternid: 0
            }
            switch (this.state.filter) {
                case 'id': params.questionid = this.state.searchdata;
                    params.filter = 'id';
                    break;
                case 'title':
                    params.questiontite = this.state.searchdata;
                    params.filter = 'title';
                    break;
                case 'level': params.levelid = this.state.levelid;
                    params.filter = 'level';
                    break;
                case 'sublevel': params.sublevelid = this.state.sublevelid;
                    params.filter = 'sublevel';
                    break;
                case 'pattern': params.patternid = this.state.patternid;
                    params.filter = 'pattern';
                    break;
                default: params.filter = '';
            }
            // if (String(this.state.searchdata).length > 0) {
            let result = await fetch(params, 'question')
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

    addoptions = async () => {
        try {
            let params = {
                action: "adddata",
                title: this.state.optiontitle,
                patternid: this.state.patternid,
                questionid: this.state.questionid
            }
            let result = await adddata(params, 'option');
            if (result.status) {
                await this.loaddata();
                alert(result.message);
                this.setState({ validation_msg: result.message, color: 'darkgreen', choice: 'showquestion' });
            } else {
                this.setState({ validation_msg: result.message, color: 'darkred' });
            }
        } catch (err) {
            console.log(err);
        }
    }

    addhint = async () => {
        try {
            console.log("state  = ", (this.state));
            let params = {
                action: "adddata",
                title: this.state.hinttitle,
                questionid: this.state.questionid,
                patternid: this.state.patternid  //if file exists pass fileid
            }
            let result = await adddata(params, 'hint');
            if (result.status) {
                await this.loaddata();
                alert(result.message);
                this.setState({ validation_msg: result.message, color: 'darkgreen', choice: 'showquestion' });
            } else {
                this.setState({ validation_msg: result.message, color: 'darkred' });
            }
        } catch (err) {
            console.log(err);
        }
    }

    edithint = async () => {
        try {
            let params = {
                action: "updatedata",
                title: this.state.hinttitle,
                questionid: this.state.questionid,
                patternid: this.state.patternid,
                fileid: this.state.fileid,//pass file id
                hintid: this.state.hintid
            }
            let result = await adddata(params, 'hint');
            if (result.status) {
                await this.loaddata();
                alert(result.message);
                this.setState({ validation_msg: result.message, color: 'darkgreen', choice: 'showquestion' });
            } else {
                this.setState({ validation_msg: result.message, color: 'darkred' });
            }
        } catch (err) {
            console.log(err);
        }
    }

    editoptions = async () => {
        try {
            let params = {
                action: "updatedata",
                title: this.state.optiontitle,
                questionid: this.state.questionid,
                optionid: this.state.optionid,
                fileid: this.state.fileid,
                patternid: this.state.patternid,
            }
            let result = await adddata(params, 'option');
            if (result.status) {
                await this.loaddata();
                alert(result.message);
                this.setState({ validation_msg: result.message, color: 'darkgreen', choice: 'showquestion' });
            } else {
                this.setState({ validation_msg: result.message, color: 'darkred' });
            }
        } catch (err) {
            console.log(err);
        }
        //this.setState({ optiontitle });
    }

    deletehint = async (hintid) => {
        try {
            let del = window.confirm("Do you want to proceed with deleting this Hint ");
            if (del) {
                let params = {
                    action: "deletedata",
                    hintid: hintid
                }
                let result = await adddata(params, 'hint');
                if (result.status) {
                    alert(result.message);
                    this.setState({ validation_msg: result.message, color: 'darkgreen', choice: 'showquestion' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    deleteoptions = async (optionid) => {
        try {
            let del = window.confirm("Do you want to proceed with deleting this Option ");
            if (del) {
                let params = {
                    action: "deletedata",
                    title: this.state.optiontitle,
                    optionid: optionid
                }
                let result = await adddata(params, 'option');
                if (result.status) {
                    alert(result.message);
                    this.setState({ validation_msg: result.message, color: 'darkgreen', choice: 'showquestion' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    submiteditquestion = async () => {
        console.log("state  = ", (this.state));
        /*const params = new FormData();
        for (const key of Object.keys(this.state.file)) {
            params.append('file', this.state.file[key]);
        }
        params.append("type", "question");
        params.append("questionid", 0);
        let result = await fileupload(params);
        if (result.status) {
            alert(result.message);
            this.setState({ validation_msg: result.message, color: 'darkgreen' });
        } else {
            this.setState({ validation_msg: result.message, color: 'darkred' });
        }*/
    }

    submitaddquestion = async () => {
        console.log("state  = ", (this.state));
        /*const params = new FormData();
        for (const key of Object.keys(this.state.file)) {
            params.append('file', this.state.file[key]);
        }
        params.append("type", "question");
        params.append("questionid", 0);
        let result = await fileupload(params);
        if (result.status) {
            alert(result.message);
            this.setState({ validation_msg: result.message, color: 'darkgreen' });
        } else {
            this.setState({ validation_msg: result.message, color: 'darkred' });
        }*/
    }

    addquestion = async () => {
        try {
            let params = {
                action: "fetchdata"
            }
            this.setState({ choice: 'addquestion', showdata: false })
            let levelresult = await fetch(params, 'level')
            if (levelresult.status) {
                this.setState({ level: levelresult.data });
                let sublevelresult = await fetch(params, 'sublevel')
                if (sublevelresult) {
                    this.setState({ sublevel: sublevelresult.data });
                    let patternresult = await fetch(params, 'pattern')
                    if (patternresult) {
                        this.setState({ pattern: patternresult.data });
                    } else {
                        this.setState({ validation_msg: patternresult.message, color: 'darkred' })
                    }
                } else {
                    this.setState({ validation_msg: sublevelresult.message, color: 'darkred' })
                }
            } else {
                this.setState({ validation_msg: levelresult.message, color: 'darkred' })
            }
        } catch (err) {
            console.log(err);
        }
    }

    editdata = async (data) => {
        try {
            /* Level_Id: 1
             Question_Id: 2
             Question_Title: "question 2"
             Sublevel_Id: 1
             answerid: 3
             answertitle: "Option 3"
             hintid: 2
             hinttitle: "hint 2"
             modified_time: "2020-10-14T03:20:42.000Z"
             pattern_Id: 2
             patterntitle: "50/50 eleiminate 2 wrong option clicking on hint"*/

            let params = {
                action: "fetchdata"
            }
            let title = [];
            this.setState({ choice: 'editquestion', showdata: false, edit: true, questiondetails: data, questiondescription: data.Question_Title });
            let levelresult = await fetch(params, 'level')
            if (levelresult.status) {
                title = levelresult.data.filter(item => { if (item.Level_Id == data.Level_Id) { return item.Level_Title } })
                if (title.length > 0) {
                    this.setState({ level: levelresult.data, levelid: data.Level_Id, leveltitle: title[0].Level_Title });
                } else {
                    this.setState({ level: levelresult.data, levelid: data.Level_Id });
                }
                let sublevelresult = await fetch(params, 'sublevel')
                if (sublevelresult) {
                    title = sublevelresult.data.filter(item => { if (item.Id == data.Sublevel_Id) { return item.title } })
                    if (title.length > 0) {
                        this.setState({ sublevel: sublevelresult.data, sublevelid: data.Id, subleveltitle: title[0].title, patternid: data.pattern_Id, patterntitle: data.patterntitle });
                    } else {
                        this.setState({ sublevel: sublevelresult.data, sublevelid: data.Id, patternid: data.pattern_Id, patterntitle: data.patterntitle });
                    }
                    let patternresult = await fetch(params, 'pattern')
                    if (patternresult) {
                        this.setState({ pattern: patternresult.data });
                    } else {
                        this.setState({ validation_msg: patternresult.message, color: 'darkred' });
                    }
                } else {
                    this.setState({ validation_msg: sublevelresult.message, color: 'darkred' });
                }
            } else {
                this.setState({ validation_msg: levelresult.message, color: 'darkred' });
            }
        } catch (err) {
            console.log(err);
        }
    }

    deletedata = async (data) => {
        try {
            let del = window.confirm("Do you want to proceed with deleting this Question ");
            if (del) {
                let params = {
                    action: "deletedata",
                    questionid: data.Question_Id
                }
                this.setState({ choice: "showquestion", showdata: false })
                let result = await this.deletedata(params, 'level')
                if (result.status) {
                    alert(result.message);
                    this.setState({ validation_msg: result.message, color: 'darkgreen' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'darkred' });
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
            case 'level':
                let levelresult = await fetch(params, 'level')
                if (levelresult.status) {
                    this.setState({ filter: 'level', searchbox: false, level: levelresult.data });
                } else {
                    this.setState({ validation_msg: levelresult.message })
                }
                break;
            case 'sublevel':
                let sublevelresult = await fetch(params, 'sublevel')
                if (sublevelresult.status) {
                    this.setState({ filter: 'sublevel', searchbox: false, sublevel: sublevelresult.data });
                } else {
                    this.setState({ validation_msg: sublevelresult.message })
                }
                break;
            case 'pattern':
                let patternresult = await fetch(params, 'pattern')
                if (patternresult.status) {
                    this.setState({ filter: 'pattern', searchbox: false, pattern: patternresult.data });
                } else {
                    this.setState({ validation_msg: patternresult.message })
                }
                break;
        }
    }

    updateoptions = (id, data) => {
        console.log("entered update option");
        let temp = this.state.edit;
        temp[id] = false;
        let tempdata = this.state.olddata;
        data.options = this.state.editoptions
        tempdata[id] = data;
        this.setState({ edit: temp, olddata: tempdata })
    }

    selecthint = (hint) => {
        switch (hint) {
            case 'Images': this.setState({ hint_Images: true, hint_50: false, hint_pattern3: false, hint_pattern4: false, hint_pattern5: false })
                break;
            case '50': this.setState({ hint_50: true, hint_Images: false, hint_pattern3: false, hint_pattern4: false, hint_pattern5: false })
                break;
            case 'pattern3': this.setState({ hint_pattern3: true, })
                break;
            case 'pattern4': this.setState({ hint_50: true, hint_Images: false, hint_pattern3: false, hint_pattern4: true, hint_pattern5: false })
                break;
            case 'pattern5': this.setState({ hint_pattern5: true })
                break;
        }
    }

    render() {

        switch (this.state.choice) {
            case 'showquestion':
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card className='Recent-Users'>
                                    <Card.Header >
                                        <Card.Title as='h5'>Questions</Card.Title>
                                        <center><p>{String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        </p></center>
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={this.addquestion} >Add Question</a></div>
                                        <div style={{ float: "right", paddingRight: 5, flexDirection: 'row', paddingRight: 10, paddingBottom: 5 }}>
                                            <InputGroup  >
                                                {this.state.searchbox ? <FormControl
                                                    placeholder="Search...."
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    name='search'
                                                    onChange={(e) => { this.setState({ searchdata: e.target.value }) }}
                                                /> :
                                                    <div>
                                                        {this.state.filter == 'level' ?
                                                            <Form.Control as="select" name="level" onChange={(e) => { this.setState({ levelid: e.target.value }) }}>
                                                                <option>select level </option>
                                                                {this.state.level.length > 0 ?
                                                                    this.state.level.map(item => <option value={item.Level_Id}>{item.Level_Title}</option>) : null
                                                                }
                                                            </Form.Control> : null}
                                                        {this.state.filter == 'sublevel' ?
                                                            <Form.Control as="select" name="sublevel" onChange={(e) => { this.setState({ sublevelid: e.target.value }) }}>
                                                                <option>select sublevel </option>
                                                                {this.state.sublevel.length > 0 ?
                                                                    this.state.sublevel.map(item => <option value={item.Id}>{item.title}</option>) : null
                                                                }
                                                            </Form.Control> : null}
                                                        {this.state.filter == 'pattern' ?
                                                            <Form.Control as="select" name="pattern" onChange={(e) => { this.setState({ patternid: e.target.value }) }}>
                                                                <option>select pattern </option>
                                                                {this.state.pattern.length > 0 ?
                                                                    this.state.pattern.map(item => item.pattern_Id == this.state.patternid ? null : <option value={item.pattern_Id}>{item.Title}</option>) : null
                                                                }
                                                            </Form.Control> : null}
                                                    </div>
                                                }
                                                <Dropdown as={InputGroup.Append}>
                                                    <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic-2" />
                                                    <Button variant="secondary" onClick={this.loaddata}>Search</Button>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item hred="#/action-2" onClick={() => { this.displayfilter('title') }}>Search by Name</Dropdown.Item>
                                                        <Dropdown.Item hred="#/action-3" onClick={() => { this.displayfilter('level') }}>Search by level</Dropdown.Item>
                                                        <Dropdown.Item hred="#/action-4" onClick={() => { this.displayfilter('sublevel') }}>Search by sublevel</Dropdown.Item>
                                                        <Dropdown.Item hred="#/action-5" onClick={() => { this.displayfilter('pattern') }}>Search by pattern</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </InputGroup>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Question Title</th>
                                                    <th>Answer</th>
                                                    <th>pattern</th>
                                                    <th>Level Id</th>
                                                    <th>SubLevel Id</th>
                                                    <th>Options</th>
                                                    <th>Hint</th>
                                                    <th>Edit/Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.data.length > 0 ?
                                                    this.state.data.map(item =>
                                                        <tr>
                                                            <th scope="row">
                                                                {item.Question_Title}
                                                            </th>
                                                            <td>
                                                                <h6 className="mb-1">{item.answertitle}</h6>
                                                            </td>

                                                            <td>
                                                                <h6 className="text-muted">{item.patterntitle}</h6>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted">{item.Level_Id}</h6>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted">{item.Sublevel_Id}</h6>
                                                            </td>
                                                            <td>
                                                                <a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.loadoptions(item) }}>view Options</a>
                                                            </td>
                                                            <td>
                                                                <a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.loadHints(item) }}>view Hint</a>
                                                            </td>
                                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.editdata(item) }}>Edit</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.deletedata(item) }}>Delete</a></td>
                                                        </tr>
                                                    ) :
                                                    null}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>

                            </Col>
                        </Row>
                    </Aux>
                );
                break;
            case 'showoption':
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card className='Recent-Users'>
                                    <Card.Header>
                                        <Card.Title as='h5'>Option Details</Card.Title>
                                        <p> <b>Question :{this.state.questiontitle}</b></p>
                                        <center><p>{String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        </p></center>
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "addoption" }) }} >Add Options</a></div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Option Title</th>
                                                    <th>Files</th>
                                                    <th>Modified_Time</th>
                                                    <th>Edit/Delete</th>
                                                    <th>choose Answer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.data.length > 0 ?
                                                    this.state.options.map(item =>
                                                        <tr>
                                                            <td>{item.Title}</td>
                                                            <td>{item.File_Id ? item.File_Id : "No file "}</td>
                                                            <td>{item.modified_time}</td>
                                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.setState({ optionid: item.Option_Id, optiontitle: item.Title, fileid: item.File_Id, choice: "editoption" }) }}>Edit</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.deleteoptions(item.Option_Id) }}>Delete</a></td>
                                                            <td><a href={DEMO.BLANK_LINK} className="label text-green f-12" onClick={() => { this.setState({ optionid: item.Option_Id, optiontitle: item.Title, fileid: item.File_Id, }) }}><b>Mark as Answer</b></a></td>
                                                        </tr>
                                                    ) :
                                                    null}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>

                            </Col>
                        </Row>
                    </Aux>
                );
                break;
            case 'showhint':
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card className='Recent-Users'>
                                    <Card.Header>
                                        <Card.Title as='h5'>Hint Details</Card.Title>
                                        <p> <b>Question :{this.state.questiontitle}</b></p>
                                        <center><p>{String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        </p></center>
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                        {this.state.hint.length > 0 ? null : <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "addhint" }) }} >Add Hint</a></div>}
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Hint Title</th>
                                                    <th>Files</th>
                                                    <th>Modified_Time</th>
                                                    <th>Edit/Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.hint.length > 0 ?
                                                    this.state.hint.map(item =>
                                                        <tr>
                                                            <td>{item.Title}</td>
                                                            <td>{item.File_Ids ? item.File_Id : "No file "}</td>
                                                            <td>{item.modified_time}</td>
                                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.setState({ hintid: item.Id, hinttitle: item.Title, fileid: item.File_Ids, choice: "edithint" }) }}>Edit</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.deletehint(item.Id) }}>Delete</a></td>
                                                        </tr>
                                                    ) :
                                                    null}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>

                            </Col>
                        </Row>
                    </Aux>
                );
                break;
            case 'addquestion':
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">Question Details</Card.Title>
                                        {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                    </Card.Header>
                                    <Card.Body>
                                        <h5>Enter New Question Details</h5>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <Form>
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Question Description</Form.Label>
                                                        <Form.Control as="textarea" rows="3" value={this.state.questiondescription} onChange={(e) => { this.setState({ questiondescription: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Question data.
                                                        </Form.Text>
                                                    </Form.Group>
                                                    {this.state.patternid == 3 || this.state.patternid == 4 ? <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Question Images</Form.Label>
                                                        <Form.Control type="file" name="file" multiple accept="image/*" onChange={(e) => { this.setState({ file: e.target.files }) }} />
                                                        <Form.Text className="text-muted">
                                                            Upload Files for this question.
                                                        </Form.Text>
                                                    </Form.Group> : null}

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

                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Select Sub-Level</Form.Label>
                                                    <Form.Control as="select" onChange={(e) => { this.setState({ sublevelid: e.target.value }) }}>
                                                        <option value={this.state.sublevelid} selected>{this.state.subleveltitle}</option>
                                                        {this.state.sublevel.length > 0 ?
                                                            this.state.sublevel.map(item => <option value={item.Id}>{item.title}</option>) : null
                                                            // this.state.sublevel.map(item => item.Id == this.state.sublevelid ? null : <option value={item.Id}>{item.title}</option>) : null
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Select pattern</Form.Label>
                                                    <Form.Control as="select" onChange={(e) => { this.setState({ patternid: e.target.value }) }}>
                                                        <option value={this.state.patternid} selected>{this.state.patterntitle}</option>
                                                        {this.state.pattern.length > 0 ?
                                                            this.state.pattern.map(item => item.pattern_Id == this.state.patternid ? null : <option value={item.pattern_Id}>{item.Title}</option>) : null
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button variant="primary" onClick={this.submitaddquestion}>
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
                break;
            case 'addoption':
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">Option Details</Card.Title>
                                        {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                    </Card.Header>
                                    <Card.Body>
                                        <h5>Enter Option Details</h5>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <Form>
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Option Description</Form.Label>
                                                        <Form.Control as="textarea" rows="3" value={this.state.optiontitle} onChange={(e) => { this.setState({ optiontitle: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Option Title.
                                                        </Form.Text>
                                                    </Form.Group>
                                                    {this.state.patternid == 3 || this.state.patternid == 4 ? <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Option Images</Form.Label>
                                                        <Form.Control type="file" name="file" multiple accept="image/*" onChange={(e) => { this.setState({ file: e.target.files }) }} />
                                                        <Form.Text className="text-muted">
                                                            Upload Files for this question.
                                                        </Form.Text>
                                                    </Form.Group> : null}

                                                </Form>
                                                <Button variant="primary" onClick={this.addoptions}>
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
                break;
            case 'addhint':
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">Hint Details</Card.Title>
                                        {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                    </Card.Header>
                                    <Card.Body>
                                        <h5>Enter Hint Details</h5>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <Form>
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Hint Description</Form.Label>
                                                        <Form.Control as="textarea" rows="3" value={this.state.hinttitle} onChange={(e) => { this.setState({ hinttitle: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Hint Title.
                                                        </Form.Text>
                                                    </Form.Group>
                                                    {this.state.patternid == 3 || this.state.patternid == 4 ? <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Question Images</Form.Label>
                                                        <Form.Control type="file" name="file" multiple accept="image/*" onChange={(e) => { this.setState({ file: e.target.files }) }} />
                                                        <Form.Text className="text-muted">
                                                            Upload Files for this question.
                                                        </Form.Text>
                                                    </Form.Group> : null}

                                                </Form>
                                                <Button variant="primary" onClick={this.addhint}>
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
                break;
            case 'editquestion': console.log("pattern Id = " + this.state.patternid);
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">Question Details</Card.Title>
                                        {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                    </Card.Header>
                                    <Card.Body>
                                        <h5>Enter New Question Details</h5>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <Form>
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Question Description</Form.Label>
                                                        <Form.Control as="textarea" rows="3" value={this.state.questiondescription} onChange={(e) => { this.setState({ questiondescription: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Question data.
                                                        </Form.Text>
                                                    </Form.Group>
                                                    {this.state.patternid == 3 || this.state.patternid == 4 ? <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Question Images</Form.Label>
                                                        <Form.Control type="file" name="file" multiple accept="image/*" onChange={(e) => { this.setState({ file: e.target.files }) }} />
                                                        <Form.Text className="text-muted">
                                                            Upload Files for this question.
                                                        </Form.Text>
                                                    </Form.Group> : null}

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

                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Select Sub-Level</Form.Label>
                                                    <Form.Control as="select" onChange={(e) => { this.setState({ sublevelid: e.target.value }) }}>
                                                        <option value={this.state.sublevelid} selected>{this.state.subleveltitle}</option>
                                                        {this.state.sublevel.length > 0 ?
                                                            this.state.sublevel.map(item => <option value={item.Id}>{item.title}</option>) : null
                                                            // this.state.sublevel.map(item => item.Id == this.state.sublevelid ? null : <option value={item.Id}>{item.title}</option>) : null
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Select pattern</Form.Label>
                                                    <Form.Control as="select" onChange={(e) => { this.setState({ patternid: e.target.value }) }}>
                                                        <option value={this.state.patternid} selected>{this.state.patterntitle}</option>
                                                        {this.state.pattern.length > 0 ?
                                                            this.state.pattern.map(item => item.pattern_Id == this.state.patternid ? null : <option value={item.pattern_Id}>{item.Title}</option>) : null
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button variant="primary" onClick={this.submiteditquestion}>
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
                break;
            case 'editoption': console.log("pattern Id = " + this.state.patternid);
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">Option Details</Card.Title>
                                        {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                    </Card.Header>
                                    <Card.Body>
                                        <h5>Enter Option Details</h5>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <Form>
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Option Description</Form.Label>
                                                        <Form.Control as="textarea" rows="3" value={this.state.optiontitle} onChange={(e) => { this.setState({ optiontitle: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Option Title.
                                                        </Form.Text>
                                                    </Form.Group>
                                                    {this.state.patternid == 3 || this.state.patternid == 4 ? <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Option Images</Form.Label>
                                                        <Form.Control type="file" name="file" multiple accept="image/*" onChange={(e) => { this.setState({ file: e.target.files }) }} />
                                                        <Form.Text className="text-muted">
                                                            Upload Files for this question.
                                                        </Form.Text>
                                                    </Form.Group> : null}

                                                </Form>
                                                <Button variant="primary" onClick={this.editoptions}>
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
                break;
            case 'edithint':
                console.log("pattern Id = " + this.state.patternid);
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">Hint Details</Card.Title>
                                        {String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null}
                                        <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                    </Card.Header>
                                    <Card.Body>
                                        <h5>Enter Hint Details</h5>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <Form>
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Hint Description</Form.Label>
                                                        <Form.Control as="textarea" rows="3" value={this.state.hinttitle} onChange={(e) => { this.setState({ hinttitle: e.target.value }) }} />
                                                        <Form.Text className="text-muted">
                                                            Enter Hint Title.
                                                        </Form.Text>
                                                    </Form.Group>
                                                    {this.state.patternid == 3 || this.state.patternid == 4 ? <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>Question Images</Form.Label>
                                                        <Form.Control type="file" name="file" multiple accept="image/*" onChange={(e) => { this.setState({ file: e.target.files }) }} />
                                                        <Form.Text className="text-muted">
                                                            Upload Files for this question.
                                                        </Form.Text>
                                                    </Form.Group> : null}

                                                </Form>
                                                <Button variant="primary" onClick={this.edithint}>
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
                break;
        }

    }
}

export default Questions;