const Employeelogin = {
    "required.employeeid": 'Employee Id Required',
    "required.password": 'Password Required',
};
const Masterlogin = {
    "required.employeeid": 'User Id Required',
    "required.password": 'Password Required',
};
const Employee = {
    "required.employeeid": 'Employee Id Required',
    "required.employeename": 'Employee Name Required',
    "required.employeeemail": 'Employee Email Required',
    "required.employeedesignation": 'Employee Designation Required',
    "required.password": 'Password Required',
    "required.action": 'Employee Action Required'
};
const Master = {
    "required.userid": 'User Id Required',
    "required.username": 'User Name Required',
    "required.email": 'User Email Required',
    "required.password": 'Password Required',
    "required.action": 'User Action Required'
};
const Level = {
    "required.leveltitle": 'Level Title Required',
    "required.levelsummary": 'Level summary Required',
};
const sublevel = {
    "required.levelid": 'Level Id Required',
    "required.subleveltitle": 'sublevel title Required',
    "required.leveldescription": 'Sublevel Description Required'
};
const question = {
    "required.sublevelid": 'sublevel Id Required',
    "required.levelid": 'Level Id Required',
    "required.questiontitle": 'Question title Required',
    "required.patternid": 'Pattern Id Required'
};
const option = {
    "required.questionid": 'sublevel Id Required',
    "required.optiontitle": 'Question title Required',
    "required.patternid": 'Pattern Id Required'
};
const pattern = {
    "required.patterntitle": 'Pattern Title Required'
};
const hint = {
    "required.hinttitle": 'Hint Title Required',
    "required.patternid": 'Pattern Id Required',
    "required.questionid": 'Hint Title Required',
    "required.fileid": 'Pattern Id Required'
};
const levelmapping = {
    "required.action": 'Action Required',
    "required.employeeid": 'Employee Id Required',
    "required.levelid": 'Level Id Required',
    "required.sublevelid": 'sublevel Id Required',
    "required.question": 'question Id Required'
};
const filemapping = {
    "required.type": 'Type Required employee/question',
    "required.fname": 'File name Required',
    "required.questionid": 'QuestionId Required'
};
const filemapping_emp = {
    "required.type": 'Type Required employee/question',
    "required.fname": 'File name Required',
    "required.employeeid": 'Employee Id Required'
};
const submitscores = {
    "required.employeeid": 'Employee Id Required',
    "required.questionid": 'Question Id Required',
    "required.levelid": 'Level Id Required',
    "required.sublevelid": 'SubLevel Id Required',
    "required.score": 'Score Required'
};
const ids = {
    "required.questionid": 'Question Id Required',
    "required.employeeid": "Employee_Id Required",
    "required.userid": "User_Id Required",
    "required.levelid": "Level_Id Required",
    "required.sublevelid": "Sublevel_Id Required",
    "required.patternid": "Pattern_Id Required",
    "required.hintid": "Hint_Id Required",
    "required.optionid": "Option_Id Required",
};

exports.default = { ids, submitscores, Employeelogin, Masterlogin, Employee, Master, Level, sublevel, question, option, hint, pattern, levelmapping, filemapping, filemapping_emp }
