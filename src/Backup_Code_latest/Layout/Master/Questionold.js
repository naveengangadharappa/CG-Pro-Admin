import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

class Questionsold extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            validation_msg: '',
            edit: false,
            olddata: [],
            Qid: 0,
            id: 0,
            Qtitle: '',
            sublevel: '',
            level: '',
            currentoption: '',
            editcuroption: false,
            currentoptionid: 999,
            hint: '',
            answer: '',
            edit: [],
            editoptions: [],
            hint_Images: false,
            hint_50: false,
            hint_pattern3: false,
            hint_pattern4: false,
            hint_pattern5: false,
            file1: "",
            file2: "",
        }
    }

    async componentDidMount() {
        let params = {
            action: "fetchdata"
        }
        let result = await fetch(params, 'sublevel')
        if (result.status) {
            this.setState({ data: result.data });
        } else {
            this.setState({ validation_msg: result.message })
        }

        /* let temp = [];
         let editdata = [];
         for (let i = 0; i < 2; i++) {
             temp.push({
                 id: i,
                 Qid: i,
                 Qtitle: "Question" + i,
                 sublevel: 'sublevel' + i,
                 level: "level" + i,
                 options: [{ id: 1, title: "opt1" }, { id: 2, title: "opt2" }, { id: 3, title: "opt3" }, { id: 4, title: "opt4" }],
                 hint: "hint" + i,
                 answer: "answer" + i,
             });
             editdata.push(false);
         }
         this.setState({ olddata: temp, edit: editdata });*/
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
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Questions</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Question Title</th>
                                            <th>Level Name</th>
                                            <th>SubLevel Name</th>
                                            <th>Options</th>
                                            <th>Hint</th>
                                            <th>Answer</th>
                                            <th>Update/Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.olddata.map((item) =>

                                            <tr>
                                                <td>
                                                    {this.state.edit[item.id] ? <p className="mb-1"> <input type="text" style={{ borderWidth: 0 }} placeholder="Question Title" value={this.state.Qtitle} name="Qtitle" size="30" autofocus="autofocus" onChange={(e) => { e.target.value.includes("+") ? this.setState({ validation_empid: "Special chracter not allowed", Qtitle: "" }) : this.setState({ Qtitle: e.target.value, validation_empid: "" }) }} />
                                                    </p> : item.Qtitle
                                                        /*<img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />*/
                                                    }
                                                </td>
                                                <td>{this.state.edit[item.id] ? <p className="mb-1"><select name="design" onChange={(e) => { this.setState({ level: e.target.value, sublevel: "" }) }}>
                                                    <option value="level1">Level1</option>
                                                    <option value="level2">Level2</option>
                                                    <option value="level3">Level3</option>
                                                </select>
                                                </p> : item.level}</td>
                                                <td>{this.state.edit[item.id] ?
                                                    <p className="mb-1"><select name="design" onChange={(e) => { this.setState({ sublevel: e.target.value }) }}>
                                                        <option value="level1">Sublevel1</option>
                                                        <option value="level2">SubLevel2</option>
                                                        <option value="level3">SubLevel3</option>
                                                    </select>
                                                    </p> : item.sublevel}</td>

                                                {this.state.edit[item.id] ?
                                                    <td>
                                                        {this.state.editoptions.map(opt =>
                                                            this.state.editcuroption && opt.id === this.state.currentoptionid ?
                                                                <p className="mb-1"> <input type="text" placeholder="option Title" value={this.state.currentoption} name="curoption" onChange={(e) => { this.setState({ currentoption: e.target.value }) }} />
                                                                    <a href={DEMO.BLANK_LINK} className="theme-bg8 text-red " onClick={() => { let temp = this.state.editoptions; temp[this.state.currentoptionid - 1] = { id: this.state.currentoptionid, title: this.state.currentoption }; this.setState({ editcuroption: false, currentoptionid: 999, editoptions: temp, }) }}>{/*<i className="fa fa-circle text-c-red f-10 m-r-15" />*/}<img src="../../../assets/images/updateicon.jpg" style={{ borderRadius: 50, width: 25, hight: 25 }} /></a></p>
                                                                : <p className="mb-1">{opt.title}<a href={DEMO.BLANK_LINK} className="theme-bg8 text-red " onClick={() => { this.setState({ editcuroption: true, currentoptionid: opt.id, currentoption: opt.title }) }}>{/*<i className="fa fa-circle text-c-red f-10 m-r-15" />*/}<img src="../../../assets/images/editopt.png" style={{ borderRadius: 50, width: 25, hight: 25 }} /></a><a href={DEMO.BLANK_LINK} className="theme-bg8 text-red " onClick={() => { let temp = this.state.editoptions; temp.splice(opt.id - 1, 1); this.setState({ editoptions: temp }) }}>{/*<i className="fa fa-circle text-c-red f-10 m-r-15" />*/}<img src="../../../assets/images/deleteicon.jpg" style={{ borderRadius: 50, width: 25, hight: 25 }} /></a>
                                                                </p>
                                                        )}
                                                        <p ><a href={DEMO.BLANK_LINK} onClick={() => { let temp = this.state.editoptions; if (temp[temp.length - 1] === "") { } temp.push({ id: this.state.editoptions.length + 1, title: "" }); this.setState({ editoptions: temp, editcuroption: true, currentoptionid: temp.length }) }}><img src="../../../assets/images/add.png" style={{ borderRadius: 50, width: 50, hight: 50 }} /></a></p>
                                                    </td> :
                                                    <td>{item.options.map(opt => <p className="mb-1">{opt.title}</p>)}</td>}

                                                <td>
                                                    {this.state.edit[item.id] ?
                                                        <p className="mb-1">
                                                            <select name="design" onChange={(e) => { this.selecthint(e.target.value) }}>
                                                                <option value="Images">Images</option>
                                                                <option value="50">50/50 </option>
                                                                <option value="pattern3">Matching pair</option>
                                                                <option value="pattern4">choose Right</option>
                                                                <option value="pattern5">Pattern 5</option>
                                                            </select>

                                                            {this.state.hint_Images ? <p className="mb-1">
                                                                <p className="mb-1"><input type="file" accept="image/*" value={this.state.file4} name="file1" onChange={(e) => { this.setState({ file4: e.target.value }) }} /></p>
                                                            </p> : null}
                                                            {this.state.hint_pattern4 ? <p className="mb-1">
                                                                <p className="mb-1"><input type="file" accept="image/*" placeholder=" Image 1" value={this.state.file1} name="file1" onChange={(e) => { this.setState({ file1: e.target.value }) }} /></p>
                                                                <p className="mb-1"><input type="file" accept="image/*" placeholder=" Image 2" value={this.state.file2} name="file2" onChange={(e) => { this.setState({ file2: e.target.value }) }} /></p>
                                                            </p> : null}
                                                        </p> : item.hint}
                                                </td>
                                                <td>
                                                    <h6 className="text-muted">
                                                        {this.state.edit[item.id] ? <p className="mb-1">
                                                            <select name="design" onChange={(e) => { this.setState({ answer: e.target.value }) }}>
                                                                <option value="Hint1">Answer 1</option>
                                                                <option value="hint1">Answer 2</option>
                                                                <option value="Hint1">Answer 3</option>
                                                            </select></p> : item.answer}</h6>
                                                </td>
                                                <td><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { let temp = this.state.edit; temp[item.id] = true; this.setState({ edit: temp, Qtitle: item.Qtitle, level: item.level, sublevel: item.sublevel, editoptions: item.options, hint: item.hint, answer: item.answer, Qid: item.Qid, id: item.id }) }}>Edit</a><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { let temp = this.state.olddata; temp = temp.splice(item.id - 1, 1); this.setState({ olddata: temp }) }}>Delete</a></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Questionsold;