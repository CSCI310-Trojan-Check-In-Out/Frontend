const localhost = false;
const LOCAL_IP_ADDRESS = 'http://192.168.1.165';
const PORT = '80';
const REMOTE_URL = 'https://trojan-check-in-out-api.herokuapp.com';
export default {
  URL_ENDPOINT: localhost ? `${LOCAL_IP_ADDRESS}:${PORT}` : REMOTE_URL,
};
