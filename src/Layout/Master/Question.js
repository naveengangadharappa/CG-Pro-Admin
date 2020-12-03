import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import Loader from "../../App/layout/Loader";
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import NavSearch from '../../App/layout/AdminLayout/NavBar/NavLeft';
import { fetch, adddata, deletedata, fileupload, Constants, singlefileupload } from "../../network/Apicall";
import { Picture } from 'react-responsive-picture';
import { withRouter } from 'react-router-dom';
import { validatedata } from '../../Validation/Validation';

class Questions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageno: 0,
            loading: false,
            question_fileupload_pattern: Constants.question_fileupload_pattern,
            option_fileupload_pattern: Constants.option_fileupload_pattern,
            hint_fileupload_pattern: Constants.hint_fileupload_pattern,
            choice: 'showquestion',
            addfile: '',
            newfileid: '',
            data: [],
            options: [],
            hint: [],
            validation_msg: '',
            edit: false,
            level: [],
            sublevel: [],
            pattern: [],
            answerid: '',
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
            color: 'pink',
            filter: '',
            searchdata: '',
            questiondetails: {},
            searchbox: true,
            questiontitle: '',
            fileid: '',
            imagesarray: [],
            imageview: false,
            questionfiles: [],
            showfiles: false,
            validation_err: {}
        }
    }

    async componentDidMount() {
        try {
            Constants.currentscreen = 'question';
            let params = {
                action: "fetchdata"
            }
            this.setState({ loading: true });
            let result = await fetch(params, 'question')
            this.setState({ loading: false });
            if (result.status) {
                this.setState({ data: result.data });
            } else {
                this.setState({ validation_msg: result.message, color: 'pink' })
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
            this.setState({ loading: true });
            let result = await fetch(params, 'option')
            this.setState({ loading: false });
            if (result.status) {
                if (result.data.length > 0) {
                    let params = {
                        action: "fetchdata",
                        filter: "question",
                        questionid: questiondetails.Question_Id
                    }
                    this.setState({ loading: true });
                    let answerresult = await fetch(params, 'answer')
                    this.setState({ loading: false });
                    if (answerresult.status) {
                        if (answerresult.data.length > 0) {
                            this.setState({ answerid: answerresult.data[0].Id, questionid: questiondetails.Question_Id, patternid: questiondetails.pattern_Id, patterntitle: questiondetails.patterntitle, options: result.data, questiontitle: questiondetails.Question_Title, patternid: questiondetails.pattern_Id, patterntitle: questiondetails.patterntitle, choice: 'showoption', showoptions: true });
                        } else {
                            this.setState({ choice: 'showoption', questionid: questiondetails.Question_Id, options: result.data, validation_msg: "Answer not marked for this Question please Mark Answer", color: 'pink', })
                        }
                    } else {
                        this.setState({ validation_msg: answerresult.message, color: 'pink', questionid: questiondetails.Question_Id, patternid: questiondetails.pattern_Id, patterntitle: questiondetails.patterntitle, options: result.data, questiontitle: questiondetails.Question_Title, patternid: questiondetails.pattern_Id, patterntitle: questiondetails.patterntitle, choice: 'showoption', showoptions: true })
                    }
                } else {
                    this.setState({ choice: 'showoption', options: [], questionid: questiondetails.Question_Id, validation_msg: "No Options Availble", color: 'pink', })
                }
            } else {
                this.setState({ loading: true, validation_msg: result.message, options: [], color: 'pink', })
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
                filter: "question",
                id: questiondetails.hintid,
                questionid: questiondetails.Question_Id
            }
            console.log("pattern id = " + questiondetails.pattern_Id);
            this.setState({ loading: true });
            let result = await fetch(params, 'hint')
            this.setState({ loading: false });
            if (result.status) {
                if (result.data.length > 0) {
                    this.setState({ questionid: questiondetails.Question_Id, patternid: questiondetails.pattern_Id, patterntitle: questiondetails.patterntitle, hint: result.data, questiontitle: questiondetails.Question_Title, choice: 'showhint' });
                } else {
                    this.setState({ hint: [], questionid: questiondetails.Question_Id, patternid: questiondetails.pattern_Id, patterntitle: questiondetails.patterntitle, questiontitle: questiondetails.Question_Title, choice: 'showhint', validation_msg: 'No hint Available, Please Add Hint for this Question', color: 'pink', })
                }
            } else {
                this.setState({ choice: 'showhint', hint: [], validation_msg: result.message, color: 'pink', })
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
                questiontitle: '',
                leveltitle: '',
                subleveltitle: '',
                patterntitle: ''
            }
            switch (this.state.filter) {
                case 'title':
                    params.questiontitle = this.state.searchdata;
                    params.filter = 'title';
                    break;
                case 'level': params.leveltitle = this.state.searchdata;
                    params.filter = 'level';
                    break;
                case 'sublevel': params.subleveltitle = this.state.searchdata;
                    params.filter = 'sublevel';
                    break;
                case 'pattern': params.patterntitle = this.state.searchdata;
                    params.filter = 'pattern';
                    break;
                default: params.filter = '';
            }
            // if (String(this.state.searchdata).length > 0) {
            //this.setState({ loading: true });
            let result = await fetch(params, 'question')
            //this.setState({ loading: false });
            if (result.status) {
                this.setState({ data: result.data, validation_msg: '' });
            } else {
                this.setState({ validation_msg: result.message, color: 'pink' })
            }
            /* } else {
                 console.log("ëlse enterd")
                 this.setState({ validation_msg: 'Search Box Cannot be Empty', color: 'pink' })
             }*/
        } catch (err) {
            console.log(err);
        }
    }

    getfileids = async (questionid) => {
        try {
            let params = {
                type: 'question',
                questionid: questionid
            }
            // this.setState({ loading: true });
            let result = await fetch(params, 'fileid')
            // this.setState({ loading: false });
            if (result.status) {
                this.setState({ questionfiles: result.data, showfiles: true, questionid: questionid, validation_msg: '' });
            } else {
                this.setState({ validation_msg: result.message, color: 'pink' })
            }
        } catch (err) {
            console.log(err);
        }
    }
    getimages = async (imageid) => {
        const images = [
            {
                original: 'http://115.124.127.245:3002/Mission_Onboarding/get_file?fname=' + imageid,
            }
        ];
        this.setState({ imagesarray: images, imageview: true });
    }


    addoptions = async () => {
        try {
            if (this.state.hint_fileupload_pattern.includes(this.state.patternid) && String(this.state.newfileid).length > 0) {
                const params = new FormData();
                params.append('file', this.state.newfileid);
                params.append('type', "question");
                params.append('questionid', '00');
                this.setState({ loading: true });
                let resultfile = await singlefileupload(params);
                if (resultfile.status) {
                    console.log("öld file ids = " + this.state.fileid);
                    let newfiles = resultfile.filedetails.filename;
                    let paramsdata = {
                        action: "adddata",
                        title: this.state.optiontitle,
                        patternid: this.state.patternid,
                        questionid: this.state.questionid,
                        fileid: newfiles
                    }
                    let result = await adddata(paramsdata, 'option');
                    this.setState({ loading: false });
                    if (result.status) {
                        await this.loaddata();
                        alert(result.message);
                        this.setState({ validation_msg: result.message, color: 'lightgreen', choice: 'showquestion' });
                    } else {
                        this.setState({ validation_msg: result.message, color: 'pink' });
                    }
                } else {
                    this.setState({ loading: false, validation_msg: resultfile.message, color: 'pink' });
                }
            } else {
                let params = {
                    action: "adddata",
                    title: this.state.optiontitle,
                    patternid: this.state.patternid,
                    questionid: this.state.questionid
                }
                this.setState({ loading: true });
                let result = await adddata(params, 'option');
                this.setState({ loading: false });
                if (result.status) {
                    await this.loaddata();
                    alert(result.message);
                    this.setState({ validation_msg: result.message, color: 'lightgreen', choice: 'showquestion' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'pink' });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    addhint = async () => {
        try {
            if (this.state.hint_fileupload_pattern.includes(this.state.patternid) && String(this.state.newfileid).length > 0) {
                const params = new FormData();
                params.append('file', this.state.newfileid);
                params.append('type', "question");
                params.append('questionid', '00');
                this.setState({ loading: true });
                let resultfile = await singlefileupload(params);
                if (resultfile.status) {
                    console.log("öld file ids = " + this.state.fileid);
                    let newfiles = resultfile.filedetails.filename;
                    let paramsdata = {
                        action: "adddata",
                        title: this.state.hinttitle,
                        questionid: this.state.questionid,
                        patternid: this.state.patternid,
                        fileid: newfiles  //if file exists pass fileid
                    }
                    let result = await adddata(paramsdata, 'hint');
                    this.setState({ loading: false });
                    if (result.status) {
                        await this.loaddata();
                        alert(result.message);
                        this.setState({ validation_msg: result.message, color: 'lightgreen', choice: 'showquestion' });
                    } else {
                        this.setState({ validation_msg: result.message, color: 'pink' });
                    }
                } else {
                    this.setState({ laoding: false, validation_msg: resultfile.message, color: 'pink' });
                }
            } else {
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
                    this.setState({ validation_msg: result.message, color: 'lightgreen', choice: 'showquestion' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'pink' });
                }
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
            this.setState({ loading: true });
            let result = await adddata(params, 'hint');
            this.setState({ loading: false });
            if (result.status) {
                await this.loaddata();

                alert(result.message);
                this.setState({ validation_msg: result.message, color: 'lightgreen', choice: 'showquestion' });
            } else {
                this.setState({ validation_msg: result.message, color: 'pink' });
            }
        } catch (err) {
            console.log(err);
        }
    }

    editoptions = async () => {
        try {
            if (this.state.hint_fileupload_pattern.includes(this.state.patternid) && String(this.state.newfileid).length > 0) {
                const params = new FormData();
                params.append('file', this.state.newfileid);
                params.append('type', "question");
                params.append('questionid', '00');
                this.setState({ loading: true });
                let resultfile = await singlefileupload(params);
                let newfiles = resultfile.filedetails.filename;
                if (resultfile.status) {
                    let paramsdata = {
                        action: "updatedata",
                        title: this.state.optiontitle,
                        questionid: this.state.questionid,
                        optionid: this.state.optionid,
                        fileid: newfiles,
                        patternid: this.state.patternid,
                    }

                    let result = await adddata(paramsdata, 'option');
                    this.setState({ loading: false });
                    if (result.status) {
                        await this.loaddata();
                        alert(result.message);
                        this.setState({ validation_msg: result.message, color: 'lightgreen', choice: 'showquestion' });
                    } else {
                        this.setState({ validation_msg: result.message, color: 'pink' });
                    }
                }
                else {
                    this.setState({ loading: false, validation_msg: resultfile.message, color: 'pink' });
                }
            } else {

                let params = {
                    action: "updatedata",
                    title: this.state.optiontitle,
                    questionid: this.state.questionid,
                    optionid: this.state.optionid,
                    fileid: this.state.fileid,
                    patternid: this.state.patternid,
                }
                this.setState({ loading: true });
                let result = await adddata(params, 'option');
                this.setState({ loading: false });
                if (result.status) {
                    await this.loaddata();
                    alert(result.message);
                    this.setState({ validation_msg: result.message, color: 'lightgreen', choice: 'showquestion' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'pink' });
                }
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
                this.setState({ loading: true });
                let result = await adddata(params, 'hint');
                this.setState({ loading: false });
                if (result.status) {
                    alert(result.message);
                    this.setState({ validation_msg: result.message, color: 'lightgreen', choice: 'showquestion' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'pink' });
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
                this.setState({ loading: true });
                let result = await adddata(params, 'option');
                this.setState({ loading: false });
                if (result.status) {
                    alert(result.message);
                    this.setState({ validation_msg: result.message, color: 'lightgreen', choice: 'showquestion' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'pink' });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    submiteditquestion = async () => {
        console.log("sublevel id =" + this.state.sublevelid);
        console.log("sublevel title =" + this.state.subleveltitle);
        let paramsdata = {
            action: "updatedata",
            questionid: this.state.questionid,
            questiontitle: this.state.questiontitle,
            levelid: this.state.levelid,
            sublevelid: this.state.sublevelid,
            patternid: this.state.patternid,
        }
        console.log("param data = ", (paramsdata));
        this.setState({ loading: true });
        let result = await adddata(paramsdata, 'question');
        this.setState({ loading: false });
        if (result.status) {
            await this.loaddata();
            alert(result.message);
            this.setState({ validation_msg: result.message, showdata: true, choice: 'showquestion', color: 'lightgreen' });
            console.log("Question Details = ", (result.data));
            /* if (this.state.patternid == 3 || this.state.patternid == 4) {
 
                 const params = new FormData();
                 for (const key of Object.keys(this.state.file)) {
                     params.append('file', this.state.file[key]);
                 }
                 params.append("type", "question");
                 params.append("action", "updatedata");
                 params.append("fileid", this.state.fileid);
                 params.append("questionid", result.data[0].Question_Id);
                 let resultfile = await fileupload(params);
                 if (resultfile.status) {
                     await this.loaddata();
                     alert(result.message);
                     this.setState({ validation_msg: result.message, showdata: true, color: 'lightgreen' });
                 } else {
                     this.setState({ validation_msg: resultfile.message, color: 'pink' });
                 }
            } else {
                 await this.loaddata();
                 alert(result.message);
                 this.setState({ validation_msg: result.message, showdata: true, color: 'lightgreen' });
             }*/
            await this.loaddata();
            alert(result.message);
            this.setState({ validation_msg: result.message, showdata: true, color: 'lightgreen' });
        } else {
            this.setState({ validation_msg: result.message, color: 'pink' });
        }
    }

    submitaddquestion = async () => {
        let paramsdata = {
            action: "adddata",
            questiontitle: this.state.questiontitle,
            levelid: this.state.levelid,
            sublevelid: this.state.sublevelid,
            patternid: this.state.patternid
        }
        this.setState({ loading: true });
        let result = await adddata(paramsdata, 'question');
        this.setState({ loading: false });
        if (result.status) {
            console.log("Question Details = ", (result.data));
            if (this.state.patternid == 3 || this.state.patternid == 4) {

                const params = new FormData();
                for (const key of Object.keys(this.state.file)) {
                    params.append('file', this.state.file[key]);
                }
                params.append("type", "question");
                params.append("action", "adddata");
                params.append("questionid", result.data[0].Question_Id);
                this.setState({ loading: true });
                let resultfile = await fileupload(params);
                this.setState({ loading: false });
                if (resultfile.status) {
                    await this.loaddata();
                    alert(result.message);
                    this.setState({ validation_msg: result.message, showdata: true, color: 'lightgreen', choice: 'showquestion' });
                } else {
                    this.setState({ validation_msg: resultfile.message, color: 'pink' });
                }
            } else {
                await this.loaddata();
                alert(result.message);
                this.setState({ validation_msg: result.message, showdata: true, color: 'lightgreen' });
            }
        } else {
            this.setState({ validation_msg: result.message, color: 'pink' });
        }
    }

    updateAnswer = async (optionid) => {
        try {
            let del = window.confirm("Do you want to Mark this Option as Answer ");
            if (del) {
                console.log("Answer Id = " + this.state.answerid);
                let params = {
                    action: String(this.state.answerid).length > 0 ? "updatedata" : "adddata",
                    questionid: this.state.questionid,
                    answerid: optionid
                }
                this.setState({ loading: true });
                let result = await adddata(params, 'answer');
                this.setState({ loading: false });
                if (result.status) {
                    await this.loaddata();
                    alert(result.message);
                    this.setState({ validation_msg: result.message, choice: 'showquestion', showdata: true, color: 'lightgreen' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'pink' });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    addquestion = async () => {
        try {
            let params = {
                action: "fetchdata"
            }
            this.setState({ choice: 'addquestion', showdata: false })
            this.setState({ loading: true });
            let levelresult = await fetch(params, 'level')
            if (levelresult.status) {
                this.setState({ level: levelresult.data });
                let sublevelresult = await fetch(params, 'sublevel')
                if (sublevelresult) {
                    this.setState({ sublevel: sublevelresult.data });
                    let patternresult = await fetch(params, 'pattern')
                    this.setState({ loading: false });
                    if (patternresult) {
                        this.setState({ pattern: patternresult.data });
                    } else {
                        this.setState({ validation_msg: patternresult.message, color: 'pink' })
                    }
                } else {
                    this.setState({ loading: false, validation_msg: sublevelresult.message, color: 'pink' })
                }
            } else {
                this.setState({ loading: false, validation_msg: levelresult.message, color: 'pink' })
            }
        } catch (err) {
            console.log(err);
        }
    }

    editdata = async (data) => {
        try {
            let params = {
                action: "fetchdata"
            }
            let title = [];
            this.setState({ choice: 'editquestion', showdata: false, edit: true, questiondetails: data, questionid: data.Question_Id, questiondescription: data.Question_Title, questiontitle: data.Question_Title });
            this.setState({ loading: true });
            let levelresult = await fetch(params, 'level')
            if (levelresult.status) {
                title = levelresult.data.filter(item => { if (item.Level_Id == data.Level_Id) { return item.Level_Title } })
                if (title.length > 0) {
                    this.setState({ level: levelresult.data, levelid: data.Level_Id, leveltitle: title[0].Level_Title });
                } else {
                    this.setState({ level: levelresult.data, levelid: data.Level_Id });
                }
                let sublevelresult = await fetch(params, 'sublevel')
                this.setState({ loading: false });
                if (sublevelresult) {
                    title = sublevelresult.data.filter(item => { if (item.Id == data.Sublevel_Id) { return item.title } })
                    if (title.length > 0) {
                        this.setState({ sublevel: sublevelresult.data, sublevelid: data.Sublevel_Id, subleveltitle: title[0].title, patternid: data.pattern_Id, patterntitle: data.patterntitle });
                    } else {
                        this.setState({ sublevel: sublevelresult.data, sublevelid: data.Sublevel_Id, patternid: data.pattern_Id, patterntitle: data.patterntitle });
                    }
                    /*let patternresult = await fetch(params, 'pattern')
                    if (patternresult) {
                        this.setState({ pattern: patternresult.data });
                    } else {
                        this.setState({ validation_msg: patternresult.message, color: 'pink' });
                    }*/
                } else {
                    this.setState({ validation_msg: sublevelresult.message, color: 'pink' });
                }
            } else {
                this.setState({ loading: false, validation_msg: levelresult.message, color: 'pink' });
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
                this.setState({ loading: true });
                let result = await deletedata(params, 'question')
                this.setState({ loading: false });
                if (result.status) {
                    await this.loaddata();
                    alert(result.message);
                    this.setState({ validation_msg: result.message, color: 'lightgreen' });
                } else {
                    this.setState({ validation_msg: result.message, color: 'pink' });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    displayfilter = async (option) => {
        let params = {
            action: "fetchdata",
            filter: '',
            questiontitle: '',
            leveltitle: '',
            subleveltitle: '',
            patterntitle: ''
        }
        switch (option) {
            case 'title': this.setState({ filter: 'title', searchbox: true, });
                break;
            case 'level':
                let levelresult = await fetch(params, 'level')
                if (levelresult.status) {
                    this.setState({ filter: 'level', searchbox: true, level: levelresult.data });
                } else {
                    this.setState({ validation_msg: levelresult.message })
                }
                break;
            case 'sublevel':
                let sublevelresult = await fetch(params, 'sublevel')
                if (sublevelresult.status) {
                    this.setState({ filter: 'sublevel', searchbox: true, sublevel: sublevelresult.data });
                } else {
                    this.setState({ validation_msg: sublevelresult.message })
                }
                break;
            case 'pattern':
                let patternresult = await fetch(params, 'pattern')
                if (patternresult.status) {
                    this.setState({ filter: 'pattern', searchbox: true, pattern: patternresult.data });
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

    addhintfile = async (hintdetails) => {
        console.log("new file = ", this.state.newfileid);
        const params = new FormData();
        params.append('file', this.state.newfileid);
        params.append('type', "question");
        params.append('questionid', '00');
        this.setState({ loading: true });
        let resultfile = await singlefileupload(params);
        if (resultfile.status) {
            console.log("öld file ids = " + this.state.fileid);
            let newfiles = hintdetails.File_Ids == '' || hintdetails.File_Ids == null ? `${resultfile.filedetails.filename}` : hintdetails.File_Ids + `,${resultfile.filedetails.filename}`;
            this.setState({ fileid: newfiles })
            let paramsdata = {
                action: "updatedata",
                title: hintdetails.Title,
                questionid: this.state.questionid,
                patternid: this.state.patternid,
                fileid: this.state.fileid,//pass file id
                hintid: hintdetails.Id
            }
            let result = await adddata(paramsdata, 'hint');
            this.setState({ loading: false });
            if (result.status) {
                await this.loaddata();
                alert(result.message);
                this.setState({ validation_msg: "File Added", showdata: true, color: 'lightgreen', choice: 'showquestion', addfile: '' });
            } else {
                this.setState({ validation_msg: "File cannot be uploaded Please try again", color: 'pink' });
            }
        } else {
            this.setState({ loading: false });
            this.setState({ validation_msg: resultfile.message, color: 'pink' });
        }
    }

    deletehintfile = async (details, fileid) => {
        try {
            let del = window.confirm("Do you want to proceed with deleting this file ");
            if (del) {
                console.log("pos =", String(details.File_Ids).search(fileid));
                let pos = String(details.File_Ids).search(fileid);
                let newfiles = pos > 0 ? String(details.File_Ids).replace(`,${fileid}`, '') : String(details.File_Ids).includes(',') ? String(details.File_Ids).replace(`${fileid},`, '') : String(details.File_Ids).replace(`${fileid}`, '');
                console.log("new files =" + newfiles);
                let paramsdata = {
                    action: "updatedata",
                    title: details.Title,
                    questionid: this.state.questionid,
                    patternid: this.state.patternid,
                    fileid: newfiles,//pass file id
                    hintid: details.Id
                }
                this.setState({ loading: true });
                let result = await adddata(paramsdata, 'hint');
                this.setState({ loading: false });
                if (result.status) {
                    await this.loaddata();
                    alert(result.message);
                    this.setState({ validation_msg: "File Deleted", showdata: true, color: 'lightgreen', choice: 'showquestion', addfile: '' });
                } else {
                    this.setState({ validation_msg: "File Deletion Unsuccessfull Please try again", color: 'pink' });
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    AddQuestionFiles = async (details) => {
        const params = new FormData();
        for (const key of Object.keys(this.state.file)) {
            params.append('file', this.state.file[key]);
        }
        params.append("type", "question");
        params.append("action", "adddata");
        params.append("fileid", this.state.fileid);
        params.append("questionid", details.Question_Id);
        let resultfile = await fileupload(params);
        if (resultfile.status) {
            await this.loaddata();
            alert("File Added Successfully");
            this.setState({ validation_msg: "File Added Successfully", showdata: true, addfile: '', color: 'lightgreen' });
        } else {
            this.setState({ validation_msg: resultfile.message, color: 'pink' });
        }
    }

    deleteoptionfile = async (details, fileid) => {
        try {
            let del = window.confirm("Do you want to proceed with deleting this file ");
            if (del) {
                console.log("pos =", String(details.File_Ids).search(fileid));
                let paramsdata = {
                    action: "updatedata",
                    title: details.Title,
                    questionid: this.state.questionid,
                    patternid: this.state.patternid,
                    fileid: '',//pass file id
                    optionid: details.item.Option_Id
                }
                this.setState({ loading: true });
                let result = await adddata(paramsdata, 'hint');
                this.setState({ loading: false });
                if (result.status) {
                    await this.loaddata();
                    alert(result.message);
                    this.setState({ validation_msg: "File Deleted", showdata: true, color: 'lightgreen', choice: 'showquestion', addfile: '' });
                } else {
                    this.setState({ validation_msg: "File Deletion Unsuccessfull Please try again", color: 'pink' });
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    DeleteQuestionFiles = async (option, details, fileid) => {
        try {
            let del = window.confirm("Do you want to proceed with deleting this file ");
            if (del) {
                console.log("pos =", String(details.File_Ids).search(fileid));
                let params = {
                    action: "deletefiles",
                    type: option,
                    questionid: this.state.questionid,
                    fileid: fileid
                }
                this.setState({ loading: true });
                let result = await adddata(params, 'question');
                this.setState({ loading: false });
                if (result.status) {
                    await this.loaddata();
                    alert(result.message);
                    this.setState({ showfiles: false, validation_msg: "File Deleted", showdata: true, color: 'lightgreen', choice: 'showquestion', addfile: '' });
                } else {
                    this.setState({ validation_msg: "File Deletion Unsuccessfull Please try again", color: 'pink' });
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        if (this.state.loading) {
            return (<Loader />)
        } else {
            if (this.state.imageview) {
                return (
                    <Aux>
                        <Row>
                            <Col>
                                <Card className='Recent-Users'>
                                    <Card.Header>
                                        <a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.setState({ imageview: false }) }}>close </a>
                                    </Card.Header>
                                    <Card.Body>
                                        <Picture src={this.state.imagesarray[0].original}
                                            media="(max-width: 500px)"
                                            sizes="(min-width: 36em) 33.3vw, 90vw" >

                                        </Picture>
                                        {/* <ImageGallery items={this.state.imagesarray} style={{ height: '100%', weight: '100%' }} />
                                    <div style={{display:flexb}}>
                                        <img src={this.state.imagesarray[0].original} alt="No Imgae found" style={{ height: '50%', weight: '50%' }} />
                                    </div>*/}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Aux>
                )
            }
            switch (this.state.choice) {
                case 'showquestion':
                    return (
                        <Aux>
                            <Row>
                                <Col>
                                    <Card className='Recent-Users'>
                                        <Card.Header >
                                            <Card.Title as='h5'>Questions</Card.Title>
                                            <center><p> {String(this.state.validation_msg).length > 0 ? <p style={{ borderRadius: 5, padding: 10, backgroundColor: this.state.color, borderColor: "red", borderWidth: 10 }}>{this.state.validation_msg}</p> : null}
                                                {/*String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null*/}
                                            </p></center>
                                            <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={this.addquestion} >Add Question</a></div>

                                            <div style={{ float: "right", paddingRight: 5, flexDirection: 'row', paddingRight: 10, paddingBottom: 5 }}>

                                                <InputGroup  >
                                                    {/*this.state.searchbox ? <FormControl
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
                                                            */}
                                                    <FormControl
                                                        placeholder="Search...."
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                        name='search'
                                                        onChange={(e) => { this.setState({ searchdata: e.target.value }); setTimeout(() => { this.state.filter ? this.loaddata() : this.setState({ validation_msg: "Please Select Filter" }) }, 1500) }}
                                                    />
                                                    <Dropdown as={InputGroup.Append}>
                                                        <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic-2" />
                                                        {/*<Button variant="secondary" onClick={this.loaddata}>Search</Button>*/}
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item hred="#/action-2" onClick={() => { this.setState({ filter: 'title', searchbox: true, }); }}>Search by Name</Dropdown.Item>
                                                            <Dropdown.Item hred="#/action-3" onClick={() => { this.setState({ filter: 'level', searchbox: true, }); }}>Search by level</Dropdown.Item>
                                                            <Dropdown.Item hred="#/action-4" onClick={() => { this.setState({ filter: 'sublevel', searchbox: true, }); }}>Search by sublevel</Dropdown.Item>
                                                            <Dropdown.Item hred="#/action-5" onClick={() => { this.setState({ filter: 'pattern', searchbox: true, }); }}>Search by pattern</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown><br></br>


                                                </InputGroup>
                                                <p><b>Filter : </b> {this.state.filter ? <b>Search By {this.state.filter}</b> : null}</p>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            <Table responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>Question Title</th>
                                                        <th>pattern</th>
                                                        <th>Level</th>
                                                        <th>SubLevel </th>
                                                        <th>Options</th>
                                                        <th>Hint</th>
                                                        <th>Files</th>
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
                                                                    <h6 className="text-muted">{item.patterntitle}</h6>
                                                                </td>
                                                                <td>
                                                                    <h6 className="text-muted">{item.Level_Title}</h6>
                                                                </td>
                                                                <td>
                                                                    <h6 className="text-muted">{item.Sublevel_Title}</h6>
                                                                </td>
                                                                <td>
                                                                    <a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.loadoptions(item) }}>view Options</a>
                                                                </td>
                                                                <td>
                                                                    <a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.loadHints(item) }}>view Hint</a>
                                                                </td>
                                                                <td>
                                                                    <a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.getfileids(item.Question_Id) }}>view Files</a><br></br><br></br>
                                                                    {this.state.showfiles && this.state.questionid == item.Question_Id ?
                                                                        this.state.questionfiles.length > 0 ?
                                                                            <p>{this.state.questionfiles.map(item =>
                                                                                <a href={'http://115.124.127.245:3002/Mission_Onboarding/get_file?fname=' + item.File_Id} className="label theme-bg2 text-white f-12" target="_blank">View Image <a href={DEMO.BLANK_LINK} onClick={() => { this.DeleteQuestionFiles("delete", item, item.File_Id) }}>
                                                                                    <i className="feather icon-x color white" style={{ color: 'lightgreen' }} />
                                                                                </a></a>
                                                                            )}<a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ addfile: 'question', showfiles: false }) }}>Add Image</a></p> : <p>No File <a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ addfile: 'question' }) }}>Add Image</a></p> : null}

                                                                    {this.state.questionid == item.Question_Id && this.state.addfile == 'question' ?
                                                                        <Form>
                                                                            <Form.Group controlId="addhintimage">
                                                                                <Form.Label>Add Question Images</Form.Label>
                                                                                <Form.Control type="file" name="file" accept="image/*" onChange={(e) => { this.setState({ file: e.target.files }) }} />
                                                                                <Form.Text className="text-muted">
                                                                                    Upload Question File.
                                                                        </Form.Text>
                                                                                <a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.AddQuestionFiles(item) }}>Submit</a>
                                                                            </Form.Group>
                                                                        </Form> : null}
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
                                            <center><p> {String(this.state.validation_msg).length > 0 ? <p style={{ borderRadius: 5, padding: 10, backgroundColor: this.state.color, borderColor: "red", borderWidth: 10 }}>{this.state.validation_msg}</p> : null}
                                                {/*String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null*/}
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
                                                                <td>{item.File_Id ? item.File_Id == '' || item.File_Id == "null" ? "No file " : <a href={'http://115.124.127.245:3002/Mission_Onboarding/get_file?fname=' + item.File_Id} className="label theme-bg2 text-white f-12" target="_blank">View Image<a href={DEMO.BLANK_LINK} onClick={() => { this.deleteoptionfile(item, item.File_Id) }}>
                                                                    <i className="feather icon-x color white" style={{ color: 'lightgreen' }} />
                                                                </a></a> : "No file "}</td>
                                                                <td>{item.modified_time}</td>
                                                                <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.setState({ optionid: item.Option_Id, optiontitle: item.Title, fileid: item.File_Id, newfileid: '', choice: "editoption" }) }}>Edit</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.deleteoptions(item.Option_Id) }}>Delete</a></td>
                                                                <td>{item.Option_Id == this.state.answerid ? <p style={{ backgroundColor: 'lightblue', borderRadius: 5 }}><b>{'Answer'}</b></p> : <a href={DEMO.BLANK_LINK} className="label text-lightgreen f-12" onClick={() => { this.updateAnswer(item.Option_Id) }}><b>Mark as Answer</b></a>}</td>
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
                                            <center><p> {String(this.state.validation_msg).length > 0 && this.state.alertcolor === "lightgreen" ? <p style={{ borderRadius: 5, padding: 10, backgroundColor: this.state.color, borderColor: "red", borderWidth: 10 }}>{this.state.validation_msg}</p> : null}
                                                {/*String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null*/}
                                            </p></center>
                                            <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                            {this.state.hint.length > 0 ? null : <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "addhint" }) }} >Add Hint</a></div>}
                                        </Card.Header>
                                        <Card.Body>
                                            <Table responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>Hint Title</th>
                                                        <th>Files  </th>
                                                        <th>Modified_Time</th>
                                                        <th>Edit/Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.hint.length > 0 ?
                                                        this.state.hint.map(item =>
                                                            <tr>
                                                                <td>{item.Title}</td>
                                                                <td>{item.File_Ids ? item.File_Ids == '' || item.File_Ids == "null" ? "No file " :
                                                                    String(item.File_Ids).split(',').map(fileid =>
                                                                        <a href={'http://115.124.127.245:3002/Mission_Onboarding/get_file?fname=' + fileid} className="label theme-bg2 text-white f-12" target="_blank">View Image <a href={DEMO.BLANK_LINK} onClick={() => { this.deletehintfile(item, fileid) }}>
                                                                            <i className="feather icon-x color white" style={{ color: 'lightgreen' }} />
                                                                        </a></a>
                                                                    )
                                                                    : "No file "}<a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ addfile: 'hint' }) }}>Add Image</a>
                                                                    <br></br>
                                                                    {this.state.addfile == 'hint' ?
                                                                        <Form>
                                                                            <Form.Group controlId="addhintimage">
                                                                                <Form.Label>Add Hint Images</Form.Label>
                                                                                <Form.Control type="file" name="file" accept="image/*" onChange={(e) => { console.log("e.target = ", (e.target.files)); this.setState({ newfileid: e.target.files[0] }) }} />
                                                                                <Form.Text className="text-muted">
                                                                                    Upload hint File.
                                                                        </Form.Text>
                                                                                <a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.addhintfile(item) }}>Submit</a>
                                                                            </Form.Group>
                                                                        </Form> : null}</td>
                                                                <td>{item.modified_time}</td>
                                                                <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12" onClick={() => { this.setState({ hintid: item.Id, hinttitle: item.Title, newfileid: '', fileid: item.File_Ids, choice: "edithint" }) }}>Edit</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.deletehint(item.Id) }}>Delete</a></td>
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
                                            <center><p> {String(this.state.validation_msg).length > 0 ? <p style={{ borderRadius: 5, padding: 10, backgroundColor: this.state.color, borderColor: "red", borderWidth: 10 }}>{this.state.validation_msg}</p> : null}
                                                {/*String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null*/}
                                            </p></center>
                                            <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                        </Card.Header>
                                        <Card.Body>
                                            <h5>Enter New Question Details</h5>
                                            <hr />
                                            <Row>
                                                <Col md={6}>
                                                    <Form>
                                                        <Form.Group controlId="Quest desc">
                                                            <Form.Label>Question Description</Form.Label>
                                                            <Form.Control as="textarea" rows="3" value={this.state.questiontitle} onChange={(e) => { this.setState({ questiontitle: e.target.value }) }} />
                                                            <Form.Text className="text-muted">
                                                                Enter Question data.
                                                        </Form.Text>
                                                        </Form.Group>
                                                        {this.state.patternid == 3 ?
                                                            <Form.Group controlId="Questimage">
                                                                <Form.Label>Question Images</Form.Label>
                                                                <Form.Control type="file" name="file" multiple accept="image/*" onChange={(e) => { this.setState({ file: e.target.files }) }} />
                                                                <Form.Text className="text-muted">
                                                                    Upload Files for this question.
                                                        </Form.Text>
                                                            </Form.Group>
                                                            : null}

                                                    </Form>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="selectlevel">
                                                        <Form.Label>Select Level</Form.Label>
                                                        <Form.Control as="select" onChange={(e) => { this.setState({ levelid: e.target.value }) }}>
                                                            <option value={''}>{''}</option>
                                                            {this.state.level.length > 0 ?
                                                                this.state.level.map(item => <option value={item.Level_Id}>{item.Level_Title}</option>) : null
                                                                //this.state.level.map(item => item.Level_Id == this.state.levelid ? null : <option value={item.Level_Id}>{item.Level_Title}</option>) : null
                                                            }

                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId="selectsublevel">
                                                        <Form.Label>Select Sub-Level</Form.Label>
                                                        <Form.Control as="select" onChange={(e) => { this.setState({ sublevelid: e.target.value }) }}>
                                                            <option value={''}>{''}</option>
                                                            {this.state.sublevel.length > 0 ?
                                                                this.state.sublevel.map(item => <option value={item.Id}>{item.title}</option>) : null
                                                                // this.state.sublevel.map(item => item.Id == this.state.sublevelid ? null : <option value={item.Id}>{item.title}</option>) : null
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId="selectpattern">
                                                        <Form.Label>Select pattern</Form.Label>
                                                        <Form.Control as="select" onChange={(e) => { this.setState({ patternid: e.target.value }) }}>
                                                            <option value={''}>{''}</option>
                                                            {this.state.pattern.length > 0 ?
                                                                this.state.pattern.map(item => <option value={item.pattern_Id}>{item.Title}</option>) : null
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
                                            <center><p> {String(this.state.validation_msg).length > 0 ? <p style={{ borderRadius: 5, padding: 10, backgroundColor: this.state.color, borderColor: "red", borderWidth: 10 }}>{this.state.validation_msg}</p> : null}
                                                {/*String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null*/}
                                            </p></center>
                                            <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                        </Card.Header>
                                        <Card.Body>
                                            <h5>Enter Option Details</h5>
                                            <hr />
                                            <Row>
                                                <Col md={6}>
                                                    <Form>
                                                        <Form.Group controlId="optiondesc">
                                                            <Form.Label>Option Description</Form.Label>
                                                            <Form.Control as="textarea" rows="3" value={this.state.optiontitle} onChange={(e) => { this.setState({ optiontitle: e.target.value }) }} />
                                                            <Form.Text className="text-muted">
                                                                Enter Option Title.
                                                        </Form.Text>
                                                        </Form.Group>
                                                        {this.state.option_fileupload_pattern.includes(this.state.patternid) ?
                                                            <Form.Group controlId="optionimages">
                                                                <Form.Label>Option Images</Form.Label>
                                                                <Form.Control type="file" name="file" multiple accept="image/*" onChange={(e) => { this.setState({ newfileid: e.target.files[0] }) }} />
                                                                <Form.Text className="text-muted">
                                                                    Upload Files for this Option.
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
                                            <center><p> {String(this.state.validation_msg).length > 0 ? <p style={{ borderRadius: 5, padding: 10, backgroundColor: this.state.color, borderColor: "red", borderWidth: 10 }}>{this.state.validation_msg}</p> : null}
                                                {/*String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null*/}
                                            </p></center>
                                            <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                        </Card.Header>
                                        <Card.Body>
                                            <h5>Enter Hint Details</h5>
                                            <hr />
                                            <Row>
                                                <Col md={6}>
                                                    <Form>
                                                        <Form.Group controlId="hintdesc">
                                                            <Form.Label>Hint Description</Form.Label>
                                                            <Form.Control as="textarea" rows="3" value={this.state.hinttitle} onChange={(e) => { this.setState({ hinttitle: e.target.value }) }} />
                                                            <Form.Text className="text-muted">
                                                                Enter Hint Title.
                                                        </Form.Text>
                                                        </Form.Group>
                                                        {this.state.hint_fileupload_pattern.includes(this.state.patternid) ?
                                                            <Form.Group controlId="hint image">
                                                                <Form.Label>Hint Images</Form.Label>
                                                                <Form.Control type="file" name="file" accept="image/*" onChange={(e) => { this.setState({ newfileid: e.target.files[0] }) }} />
                                                                <Form.Text className="text-muted">
                                                                    Upload Files for this Hint.
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
                                            <center><p> {String(this.state.validation_msg).length > 0 ? <p style={{ borderRadius: 5, padding: 10, backgroundColor: this.state.color, borderColor: "red", borderWidth: 10 }}>{this.state.validation_msg}</p> : null}
                                                {/*String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null*/}
                                            </p></center>
                                            <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                        </Card.Header>
                                        <Card.Body>
                                            <h5>Enter New Question Details</h5>
                                            <hr />
                                            <Row>
                                                <Col md={6}>
                                                    <Form>
                                                        <Form.Group controlId="questiondesc">
                                                            <Form.Label>Question Description</Form.Label>
                                                            <Form.Control as="textarea" rows="3" value={this.state.questiontitle} onChange={(e) => { this.setState({ questiontitle: e.target.value }) }} />
                                                            <Form.Text className="text-muted">
                                                                Enter Question data.
                                                        </Form.Text>
                                                        </Form.Group>
                                                        {/*this.state.question_fileupload_pattern.includes(this.state.patternid) ?
                                                            <Form.Group controlId="questionimage">
                                                                <Form.Label>Question Images</Form.Label>
                                                                <Form.Control type="file" name="file" multiple accept="image/*" onChange={(e) => { this.setState({ file: e.target.files }) }} />
                                                                <Form.Text className="text-muted">
                                                                    Upload Files for this question.
                                                        </Form.Text>
                                                        </Form.Group> : null*/}

                                                    </Form>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="question level">
                                                        <Form.Label>Select Level</Form.Label>
                                                        <Form.Control as="select" onChange={(e) => { this.setState({ levelid: e.target.value }) }}>
                                                            <option value={this.state.levelid} selected>{this.state.leveltitle}</option>
                                                            {this.state.level.length > 0 ?
                                                                this.state.level.map(item => <option value={item.Level_Id}>{item.Level_Title}</option>) : null
                                                                //this.state.level.map(item => item.Level_Id == this.state.levelid ? null : <option value={item.Level_Id}>{item.Level_Title}</option>) : null
                                                            }

                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId="Question sublevel">
                                                        <Form.Label>Select Sub-Level</Form.Label>
                                                        <Form.Control as="select" onChange={(e) => { this.setState({ sublevelid: e.target.value }) }}>
                                                            <option value={this.state.sublevelid} selected>{this.state.subleveltitle}</option>
                                                            {this.state.sublevel.length > 0 ?
                                                                this.state.sublevel.map(item => <option value={item.Id}>{item.title}</option>) : null
                                                                // this.state.sublevel.map(item => item.Id == this.state.sublevelid ? null : <option value={item.Id}>{item.title}</option>) : null
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>
                                                    {/* <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Select pattern</Form.Label>
                                                    <Form.Control as="select" onChange={(e) => { this.setState({ patternid: e.target.value }) }}>
                                                        <option value={this.state.patternid} selected>{this.state.patterntitle}</option>
                                                        {this.state.pattern.length > 0 ?
                                                            this.state.pattern.map(item => <option value={item.pattern_Id}>{item.Title}</option>) : null
                                                            //this.state.pattern.map(item => item.pattern_Id == this.state.patternid ? null : <option value={item.pattern_Id}>{item.Title}</option>) : null
                                                        }
                                                    </Form.Control>
                                                    </Form.Group>*/}
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
                                            <center><p> {String(this.state.validation_msg).length > 0 ? <p style={{ borderRadius: 5, padding: 10, backgroundColor: this.state.color, borderColor: "red", borderWidth: 10 }}>{this.state.validation_msg}</p> : null}
                                                {/*String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null*/}
                                            </p></center>
                                            <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                        </Card.Header>
                                        <Card.Body>
                                            <h5>Enter Option Details</h5>
                                            <hr />
                                            <Row>
                                                <Col md={6}>
                                                    <Form>
                                                        <Form.Group controlId="optiondesc">
                                                            <Form.Label>Option Description</Form.Label>
                                                            <Form.Control as="textarea" rows="3" value={this.state.optiontitle} onChange={(e) => { this.setState({ optiontitle: e.target.value }) }} />
                                                            <Form.Text className="text-muted">
                                                                Enter Option Title.
                                                        </Form.Text>
                                                        </Form.Group>
                                                        {this.state.option_fileupload_pattern.includes(this.state.patternid) ?
                                                            <Form.Group controlId="option image">
                                                                <Form.Label>Option Images</Form.Label>
                                                                <Form.Control type="file" name="file" accept="image/*" onChange={(e) => { this.setState({ newfileid: e.target.files[0] }) }} />
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
                                            <center><p> {String(this.state.validation_msg).length > 0 ? <p style={{ borderRadius: 5, padding: 10, backgroundColor: this.state.color, borderColor: "red", borderWidth: 10 }}>{this.state.validation_msg}</p> : null}
                                                {/*String(this.state.validation_msg).length > 0 ? <h5 style={{ color: this.state.color }}>{this.state.validation_msg}</h5> : null*/}
                                            </p></center>
                                            <div style={{ borderRadius: 25, float: "right" }}><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" onClick={() => { this.setState({ choice: "showquestion" }) }} >List Questions</a></div>
                                        </Card.Header>
                                        <Card.Body>
                                            <h5>Enter Hint Details</h5>
                                            <hr />
                                            <Row>
                                                <Col md={6}>
                                                    <Form>
                                                        <Form.Group controlId="edithintdesc">
                                                            <Form.Label>Hint Description</Form.Label>
                                                            <Form.Control as="textarea" rows="3" value={this.state.hinttitle} onChange={(e) => { this.setState({ hinttitle: e.target.value }) }} />
                                                            <Form.Text className="text-muted">
                                                                Enter Hint Title.
                                                        </Form.Text>
                                                        </Form.Group>
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
}

export default Questions;