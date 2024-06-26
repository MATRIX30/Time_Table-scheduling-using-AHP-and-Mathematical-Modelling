// send request
const sendRequest = async (url, options) => {
  const response = await fetch(url, options);
  return await response.json();
};

// options
const optionsHandler = (method, body, isFormData) => {
  return {
    method: method,
    body: isFormData ? body : JSON.stringify(body),
    headers: !isFormData && {
      "Content-Type": "application/json",
    },
  };
};

const createUser = async (url, body) => {
  const options = optionsHandler("POST", body, false);
  return await sendRequest(url, options);
};

const authUser = async (url, body) => {
  const options = optionsHandler("POST", body, false);
  return await sendRequest(url, options);
};

const getSouscriptionUser = async (url, body) => {
  const options = optionsHandler("GET", body, false);
  return await sendRequest(url, options);
}

const addSouscription = async (url, body) => {
  const options = optionsHandler("POST", body, false);
  return await sendRequest(url, options);
};

export { createUser, authUser, getSouscriptionUser , addSouscription};
