//const xss = require("xss");
//const Validator = require('validatorjs');
//const errmsg = require('./ErrorMessage');
//const { Level } = require("./ErrorMessage");
import errmsg from './ErrorMessage';
import Validator from 'validatorjs';

const Employeelogin = {
    employeeid: 'required|alpha_num',
    password: 'required|string|min:8',
    type: 'required|alpha'
};
const Masterlogin = {
    userid: 'required|alpha_num',
    password: 'required|string|min:8',
    type: 'required|alpha'
};
const Employee = {
    employeeid: 'required|alpha_num|min:10',
    employeename: 'required|string|min:3|max:50',
    email: 'required|email',
    avathar_id: 'string',
    employeedesignation: 'required|string',
    password: 'required|string|min:8',
    action: 'required|alpha'
};
const Employeefetch = {
    employeeid: 'alpha_num',
    employeename: 'string|max:50',
    email: 'email',
    employeedesignation: 'string',
};
const Employee_id = {
    employeeid: 'required|alpha_num',
}
const Master_id = {
    userid: 'required|alpha_num',
}
const Master = {
    userid: 'required|alpha_num|min:10',
    username: 'required|string|min:3|max:50',
    email: 'required|email',
    avathar_id: 'string',
    password: 'required|string|min:8',
};
const Masterupdate = {
    userid: 'required|alpha_num|min:10',
    username: 'required|string|min:3|max:50',
    email: 'required|email',
    avathar_id: 'string',
    password: 'string|min:8',
};
const Masterfetch = {
    userid: 'alpha_num',
    username: 'string|max:50',
    useremail: 'email',
    password: 'string|min:8',
    filter: 'alpha'
};
const updatepassword = {
    password: 'required|string|min:8',
}
const level = {
    leveltitle: 'required|alpha',
    levelsummary: 'required|string',
};
const levelfetch = {
    levelid: 'alpha_num',
    leveltitle: 'string',
    filter: 'alpha'
};
const sublevel = {
    levelid: 'required|alpha_num',
    subleveltitle: 'required|string',
    subleveldescription: 'required|string',
};
const sublevelfetch = {
    action: 'required|alpha',
    sublevelid: 'alpha_num',
    subleveltitle: 'string',
    filter: 'alpha'
};
const question = {
    levelid: 'required|alpha_num',
    sublevelid: 'required|alpha_num',
    patternid: 'required|alpha_num',
    hintid: 'required|alpha_num',
    questiontitle: 'required|string',
};
const questionfetch = {
    questionid: 'alpha_num',
    questiontitle: 'alpha_dash',
    filter: 'alpha'
};
const questionfetchby_id = {
    questionid: 'required|alpha_num',
}
const options = {
    questionid: 'required|alpha_num',
    patternid: 'required|alpha_num',
    hintid: 'required|alpha_num',
    optiontitle: 'required|string',
};
const optionfetch = {
    optionid: 'alpha_num',
    optiontitle: 'string',
    filter: 'alpha'
};
const hint = {
    fileid: 'required|alpha_num',
    questionid: 'required|alpha_num',
    patternid: 'required|alpha_num',
    hinttitle: 'required|string',
};
const hintfetch = {
    hintid: 'alpha_num',
    hinttitle: 'string',
    filter: 'alpha'
};
const pattern = {
    patterntitle: 'required|string',
};
const patternfetch = {
    patternid: 'alpha_num',
    patterntitle: 'string',
    filter: 'alpha'
};
const levelmapping = {
    levelid: 'required|alpha_num',
    sublevelid: 'required|alpha_num',
    questionid: 'required|alpha_num'
};
const filemapping = {
    type: 'required|alpha',
    questionid: 'required|alpha_num',
};
const filemapping_emp = {
    type: 'required|alpha',
    employeeid: 'required|alpha_num',
};

const submitscores = {
    employeeid: 'required|alpha_num',
    questionid: 'required|string|max:50',
    levelid: 'required|alpha_num',
    sublevelid: 'required|alpha_num',
    score: 'required|alpha_num',
};

const getscores = {
    filter: 'required|string',
    employeeid: 'alpha_num',
    questionid: 'alpha_num',
    levelid: 'alpha_num',
    sublevelid: 'alpha_num',
    score: 'alpha_num',
};

