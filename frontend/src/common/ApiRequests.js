const API_ROOT = 'http://localhost:3000/api/';

async function sendRequest(path, method, data) {
  try {
    let req = new Request(API_ROOT + path, { method });
    req.headers.append('content-type', 'application/json');

    const response = await fetch(req, data);
    if (response.ok) {
      return { status: RESPONSE_STATUS.OK, data: await response.json() };
    } else {
      return { status: RESPONSE_STATUS.BAD_RESPONSE };
    }
  } catch (e) {
    return { status: RESPONSE_STATUS.NO_CONNECTION };
  }
}

export async function getRequest(path) {
  return sendRequest(path, 'GET');
}

export async function postRequest(path, data) {
  return sendRequest(path, 'POST', data);
}

export const RESPONSE_STATUS = {
  OK: 'OK',
  NO_CONNECTION: 'NO_CONNECTION',
  BAD_RESPONSE: 'BAD_RESPONSE',
};
