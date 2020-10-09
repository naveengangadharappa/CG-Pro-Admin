//import AsyncStorage from '@react-native-community/async-storage';
import { Getdata, PostdataToken, GetdataToken } from './WebServices';
/*import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
//import ImgToBase64 from 'react-native-image-base64';
import DeviceInfo from 'react-native-device-info';
//import PushNotification from 'react-native-push-notification';
import Geolocation from '@react-native-community/geolocation';*/

export let Constants = {
  internet: false,
  firebasetoken: '',
  xrayfile: '',
  heatmapfile: '',
  DeviceId: '',
  countryId: { id: 101, name: 'India' },
  stateId: { id: 0, name: 'State' },
  cityId: { id: 0, name: 'City' },
  Dataarray: [],
  ImagData: '',
  user_profile: {
    login_status: false,
    token: '',
    active: false,
    disabled: false,
    uid: 0,
    name: '',
    mname: '',
    lname: '',
    dob: '',
    country: '',
    state: '',
    city: '',
    cityid: '',
    stateid: '',
    countryid: '',
    address: '',
    zipcode: '',
    mobile_no: '',
    email: '',
    gender: '',
    clinicname: '',
    clinicregno: '',
    registercertiname: '',
    signname: '',
    radiologistcertiname: 'Other certificate',
    registercertidata: 'Registration certificate *',
    radiologistcertidata: '',
    signaturedata: ''
  },
  long: 0,
  lat: 0
};

//let baseurl = 'http://localhost:3001/Object_Storage/';
let baseurl = 'http://192.168.43.221:3001/Object_Storage/';
export const Urls = {
  Signup: baseurl + 'insertuser', //User Registration
  VerifiyOtp: baseurl + 'User/VerifyOTP', //Verifiy Otp
  GetUserOtp: baseurl + 'User/GetOTP?Mobile=', //Get Otp
  VerifiyNumber: baseurl + 'User/IsMobileNoExists?usertypeid=3&mobileno=',
  UpdateProfile: baseurl + 'Radiologist/UpdateProfile',//http://projects.teamgrowth.net/Covid19-MobileAPI/api/Radiologist/UpdateProfile
  saveToken: baseurl + 'User/AddToken',

  //getFile: 'https://api.aacovidtest.com/covid19-mobileapi/api/DefaultAPI/ViewFile?path=Radiologist&id=',
  //FileUpload: 'https://api.aacovidtest.com/covid19-mobileapi/api/DefaultAPI/UploadFileFromAPI',   //post method
};

/*function getToken(){
  return new Promise((resolve, reject) => {
    try {
      PushNotification.configure({
        onRegister: function (token) {
          console.log("Entered push notification on register");
          console.log('TOKEN:', token)
          Constants.firebasetoken = token.token;
          resolve({status:true,token:token})
        },
        senderID: '510014475546',
        popInitialNotification: true,
        requestPermissions: true
      })
    } catch (err) {
      console.log(err);
      resolve({status:false})
    }
  });
}*/

