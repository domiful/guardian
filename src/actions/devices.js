import { Firebase, FirebaseRef } from '../lib/firebase';
import axios from 'axios';
import { Permissions, Notifications } from 'expo';
import people from './data.json';

const url = "https://2E1DF6F175974BB19E70DE0CACC3D0FC.uscom-central-1.oraclecloud.com:443/mobile/custom/PenFedAPI";
const aToken = "Basic bmFyZXNoYmhhaS5zYW5vZGFyaXlhQG9yYWNsZS5jb206QXBwRGV2QDEyMw==";
const backID = "a2595484-d848-4015-9173-9c8111ab7e1c";


export function getLoans() {
  return dispatch => new Promise((resolve, reject) => 
      {
        return resolve(dispatch({
          type: 'DEVICES_REPLACE',
          data: people.people
        }));
      }).catch(e => console.log(e));
}


export function getLoan(device) {
  let recipesUrl = url + "/loans/" + device;
  let auth = {
    headers: {
      "Authorization": aToken,
      "Oracle-Mobile-Backend-ID": backID,
      'Content-Type': 'application/json'
    }
  };
  
  return dispatch => new Promise((resolve, reject) => axios
      .get(recipesUrl,auth)
      .then(function (response) {
        //console.log(response.data);
        return resolve(dispatch({
          type: 'SINGLE_DEVICE',
          data: response.data
        }));
      }).catch(reject)).catch(e => console.log(e));
}

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
 // if (finalStatus !== 'granted') {
   // return;
  //}

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  
  console.log(token);

  postToken(token);
  //return token;

  /*// POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Brent',
      },
    }),
  });*/
}

export async function postToken(token) {
  var link = url + "/dealers";
  var auth = {
    headers: {
      "Authorization": aToken,
      "Oracle-Mobile-Backend-ID": backID,
      'Content-Type': 'application/json'
    }
  }
  return axios.post(link, {token:token}, auth)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

export async function putLoan(loan) {
  var link = url + "/loans/"+loan.mcsId;
  var auth = {
    headers: {
      "Authorization": aToken,
      "Oracle-Mobile-Backend-ID": backID,
      'Content-Type': 'application/json'
    }
  }
  return axios.put(link, loan, auth)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}