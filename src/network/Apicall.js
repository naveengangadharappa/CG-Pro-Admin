
import { PostdataToken, Postfile, Postdata, Postdatanew } from './WebServices';
import { securedBrowserCache } from 'secured-browser-storage';
import { check_security } from '../Validation/Validation';
//securedBrowserCache.config('new-secret-key', 'new-prefix-this-is-optional');
securedBrowserCache.config('cgpro_Supp0rt@123');


export let Constants = {
  pagelimit: 10,
  question_fileupload_pattern: [3, 4],
  option_fileupload_pattern: [1, 4],
  hint_fileupload_pattern: [1],
  user_profile: {
    login_status: false,
    token: '',
    active: false,
    userid: '',
    email: '',
    username: '',
  },
  employeeid: '',
  currentscreen: '',
  long: 0,
  lat: 0
};

let baseurl = 'http://115.124.127.245:3002/Mission_Onboarding/';
export const Urls = {
  Login: baseurl + 'login', //User Login
  Logout: baseurl + 'logout', // logout
  Get_Login_status: baseurl + 'getlogin_status',
  Master: baseurl + 'Master', //Get Otp
  Employee: baseurl + 'Employee',
  Level: baseurl + 'Level',
  SubLevel: baseurl + 'Sublevel',
  Question: baseurl + 'Questions',
  Option: baseurl + 'Options',
  Answer: baseurl + 'Answer',
  hint: baseurl + 'Hint',
  Pattern: baseurl + 'Pattern',
  GetfileIds: baseurl + 'Get_FileIds',
  Uploadfile: baseurl + 'uploadfile',
  DownloadFile: baseurl + 'get_file',
  UploadFiles: baseurl + 'upload_files',
  UploadFile: baseurl + 'upload_file',
  Downloadzip: baseurl + 'get_files',
  delete_file: baseurl + 'Delete_File'
};

export async function Login(params) {
  try {
    let data = JSON.stringify(params);
    // console.log("url = " + Urls.Login);
    // console.log("Params  = " + data);
    let result = await Postdatanew(Urls.Login, data);
    // console.log("Response = ", (result));
    if (result.status) {
      Constants.user_profile.login_status = true;
      Constants.user_profile.userid = result.data.Id;
      Constants.user_profile.username = result.data.name;
      Constants.user_profile.email = result.data.email;
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

    // console.log("url = " + Urls.UploadFiles);
    // console.log("Params  = ", (params));
    let result = await Postfile(Urls.UploadFiles, params);
    // console.log("Response = ", (result));
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}

export async function singlefileupload(params) {
  try {
    //let data = JSON.stringify(params);

    // console.log("url = " + Urls.UploadFile);
    // console.log("Params  = ", (params));
    let result = await Postfile(Urls.UploadFile, params);
    // console.log("Response = ", (result));
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}


export async function Logout(params) {
  try {
    // console.log("url = " + Urls.Logout);
    // console.log("Params = ", params);
    let result = await Postdata(Urls.Logout, params);
    // console.log("Response = ", (result));
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}

export async function Get_Login_status(params) {
  try {
    // console.log("url = " + Urls.Get_Login_status);
    // console.log("Params = ", params);
    let result = await Postdata(Urls.Get_Login_status, params);
    // console.log("Response = ", (result));
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}



export async function fetch(params, option) {
  try {
    console.log("params  without json.stringfiy  = ", params)
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
      case 'answer': url = Urls.Answer;
        break;
      case 'pattern': url = Urls.Pattern;
        break;
      case 'hint': url = Urls.hint;
        break;
      case 'fileid': url = Urls.GetfileIds;
        break;
      default: return { status: false, message: 'option cannot be Identified' }
    }
    // console.log("url = " + url);
    // console.log("Params  = " + data);
    let result = await Postdatanew(url, data);
    // console.log("Response = ", (result));
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
      case 'hintfile': url = Urls.delete_file;
        break;
      case 'questionfile': url = Urls.delete_file;
        break;
      default: return { status: false, message: 'option cannot be Identified' }
    }
    // console.log("url = " + url);
    // console.log("Params  = " + data);
    let result = await Postdatanew(url, data);
    // console.log("Response = ", (result));
    return result;
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}

export async function adddata(params, option) {
  try {
    let security_result = await check_security(params);
    if (security_result.status) {
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
        case 'answer': url = Urls.Answer;
          break;
        case 'pattern': url = Urls.Pattern;
          break;
        case 'hint': url = Urls.hint;
          break;
        default: return { status: false, message: 'option cannot be Identified' }
      }
      // console.log("url = " + url);
      // console.log("Params  = " + data);
      let result = await Postdatanew(url, data);
      // console.log("Response = ", (result));
      return result;
    } else {
      return security_result;
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}



export async function Signup(params) {
  try {
    let security_result = await check_security(params);
    if (security_result.status) {
      let data = JSON.stringify(params);
      // console.log("url = " + Urls.Signup);
      // console.log("Params  = " + data);
      let result = await PostdataToken(Urls.Signup, data, Constants.user_profile.token);
      //console.log("Response = ", (result));
      if (result.status) {
        return { status: true, data: result.Data, message: result.message };
      } else {
        return { status: false, message: result.message };
      }
    } else {
      return security_result;
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'Request cant be complete Try Again' };
  }
}


export async function Offlinestorage(params) {
  return new Promise((resolve, reject) => {
    let result = {
      status: false,
      data: '',
      message: ''
    };

    switch (params.choice) {
      case "adddata":
        securedBrowserCache.clear();
        securedBrowserCache.setItem(params.key, params.value)
        result.status = true;
        break;
      case "getdata":
        result.data = securedBrowserCache.getItem(params.key, params.value);
        result.status = true;
        break;
      case "deletedata": securedBrowserCache.removeItem(params.key);
        result.status = true;
        break;
      case "clear": securedBrowserCache.clear();
        result.status = true;
        break;
      default: result.status = false;
        result.message = "choice cannot be identified";
        break;
    }
    resolve(result);
  });
}



export async function emailValidation(email) {
  try {
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