/*export async function SaveToken() {
  try {
    let res=await getToken()
    if(res.status){
      let data = JSON.stringify({
        userid: Constants.user_profile.uid,
        usertypeid: 3,
        token: Constants.firebasetoken
      });
      let result = await PostdataToken(Urls.saveToken, data,Constants.user_profile.token);
      if (result.Status) {
        return {
          status: true,
          message: 'Login Successful'
        };
      } else {
        return {
          status: false,
          message: result.Message
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Registration Unsuccessfull please try again"
    };
  }
}*/

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
/*
export async function SubmitReview(pid, riskid, Aid, remark) {
  try {
    let data = JSON.stringify({
      PatientId: pid,
      RiskLevelId: riskid,
      AnalysisId: Aid,
      CheckerReview: remark
    });
    console.log("url = " + Urls.submitreview);
    console.log("Params  = " + data);
    let result = await PostdataToken(Urls.submitreview, data, Constants.user_profile.token);
    console.log("Response = ", (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function PickRequest(pid) {
  try {
    let data = JSON.stringify({
      PatientId: pid,
      PickupBy: Constants.user_profile.uid
    });

    console.log("url = " + Urls.pickRequest);
    console.log("Params  = " + data);
    let result = await PostdataToken(Urls.pickRequest, data, Constants.user_profile.token);
    console.log("Response = ", (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}
export async function ResubmissionSubmit(pid, reason) {
  try {
    let data = JSON.stringify({
      PatientId: pid,
      XRayRejectedReason: reason
    });
    console.log("url = " + Urls.Resubmission);
    console.log("Params  = " + data);
    let result = await PostdataToken(Urls.Resubmission, data, Constants.user_profile.token);
    console.log("Response = ", (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}


export async function GetOptions() {
  try {
    console.log("url = " + Urls.GetOptions);
    let result = await Getdata(Urls.GetOptions);
    console.log("Response = ", (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function GetReport(pid) {
  try {
    console.log("url = " + Urls.getreport + pid);
    let result = await GetdataToken(Urls.getreport + pid, Constants.user_profile.token);
    //console.log("Response = ",(result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function GetRiskLevels() {
  try {
    console.log("url = " + Urls.getRiskLevel);
    let result = await GetdataToken(Urls.getRiskLevel, Constants.user_profile.token);
    console.log("Response = ", (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function GetPatientReport(pid) {
  try {
    console.log("url = " + Urls.Patientreport + pid);
    let result = await GetdataToken(Urls.Patientreport + pid, Constants.user_profile.token);
    console.log("Response = ", (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function GetPatientdetails(pid) {
  try {
    console.log("url = " + Urls.PatientDetail + pid);
    let result = await GetdataToken(Urls.PatientDetail + pid, Constants.user_profile.token);
    console.log("Response = ", (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function GetRequests() {
  try {
    console.log("url = " + Urls.getAssignedRequests + Constants.user_profile.uid);
    let result = await GetdataToken(Urls.getAssignedRequests + Constants.user_profile.uid, Constants.user_profile.token);
    console.log("Response = ", (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function GetPickedupList() {
  try {
    console.log("url = " + Urls.pickedupList + Constants.user_profile.uid);
    let result = await GetdataToken(Urls.pickedupList + Constants.user_profile.uid, Constants.user_profile.token);
    console.log("Response = ", (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function GetClosedList() {
  try {
    console.log("url = " + Urls.closedlist + Constants.user_profile.uid);
    let result = await GetdataToken(Urls.closedlist + Constants.user_profile.uid, Constants.user_profile.token);
    console.log("Response = ", (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function GetAnalysis() {
  try {
    console.log("url = " + Urls.GetAnalysis);
    let result = await GetdataToken(Urls.GetAnalysis, Constants.user_profile.token);
    console.log("Response = ", (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}
/*
export async function CheckConnectivity() {
  console.log('Checking internet');
  return new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        // console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (state.isConnected) {
          resolve({ status: true });
        } else {
          resolve({ status: false });
        }
      })
      .catch(error => {
        console.log({ status: false, message: error });
        reject(error);
      });
  });
}

export async function GetDeviceId() {
  console.log('Device Id  fetching');
  return new Promise((resolve, reject) => {
    try {
      let deviceid = DeviceInfo.getDeviceId();
      Constants.DeviceId = deviceid;
      resolve({ status: true, data: deviceid, message: "Device Id fetching successfull" });
    } catch (err) {
      console.log(err);
      resolve({ status: false, data: err, message: "Device Id fetching Unsuccessfull" });
    }
  });
}

export async function GetLocation() {
  console.log('Location  fetching');
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const location = JSON.stringify(position);
        console.log("Location coordinates =", (location));
        Constants.long = location.longitude;
        Constants.lat = location.latitude;
        resolve({ status: true, data: location, message: "Successfull " });
      },
      error => resolve({ status: false, message: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });
}
*/
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