export const validatedata = async (body, option) => {
    return new Promise((resolve, reject) => {
        try {
            let validation;
            console.log("body : ", (body));
            switch (option) {
                case 'login':
                    validation = body.type === "master" ? new Validator(body, Masterlogin, errmsg.Masterlogin) : new Validator(body, Employeelogin, errmsg.Employeelogin);
                    resolve(validation.fails() ? { status: false, message: 'Login Unsuccessfull', validation: validation.errors.errors } : { status: true })
                    break;
                case 'master':
                    switch (body.action) {
                        case 'fetchdata':
                            validation = new Validator(body, Masterfetch, errmsg.Master);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'adddata':
                            validation = new Validator(body, Master, errmsg.Master);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'deletedata':
                            validation = new Validator(body, Master_id, errmsg.Master);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'searchdata':
                            validation = new Validator(body, Masterfetch, errmsg.Master);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'updatedata':
                            validation = new Validator(body, Masterupdate, errmsg.Master);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'updatepassword':
                            validation = new Validator(body, updatepassword, errmsg.Master);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        default: resolve({ status: false, message: 'action cannot be identified please pass valid action' })
                            break;
                    }
                    break;
                case 'employee':
                    switch (body.action) {
                        case 'fetchdata':
                            validation = new Validator(body, Employeefetch, errmsg.Employee);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true })
                            break;
                        case 'adddata':
                            validation = new Validator(body, Employee, errmsg.Employee);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true })
                            break;
                        case 'deletedata':
                            validation = new Validator(body, Employeefetch, errmsg.Employee);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true })
                            break;
                        case 'search':
                            validation = new Validator(body, Employeefetch, errmsg.Employee);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true })
                            break;
                        case 'updatedata':
                            validation = new Validator(body, Employee, errmsg.Employee);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true })
                            break;
                        case 'updatepassword':
                            validation = new Validator(body, updatepassword, errmsg.Employee);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true })
                            break;
                        case 'getprofile':
                            validation = new Validator(body, Employee_id, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true })
                            break;
                        case 'getquestion':
                            validation = new Validator(body, questionfetchby_id, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true })
                            break;
                        case 'submitscore':
                            validation = new Validator(body, submitscores, errmsg.submitscores);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true })
                            break;
                        case 'getscores':
                            validation = new Validator(body, getscores, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true })
                            break;
                        default: resolve({ status: false, message: 'action cannot be identified please pass valid action' });
                            break;
                    }
                    break;
                case 'level':
                    switch (body.action) {
                        case 'fetchdata':
                            validation = new Validator(body, levelfetch, errmsg.Level);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'adddata':
                            validation = new Validator(body, level, errmsg.level);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'deletedata':
                            validation = new Validator(body, levelfetch, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'updatedata':
                            validation = new Validator(body, levelfetch, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        default: resolve({ status: false, message: 'action cannot be identified please pass valid action' })
                            break;
                    }
                    break;
                case 'sublevel':
                    switch (body.action) {
                        case 'fetchdata':
                            validation = new Validator(body, sublevelfetch, errmsg.sublevel);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'adddata':
                            validation = new Validator(body, sublevel, errmsg.sublevel);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'deletedata':
                            validation = new Validator(body, sublevelfetch, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'updatedata':
                            validation = new Validator(body, sublevelfetch, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        default: resolve({ status: false, message: 'action cannot be identified please pass valid action' })
                            break;
                    }
                    break;
                case 'question':
                    switch (body.action) {
                        case 'fetchdata':
                            validation = new Validator(body, questionfetch, errmsg.question);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'searchdata':
                            validation = new Validator(body, questionfetch, errmsg.question);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'adddata':
                            validation = new Validator(body, question, errmsg.question);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'deletedata':
                            validation = new Validator(body, question, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'updatedata':
                            validation = new Validator(body, question, errmsg.question);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        default: resolve({ status: false, message: 'action cannot be identified please pass valid action' })
                            break;
                    }
                    break;
                case 'option':
                    switch (body.action) {
                        case 'fetchdata':
                            validation = new Validator(body, optionfetch, errmsg.option);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'searchdata':
                            validation = new Validator(body, optionfetch, errmsg.option);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'adddata':
                            validation = new Validator(body, options, errmsg.option);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'deletedata':
                            validation = new Validator(body, levelfetch, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'updatedata':
                            validation = new Validator(body, levelfetch, errmsg.option);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        default: resolve({ status: false, message: 'action cannot be identified please pass valid action' })
                            break;
                    }
                    break;
                case 'answer':
                    switch (body.action) {
                        case 'fetchdata':
                            validation = new Validator(body, levelfetch, errmsg.Level);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'adddata':
                            validation = new Validator(body, level, errmsg.level);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'deletedata':
                            validation = new Validator(body, levelfetch, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'updatedata':
                            validation = new Validator(body, levelfetch, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        default: resolve({ status: false, message: 'action cannot be identified please pass valid action' })
                            break;
                    }
                    break;
                case 'hint':
                    switch (body.action) {
                        case 'fetchdata':
                            validation = new Validator(body, hintfetch, errmsg.hint);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'searchdata':
                            validation = new Validator(body, hintfetch, errmsg.hint);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'adddata':
                            validation = new Validator(body, hint, errmsg.hint);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'deletedata':
                            validation = new Validator(body, hintfetch, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'updatedata':
                            validation = new Validator(body, hintfetch, errmsg.hint);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        default: resolve({ status: false, message: 'action cannot be identified please pass valid action' })
                            break;
                    }
                    break;
                case 'pattern':
                    switch (body.action) {
                        case 'fetchdata':
                            validation = new Validator(body, patternfetch, errmsg.pattern);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'searchdata':
                            validation = new Validator(body, patternfetch, errmsg.pattern);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'adddata':
                            validation = new Validator(body, pattern, errmsg.pattern);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'deletedata':
                            validation = new Validator(body, patternfetch, errmsg.ids);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        case 'updatedata':
                            validation = new Validator(body, patternfetch, errmsg.pattern);
                            resolve(validation.fails() ? { status: false, message: 'Validation Error', validation: validation.errors.errors } : { status: true });
                            break;
                        default: resolve({ status: false, message: 'action cannot be identified please pass valid action' })
                            break;
                    }
                    break;
                default: resolve({ status: false, message: "option cannot be identified" });
            }
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}


//module.exports = { validatedata }




