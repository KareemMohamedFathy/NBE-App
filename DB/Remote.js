import axios from 'axios';

const BACKEND_URL = 'https://react-task-c2c86-default-rtdb.firebaseio.com';
export async function getAllUsers() {
  const response = await axios.get(BACKEND_URL + '/Users.json');
  return response.data;
}

export async function getBenefeciaries(uid) {
  const response = await axios.get(
    BACKEND_URL + `/Benefeciaries.json?orderBy="myid"&equalTo="${uid}"`,
  );
  let beneficiares = [];
  const data = response.data;
  for (const key in data) {
    const benefeciarie = {
      benid: key,
      firstname: data[key].firstname,
      lastname: data[key].lastname,
      email: data[key].email,
      branch: data[key].branch,
      phoneno: data[key].phoneno,
      accountnumber: data[key].accountnumber,
      image: data[key].image,
      myid: data[key].myid,
    };
    beneficiares.push(benefeciarie);
  }
  return beneficiares;
}
export async function storeuser(user) {
  console.log(user);
  await axios.put(BACKEND_URL + `/Users/${user.userid}/.json`, {
    phoneno: user.phoneno,
    userid: user.userid,
    devicetoken: user.devicetoken,
  });
}
export async function addTransfer(values) {
  axios.post(BACKEND_URL + '/Transfer.json', values);
}
export async function addBeneficiaries(values) {
  axios.post(BACKEND_URL + '/Benefeciaries.json', values);
}
export async function getTransfers(uid) {
  const response = await axios.get(
    BACKEND_URL + `/Transfer.json?orderBy="sender"&equalTo="${uid}"`,
  );
  return response.data;
}
export async function deleteBenefciaries(id) {
  axios.delete(`${BACKEND_URL}/Benefeciaries/${id}.json`);
}

export default getAllUsers;
