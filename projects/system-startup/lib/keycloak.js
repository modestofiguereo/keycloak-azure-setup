const request = require('request-promise-native');

const getAccessToken = async (api, credentials) => (
  request({
    method: 'POST',
    uri: `${api}/auth/realms/master/protocol/openid-connect/token/`,
    form: {
      ...credentials,
      grant_type: 'password',
      client_id: 'admin-cli',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
  })
    .then((response) => JSON.parse(response).access_token)
);

const realmExist = async (api, token, realm) => (
  request({
    method: 'GET',
    uri: `${api}/auth/admin/realms/${realm}`,
    json: true,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
    .then(() => true)
    .catch(() => false)
);

const createRealm = async (api, token, data) => (
  request({
    method: 'POST',
    uri: `${api}/auth/admin/realms/`,
    body: data,
    json: true,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
);

const getClient = async (api, token, realm, client) => (
  request({
    method: 'GET',
    uri: `${api}/auth/admin/realms/${realm}/clients?clientId=${client}`,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
    .then((response) => JSON.parse(response)[0])
    .catch(() => null)
);

const getClientUser = async (api, token, realm, clientId) => (
  request({
    method: 'GET',
    uri: `${api}/auth/admin/realms/${realm}/clients/${clientId}/service-account-user`,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
    .then((response) => JSON.parse(response))
    .catch(() => null)
);

const clientExist = async (api, token, realm, client) => (
  getClient(api, token, realm, client)
    .then((response) => response != null)
    .catch(() => false)
);

const createClient = async (api, token, realm, data) => (
  request({
    method: 'POST',
    uri: `${api}/auth/admin/realms/${realm}/clients`,
    body: data,
    json: true,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
);

const getSecret = async (token, api, realm, clientId) => (
  request({
    method: 'GET',
    uri: `${api}/auth/admin/realms/${realm}/clients/${clientId}/client-secret`,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
    .then((response) => JSON.parse(response).value)
    .catch(() => null)
);

const getUser = async (api, token, realm, user) => (
  request({
    method: 'GET',
    uri: `${api}/auth/admin/realms/${realm}/users?search=${user}`,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
    .then((response) => JSON.parse(response)[0])
    .catch(() => null)
);

const userExist = async (api, token, realm, username) => (
  getUser(api, token, realm, username)
    .then((user) => user != null)
    .catch(() => false)
);

const createUser = async (api, token, realm, data) => (
  request({
    method: 'POST',
    uri: `${api}/auth/admin/realms/${realm}/users`,
    body: data,
    json: true,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
);

const getRole = async (api, token, realm, role) => (
  request({
    method: 'GET',
    uri: `${api}/auth/admin/realms/${realm}/roles?search=${role}`,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
    .then((response) => JSON.parse(response)[0])
    .catch(() => null)
);

const createRole = async (api, token, realm, data) => (
  request({
    method: 'POST',
    uri: `${api}/auth/admin/realms/${realm}/roles`,
    body: data,
    json: true,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
    .then((response) => JSON.parse(response))
    .catch(() => null)
);

const getRealManagementRoles = async (api, token, realm) => (
  getClient(api, token, realm, 'realm-management')
    .then((client) => (
      request({
        method: 'GET',
        uri: `${api}/auth/admin/realms/${realm}/clients/${client.id}/roles`,
        headers: {
          Authorization: `bearer ${token}`,
          Accept: 'application/json',
        },
      })
        .then((response) => JSON.parse(response))
        .catch(() => [])
    ))
);

const addComposites = async (api, token, realm, roleId, data) => (
  request({
    method: 'POST',
    uri: `${api}/auth/admin/realms/${realm}/roles-by-id/${roleId}/composites`,
    body: data,
    json: true,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
);

const assignRoles = async (api, token, realm, clientId, data) => (
  request({
    method: 'POST',
    uri: `${api}/auth/admin/realms/${realm}/users/${clientId}/role-mappings/realm`,
    body: data,
    json: true,
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/json',
    },
  })
);

module.exports = {
  getAccessToken,
  realmExist,
  createRealm,
  getClient,
  clientExist,
  createClient,
  getSecret,
  getUser,
  userExist,
  createUser,
  getRole,
  createRole,
  addComposites,
  getRealManagementRoles,
  assignRoles,
  getClientUser,
};
