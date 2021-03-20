const localhost = true;
// nate
const LOCAL_IP_ADDRESS = 'http://192.168.1.165';
// const LOCAL_IP_ADDRESS = 'http://192.168.56.1';
const PORT = '80';
const REMOTE_URL = 'https://trojan-check-in-out-api.herokuapp.com';
export default {
  URL_ENDPOINT: localhost ? `${LOCAL_IP_ADDRESS}:${PORT}` : REMOTE_URL,
};
