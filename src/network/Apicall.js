
import { Getdata, PostdataToken, GetdataToken, Postfile, Postdata, Postdatanew } from './WebServices';

export let Constants = {
  user_profile: {
    login_status: false,
    token: '',
    active: false,
    userid: '',
    email: '',
    username: '',
  },
  currentscreen: '',
  long: 0,
  lat: 0
};

let baseurl = 'http://115.124.127.245:3001/Mission_Onboarding/';
export const Urls = {
  Login: baseurl + 'login', //User Login
  Logout: baseurl + 'logout', // logout
  Master: baseurl + 'Master', //Get Otp
  Employee: baseurl + 'Employee',
  Level: baseurl + 'Level',
  SubLevel: baseurl + 'Sublevel',
  Question: baseurl + 'Questions',
  Option: baseurl + 'Options',
  hint: baseurl + 'Hint',
  Pattern: baseurl + 'Pattern',
  Uploadfile: baseurl + 'uploadfile',
  DownloadFile: baseurl + 'get_file',
  UploadFiles: baseurl + 'upload_files',
  Downloadzip: baseurl + 'get_files'
};

export async function Login(params) {
  try {
    let data = JSON.stringify(params);
    console.log("url = " + Urls.UploadFiles);
    console.log("Params  = " + data);
    let result = await Postdatanew(Urls.Login, data);
    console.log("Response = ", (result));
    if (result.status) {
      Constants.user_profile.login_status = true;
      Constants.user_profile.userid = result.data.Id;
      Constants.user_profile.username = result.data.name;
    }
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}

export async function fileupload(params) {
  try {
    //let data = JSON.stringify(params);

    console.log("url = " + Urls.UploadFiles);
    console.log("Params  = ", (params));
    let result = await Postfile(Urls.UploadFiles, params);
    console.log("Response = ", (result));
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}

export async function Logout() {
  try {
    console.log("url = " + Urls.Login);
    let result = await Postdata(Urls.Logout, '');
    console.log("Response = ", (result));
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}

export async function fetch(params, option) {
  try {
    let data = JSON.stringify(params);
    let url = '';
    switch (option) {
      case 'master': url = Urls.Master;
        break;
      case 'employee': url = Urls.Employee;
        break;
      case 'level': url = Urls.Level;
        break;
      case 'sublevel': url = Urls.SubLevel;
        break;
      case 'question': url = Urls.Question;
        break;
      case 'option': url = Urls.Option;
        break;
      case 'pattern': url = Urls.Pattern;
        break;
      case 'hint': url = Urls.hint;
        break;
      default: return { status: false, message: 'option cannot be Identified' }
    }
    console.log("url = " + url);
    console.log("Params  = " + data);
    let result = await Postdatanew(url, data);
    console.log("Response = ", (result));
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}

export async function deletedata(params, option) {
  try {
    let data = JSON.stringify(params);
    let url = '';
    switch (option) {
      case 'master': url = Urls.Master;
        break;
      case 'employee': url = Urls.Employee;
        break;
      case 'level': url = Urls.Level;
        break;
      case 'sublevel': url = Urls.SubLevel;
        break;
      case 'question': url = Urls.Question;
        break;
      case 'pattern': url = Urls.Pattern;
        break;
      case 'hint': url = Urls.hint;
        break;
      default: return { status: false, message: 'option cannot be Identified' }
    }
    console.log("url = " + url);
    console.log("Params  = " + data);
    let result = await Postdatanew(url, data);
    console.log("Response = ", (result));
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}

export async function adddata(params, option) {
  try {
    let data = JSON.stringify(params);
    let url = '';
    switch (option) {
      case 'master': url = Urls.Master;
        break;
      case 'employee': url = Urls.Employee;
        break;
      case 'level': url = Urls.Level;
        break;
      case 'sublevel': url = Urls.SubLevel;
        break;
      case 'question': url = Urls.Question;
        break;
      case 'option': url = Urls.Option;
        break;
      case 'pattern': url = Urls.Pattern;
        break;
      case 'hint': url = Urls.hint;
        break;
      default: return { status: false, message: 'option cannot be Identified' }
    }
    console.log("url = " + url);
    console.log("Params  = " + data);
    let result = await Postdatanew(url, data);
    console.log("Response = ", (result));
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}



export async function Signup(params) {
  try {
    let data = JSON.stringify(params);
    console.log("url = " + Urls.Signup);
    console.log("Params  = " + data);
    let result = await PostdataToken(Urls.Signup, data, Constants.user_profile.token);
    console.log("Response = ", (result));
    if (result.status) {
      return { status: true, data: result.Data, message: result.message };
    } else {
      return { status: false, message: result.message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}


export async function GetFile(option) {
  return new Promise((resolve, reject) => {
    switch (option) {
      case 'reg':
        let imgname = Constants.user_profile.registercertiname;
        console.log('Get file result  params= ' + Urls.getFile + imgname);
        Getdata(Urls.getFile + imgname).then(result => {
          if (result.Status) {
            Constants.user_profile.registercertidata = result.Data;
            resolve({ status: true, data: result.Data, message: result.Message })
          } else {
            resolve({ status: false, message: 'File Not Found' });
          }
        }).catch(error => {
          console.log(error);
        });
        break;
      case 'radio':
        let imgname1 = Constants.user_profile.radiologistcertiname;
        console.log('Get file result  params= ' + Urls.getFile + imgname1);
       /* let result1 =*/ Getdata(Urls.getFile + imgname1).then(result1 => {
          ;
          if (result1.Status) {
            console.log("result", (result1));
            Constants.user_profile.radiologistcertidata = result1.Data;
            resolve({ status: true, data: result1.Data, message: result1.Message });
          } else {
            resolve({ status: false, message: 'File Not Found' })
            //display message sent from
          }
        }).catch(error => {
          reject(error);
          console.log("error");
        })
        break;
      case 'sign':
        let imgname2 = Constants.user_profile.signname;
        console.log('Get file result  params= ' + Urls.getFile + imgname2);
       /* let result1 =*/ Getdata(Urls.getFile + imgname2).then(result1 => {
          ;
          if (result1.Status) {
            console.log("result", (result1));
            Constants.user_profile.signaturedata = result1.Data;
            resolve({ status: true, data: result1.Data, message: result1.Message });
          } else {
            resolve({ status: false, message: 'File Not Found' })
          }
        }).catch(error => {
          reject(error);
          console.log("error");
        })
        break;
    }
  })
}




export async function emailValidation(email) {
  try {
    // eslint-disable-next-line no-control-regex
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    let valid = (expression.test(String(email).toLowerCase())) ? true : false;
    if (valid) {
      console.log("valid" + valid);
      return true;
    } else {
      console.log("invalid = " + valid);
      return false;
    }
  } catch {
    console.log('Error at email validation');
  }
}
