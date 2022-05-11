import axios from 'axios';

export async function login(username, password) {
  var options = {
    method: 'POST',
    url: 'http://127.0.0.1:3000/login',
    data: { username, password }
  };

  return await axios.request(options);

}

export async function getMenu(jwt, idBar) {
  var options = {
    method: 'GET',
    url: 'http://127.0.0.1:3000/bar/'+idBar+'/menu',
    params: {
      token: jwt
    },
  };

  return await axios.request(options);
}

export async function getFasciaOraria(jwt, idBar) {
  var options = {
    method: 'GET',
    url: 'http://127.0.0.1:3000/bar/' + idBar + '/fasciaoraria',
    params: {
      token: jwt
    },
  };

  return await axios.request(options);
}


export async function getOrders(jwt, idUser) {
  var options = {
    method: 'GET',
    url: 'http://127.0.0.1:3000/user/'+idUser+'/prenotazione',
    params: {
      token: jwt
    },
  };

  return await axios.request(options);
}

export async function getSpecificOrder(jwt, idUser, idOrder) {
  var options = {
    method: 'GET',
    url: 'http://127.0.0.1:3000/user/' + idUser + '/prenotazione/'+idOrder,
    params: {
      token: jwt
    },
  };

  return await axios.request(options);
}

export async function putPrenotazione(jwt, idUser, prenotazione){
  var options = {
    method: 'PUT',
    url: 'http://127.0.0.1:3000/user/'+ idUser + '/prenotazione',
    data:{prenotazione, token: jwt}
  }

  return await axios.request(options);
}