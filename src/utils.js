export const ajaxCall = (url, method, jsonData) => {
  const baseUrl = "https://hangman.coursera.org/";
  return new Promise((resolve, reject) => {
    const httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          resolve(httpRequest.responseText);
        } else {
          reject(httpRequest);
        }
      }
    };
    httpRequest.open(method, baseUrl.concat(url));
    if (jsonData) {
      httpRequest.send(JSON.stringify(jsonData));
    } else {
      httpRequest.send();
    }
    
  });
};