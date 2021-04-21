import { Constants } from './Apicall'
import axios from 'axios';
// import request from './Request'

// const axiosinstance = axios.create({
//   withCredentials: true,
//   baseURL: 'http://115.124.127.245:3002/Mission_Onboarding/'
// });


const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
  timeout: 25000,
};

export function Getdata(url) {
  console.log("Url = ", url);
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      timeout: 25000,
      headers: {
        'deviceid': Constants.DeviceId,
      }
    }).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve({ Status: false, networkerr: true, Message: "Server Not Responding" })
      }
    })
      .catch(error => {
        console.error(error);
        reject(error);
      });
    setTimeout(() => {
      console.log("entered settimeout");
      resolve({ Status: false, networkerr: true, Message: 'Network Request TimedOut' });
    }, 25000);
  });
}


export function GetdataToken(url, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      timeout: 25000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
        'deviceid': Constants.DeviceId,
      }
    }).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve({ status: false, message: "Server Not Responding" })
      }
    })
      .catch(error => {
        console.error(error);
        reject(error);
      });
    setTimeout(() => {
      console.log("entered settimeout");
      resolve({ Status: false, Message: 'Network Request TimedOut' });
    }, 30000);
  });
}

export function Postdata(url, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      timeout: 25000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'barer',
        //'deviceid': Constants.DeviceId,
      },
      data: data,
    }).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve({ status: false, message: "Server Not Responding" })
      }
    }).catch(error => {
      console.error(error);
      reject(error);
    });
    setTimeout(() => {
      console.log("entered settimeout");
      resolve({ Status: false, Message: 'Network Request TimedOut' });
    }, 30000);
  });
}

export function Postdatanew(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, axiosConfig).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve({ status: false, message: "Server Not Responding" })
      }
    }).catch(error => {
      console.error(error);
      reject(error);
    });

    setTimeout(() => {
      console.log("entered settimeout");
      resolve({ Status: false, Message: 'Network Request TimedOut' });
    }, 30000);
  });
}


export function Postfile(url, data) {
  console.log("calling file upload");
  return new Promise((resolve, reject) => {

    axios({
      method: 'post',
      url: url,
      timeout: 50000,
      data: data,
    }).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve({ status: false, message: "Server Not Responding" })
      }
    })
      .catch(error => {
        console.error(error);
        reject(error);
      });

    setTimeout(() => {
      console.log("entered settimeout");
      resolve({ Status: false, Message: 'Network Request TimedOut' });
    }, 30000);
  });
}

export function PostdataToken(url, data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: data,
    }).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve({ status: false, message: "Server Not Responding" })
      }
    })
      .catch(error => {
        console.error(error);
        reject(error);
      });
    setTimeout(() => {
      console.log("entered settimeout");
      resolve({ Status: false, Message: 'Network Request TimedOut' });
    }, 30000);
  });
}