/*
export async function UploadFile(option, filedata, fname) {
  try {
    console.log(" entered upload file");
    let data = JSON.stringify({
      ImageName: fname,
      Base64string: filedata
    });
    switch (option) {
      case 'reg':
        let result = await Postdata(Urls.FileUpload, data);
        if (result.Status) {
          console.log("response reg file=", (result));
          Constants.user_profile.registercertiname = result.Data;
          return { status: true, data: result.Data, message: result.Message };
        } else {
          return { status: false, message: 'File upload Unsuccessfull' };
          //display message sent from
        }
        break;
      case 'radio':
        let result1 = await Postdata(Urls.FileUpload, data);
        console.log("response radiologist file=", (result1));
        if (result1.Status) {
          //console.log("response radiologist file=",(result1));
          Constants.user_profile.radiologistcertiname = result1.Data;
          return { status: true, data: result1.Data, message: result1.Message };
        } else {
          return { status: false, message: 'File upload Unsuccessfull' };
          //display message sent from
        }
        break;
      case 'sign':
        console.log("sign  upload entered");
        let result2 = await Postdata(Urls.FileUpload, data);
        console.log("response =", (result2));
        if (result2.Status) {
          console.log("response reg file=", (result2));
          Constants.user_profile.signname = result2.Data;
          return { status: true, data: result2.Data, message: result2.Message };
        } else {
          return { status: false, message: 'Signature upload Unsuccessfull' };
          //display message sent from
        }
        break;
    }
  } catch (error) {
    //log error into json file
    console.log(error);
    return { status: false, message: error };
  }
}


export async function VerifiyMobileno(mobileno) {
  try {
    console.log('getOtpurl = ' + Urls.VerifiyNumber + mobileno);
    let result = await Getdata(Urls.VerifiyNumber + mobileno);
    console.log('Verifiy number Result= ', (result));
    if (result.Status) {
      return { status: true, data: result.Data, message: result.Message };
    } else {
      if (result.networkerr) {
        console.log("network err" + result.networkerr);
        return { status: false, networkerr: true, message: result.Message };
      } else {
        return { status: false, networkerr: false, message: 'User Not Found for this Mobile Number' };
      }
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: error };
  }
}

export async function GetOtp(mobileno, flag) {
  try {
    console.log('getOtpurl = ' + Urls.GetUserOtp + mobileno + "&flag=" + flag);
    let result = await Getdata(Urls.GetUserOtp + mobileno + "&flag=" + flag);
    //let result={}
    let temp = result.Data;
    console.log('Get Otp Resultt= ' + temp);
    if (result.Status) {
      //Perform operation required and return
      return { status: true, data: result.Data, message: result.Message };
    } else {
      return { status: false, message: 'Invalid Number. Please enter the correct number to proceed.' };
      //display message sent from
    }
  } catch (error) {
    //log error into json file
    console.log(error);
    return { status: false, message: error };
  }
}

export async function Register(fname,
  mname,
  lname,
  mobno,
  email,
  clinicname,
  clinicregno,
  dob,
  age,
  gender,
  city,
  clinicregcerti,
  address,
  pin,
  sign,
  radiologistcerti,
  regcerti,
  registercertiname,
  radiologistcertiname,
) {

  try {
    let data = JSON.stringify({
      usertypeid: 3,
      firstname: fname,
      middlename: mname,
      lastname: lname,
      MobileNo: mobno,
      emailid: email,
      gender: gender,
      cityid: city,
      address: address,
      dob: dob,
      Age: age,
      zipcode: pin,
      Latitude: Constants.lat,
      Longitude: Constants.long,
      clinicname: clinicname,
      clinicregno: clinicregno,
      signatureimageName: Constants.user_profile.signname,
      radiologistcertificateName: (radiologistcertiname == '' || radiologistcertiname == 'Other Certificate') ? '' : radiologistcertiname,
      clinicregcertificateName: registercertiname,
      clinicregcertificate: regcerti,
      radiologistcertificate: radiologistcerti,
      signatureimage: sign
    });
    console.log('entered Api call for Register radiologist = ' + Urls.UserRegistration);
    let result = await Postdata(Urls.UserRegistration, data);
    console.log({ result });
    if (result.Status) {
      return { status: true, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function VerifiyOtp(otp, mobno) {
  try {
    let data = JSON.stringify({
      otp: otp,
      mobileno: mobno
    });
    console.log('params = ', (data));
    console.log('Otp verification url = ' + Urls.VerifiyOtp);
    let result = await Postdata(Urls.VerifiyOtp, data);
    console.log('Verifiy Otp Resultt= ' + result.Status);
    if (result != null) {
      {
        if (result.Status) {
          return { status: true, data: result.Data, message: result.Message };
        } else {
          return { status: false, message: 'Invalid OTP' };
        }
      }
    }
  } catch (error) {
    return { status: false, message: 'user logged out' };
  }
}

export async function GetCountry() {
  try {
    let result = await Getdata(Urls.getcountry);
    if (result.Status) {
      let Countryarray = [];
      result.Data.map(data => {
        Countryarray.push({ id: data.CountryId, value: data.Name });
      });
      return { status: true, data: Countryarray, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function GetState(cid) {
  try {
    console.log('Selected country id ' + cid);
    console.log("Url and params" + Urls.getstate + cid);
    let result = await Getdata(Urls.getstate + cid);
    if (result.Status) {
      let statearray = [];
      result.Data.map(data => {
        statearray.push({ id: data.StateId, value: data.Name });
      });
      console.log('State Array :' + statearray[0].value);
      return { status: true, data: statearray, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    //log error into json file
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function GetCity(sid) {
  try {
    let result = await Getdata(Urls.getcity + sid);
    if (result.Status) {
      let cityarray = [];
      result.Data.map(data => {
        cityarray.push({ id: data.CityId, value: data.Name });
      });
      console.log('Country Array :' + { cityarray });
      return { status: true, data: cityarray, message: result.Message };
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    //log error into json file
    console.log(error);
    return { status: false, message: 'user logged out' };
  }
}

export async function CheckLoginstatus() {
  return new Promise((resolve, reject) => {
    offline_getDBdata('').then(result => {
      console.log("offline Db data: ", (result.data));
      if (result.status) {
        let uprofile = result.data;
        console.log('entered check login status' + uprofile.login_status);
        if (uprofile.login_status) {
          Constants.user_profile.login_status = true;
          Constants.user_profile.uid = uprofile.uid;
          Constants.user_profile.token = uprofile.token;
          getUserProfile(uprofile.uid).then(result_uprofile => {
            if (result_uprofile.status) {
              Constants.user_profile.login_status = true;
              if (Constants.user_profile.disabled) {
                resolve({ status: false, message: 'user logged out' });
              } else {
                GetFile('sign').then((regresult) => {
                  if (regresult.status) {
                    resolve({ status: true, message: 'Profile loaded successfully' });
                  } else {
                    resolve({ status: false, message: 'Unable to load signature' });
                  }
                }).catch(error => {
                  reject(error);
                });
              }
            } else {
              resolve({ status: false, message: 'user logged out' });
            }
          }).catch(error => {
            resolve({ status: false, message: 'user logged out' });
          });
        } else {
          resolve({ status: false, message: 'user logged out' });
        }
      }
    }).catch(error => {
      console.log(error);
      reject({ status: false, message: 'user logged out' });
    });
  });
}


export async function UserLogin(mobileno) {
  try {
    let data = JSON.stringify({
      Mobileno: mobileno,
    });
    // let result = {status: true, message: 'login successfull'};
    let result = await Postdata(Urls.getLogin, data);
    console.log("Login response = ", (result));
    if (result.Status) {
      console.log("Login response" + (result.Status));
      Constants.user_profile.active = result.isactive;
      Constants.user_profile.mobile_no = mobileno;
      Constants.user_profile.uid = result.Data.userid;
      Constants.user_profile.name = result.Data.firstname;
      Constants.user_profile.token = result.Data.token;
      //insert usid to offline db where existing uid = same  or insert this uid as new entery
      let offlineresult = await offline_loadDB('user', { uid: Constants.user_profile.uid, login_status: true, token: result.Data.token });
      if (offlineresult.status) {
        let result_uprofile = await getUserProfile(result.Data.userid);
        console.log("get profile details called", (result_uprofile));
        if (Constants.user_profile.disabled) {
          return { status: false, message: 'User Disabled please contact Administrator' };
        } else {
          if (result_uprofile.status) {
            Constants.user_profile.login_status = true;
            let res = await GetFile('sign');
            if (res.status) {
              return { status: true, data: result.Data, message: 'Login Successfull' };
            } else {
              return { status: false, message: res.message };
            }
          } else {
            return {
              status: false,
              message: 'Unable to get User Profile Details please retry',
            };
          }
        }
      } else {
        Constants.user_profile.login_status = false;
        return { status: false, message: 'login Unsuccessfull Please Try Again' };
      }
    } else {
      return { status: false, message: result.Message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: error };
  }
}


export async function UpdateUserDetasils(
  fname,
  mname,
  lname,
  mobno,
  email,
  clinicname,
  clinicregno,
  dob,
  age,
  gender,
  city,
  clinicregcerti,
  address,
  pin,
  sign,
  radiologistcerti,
  regcerti,
  registercertiname,
  radiologistcertiname,
) {
  try {
    let data = JSON.stringify({
      userid: Constants.user_profile.uid,
      firstname: fname,
      middlename: mname,
      lastname: lname,
      MobileNo: mobno,
      emailid: email,
      gender: gender,
      cityid: city,
      address: address,
      dob: dob,
      Age: age,
      zipcode: pin,
      Latitude: Constants.lat,
      Longitude: Constants.long,
      clinicname: clinicname,
      clinicregno: clinicregno,
      signatureimageName: Constants.user_profile.signname,
      radiologistcertificateName: (radiologistcertiname == '' || radiologistcertiname == 'Other Certificate') ? '' : radiologistcertiname, //radiologistcertiname,//(radiologistcertiname==''||radiologistcertiname=='Other Certificate')?'sample.jpg':radiologistcertiname,
      clinicregcertificateName: registercertiname,
      clinicregcertificate: regcerti,
      radiologistcertificate: radiologistcerti,
      signatureimage: sign
    });
    console.log("params =", (data));
    console.log('entered Api call for Register radiologist = ' + Urls.UpdateProfile);
    let result = await PostdataToken(Urls.UpdateProfile, data, Constants.user_profile.token);
    console.log("update profile result", (result));
    if (result.Status) {
      return { status: true, message: result.Message };
    } else {
      //display message sent from
      return { status: false, message: result.Message };
    }
  } catch (error) {
    //log error into json file
    console.log(error);
    return { status: false, message: error };
  }
}

export async function getUserProfile(uid) {
  try {
    console.log('get User Profile = ' + Urls.getUserprofile + uid);
    let result = await GetdataToken(Urls.getUserprofile + uid, Constants.user_profile.token);
    //let result = await  Getdata(Urls.getUserprofile + uid,Constants.user_profile.token);

    let temp = result.Data;
    console.log('Get UserProfile Result= ', (temp));
    //console.log('Is Approve =', (temp.IsApprove));
    if (result.Status) {
      Constants.user_profile.uid = temp.userid;
      Constants.user_profile.name = temp.firstname;
      Constants.user_profile.mname = temp.middlename;
      Constants.user_profile.lname = temp.lastname;
      Constants.user_profile.dob = temp.dob;
      Constants.user_profile.email = temp.emailid;
      Constants.user_profile.mobile_no = temp.MobileNo;

      Constants.user_profile.country = temp.countryname;
      Constants.user_profile.state = temp.statename;
      Constants.user_profile.city = temp.cityname;

      Constants.user_profile.disabled = temp.disabled;
      Constants.user_profile.active = temp.IsApprove;
      Constants.user_profile.countryid = temp.countryid;
      Constants.user_profile.stateid = temp.stateid;
      Constants.user_profile.cityid = temp.cityid;
      Constants.user_profile.address = temp.address;
      Constants.user_profile.zipcode = temp.zipcode;
      Constants.user_profile.gender = temp.gender;
      Constants.user_profile.clinicname = temp.clinicname;
      Constants.user_profile.clinicregno = temp.clinicregno;
      Constants.user_profile.registercertidata = temp.clinicregcertificate;
      Constants.user_profile.radiologistcertidata = temp.radiologistcertificate;
      Constants.user_profile.signname = temp.signatureimageName;
      //Constants.user_profile.signaturedata = temp.signatureimage;
      Constants.user_profile.registercertiname = temp.clinicregcertificateName;
      Constants.user_profile.radiologistcertiname = (temp.radiologistcertificateName == '' || temp.radiologistcertificateName == null) ? 'Other Certificate' : temp.radiologistcertificateName;
      Constants.user_profile.login_status = true;
      Constants.countryId.id = temp.CountryId;
      Constants.stateId.id = temp.StateId;
      Constants.cityId.id = temp.cityid;
      Constants.countryId.name = temp.countryname;
      Constants.stateId.name = temp.statename;
      Constants.cityId.name = temp.cityname;
      return { status: true, message: result.Message };
    } else {
      return { status: false, message: 'login Unsuccessfull' };
      //display message sent from
    }
  } catch (error) {
    //log error into json file
    console.log(error);
    return { status: false, message: error };
  }
}


export async function converttoBAse64(path) {
  console.log("Entered convert base 64");
  if (path == '' || String(path).length <= 0) {
    Alert.alert("Path cannot be empty");
  } else {
    return new Promise((resolve, reject) => {
      //ImgToBase64.getBase64String('file://' + path)
      ImgToBase64.getBase64String(path)
        .then((base64String => resolve(String(base64String).replace(/\s+/g, ''))))
        .catch(err => reject(err));
    });
  }
}

export async function Logout() {
  try {
    Constants.user_profile.login_status = false;
    Constants.user_profile.uid = '';
    Constants.user_profile.name = '';
    Constants.user_profile.mname = '';
    Constants.user_profile.lname = '';
    Constants.user_profile.dob = '';
    Constants.user_profile.email = '';
    Constants.user_profile.mobile_no = '';
    Constants.user_profile.cityid = '';
    Constants.user_profile.address = '';
    Constants.user_profile.zipcode = '';
    Constants.user_profile.gender = '';
    Constants.user_profile.countryid = '';
    Constants.user_profile.stateid = '';
    Constants.user_profile.cityid = '';
    Constants.user_profile.address = '';
    Constants.user_profile.zipcode = '';
    Constants.user_profile.gender = '';
    Constants.user_profile.clinicname = '';
    Constants.user_profile.clinicregno = '';
    Constants.user_profile.registercertidata = '';
    Constants.user_profile.radiologistcertidata = '';
    Constants.user_profile.signaturedata = '';
    Constants.user_profile.registercertiname = '';
    Constants.user_profile.radiologistcertidata = '';
    Constants.user_profile.login_status = '';

    let result = await clear_offlineDB();
    if (result.status) {
      return { status: true, message: 'Logout successfull' };
    } else {
      return { status: false, message: 'Logout Unsuccessfull' };
    }
  } catch (error) {
    return { status: false, message: error };
  }
}

export async function getDBkeys() {

  return new Promise((resolve, reject) => {
    AsyncStorage.getAllKeys((error, keys) => {
      if (error) {
        console.log("error at loading Offline db Keys")
        reject({ status: false, messag: 'Cannot load offline DB Keys' })
      } else {
        console.log("geting db keys");
        resolve({ status: true, data: keys, messag: 'Data loaded to Offline DB' })
      }
    });
    //return { staus: true, messag: 'Data loaded to Offline DB' };
  });
}

/*
export async function offline_loadDB(key, Data) {
  let resclrdb = await clear_offlineDB();
  if (resclrdb) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem('user', JSON.stringify(Data), (error) => {
        if (error) {
          console.log("error at loading Offline db");
          reject({ status: false, messag: 'Cannot load data to offline' })
        } else {
          console.log("loading Offline db Successfull");
          resolve({ status: true, messag: 'Data loaded to Offline DB' })
        }
      });
    });
  } else {
    return ({ status: false, messag: 'Cannot load data to offline' });
  }
}

export async function offline_getDBdata(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('user', (error, result) => {
      if (error) {
        console.log("error at geting Offline db data")
        reject({ status: false, messag: 'Problem in getting offline db data' })
      } else {
        resolve({ status: true, data: JSON.parse(result), messag: 'Data loaded to Offline DB' })
      }
    });
    //return { staus: true, messag: 'Data loaded to Offline DB' };
  });
}

export async function clear_offlineDB() {
  return new Promise((resolve, reject) => {
    AsyncStorage.clear((error) => {
      if (error) {
        console.log("error at geting Offline db data")
        reject({ status: false, messag: 'Problem in getting offline db data' })
      } else {
        resolve({ status: true, messag: 'offline DataBase cleared succesfully' })
      }
    });
    //return { staus: true, messag: 'Data loaded to Offline DB' };
  });
}
*/
/*async function converBase64(path) {
  const imageURL = path; //path for the image
  Image.getSize(imageURL, (width, height) => {
    var imageSize = {
      size: {
        width,
        height
      },
      offset: {
        x: 0,
        y: 0,
      },
    };
    ImageEditor.cropImage(imageURL, imageSize, (imageURI) => {
      console.warn(imageURI);
      ImageStore.getBase64ForTag(imageURI, (base64Data) => {
        this.setState({ pictureBase64: base64Data });
        console.warn("Base", base64Data) //Converted base64 image
        ImageStore.removeImageForTag(imageURI);
      }, (reason) => console.warn(reason))
    }, (reason) => console.warn(reason))
  }, (reason) => console.warn(reason))
}*/

/*export async function UploadFile(path) {
  try {
    let ApiUrl = 'http://ipas.esdsconnect.com/iPAS-WebAPI/Default/UploadFileFromAPI'
    //let ApiUrl = Urls.FileUpload;
    console.log("Url =" + ApiUrl);
    console.log("entered upload file" + path);
    let formData1 = new FormData();
    formData1.append('AllowedFileId', '1');
    formData1.append('did', '0');
    formData1.append('File', {
      uri: 'file://storage/emulated/0/Download/',
      name: "images.jpeg",
      type: 'image/jpeg'
    });
    result = await Postfile(ApiUrl, formData1);
    if (result.Status == true) {
      console.log(result)
      return { status: true, message: "file upload successfull" };
    } else {
      return { status: false, message: "file upload successfull" };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: error };
  }
}*/


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
