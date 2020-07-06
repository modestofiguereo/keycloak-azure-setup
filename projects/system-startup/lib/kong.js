const request = require('request-promise-native');

const consumerExist = async (api, username) => (
  request(`${api}/consumers/${username}`)
    .then(() => true)
    .catch(() => false)
);

const createConsumer = async (api, data) => (
  request({
    method: 'POST',
    uri: `${api}/consumers`,
    body: data,
    json: true,
  })
);

const serviceExist = async (api, name) => (
  request(`${api}/services/${name}`)
    .then(() => true)
    .catch(() => false)
);

const createService = async (api, data) => (
  request({
    method: 'POST',
    uri: `${api}/services`,
    body: data,
    json: true,
  })
);

const updateService = async (api, data) => (
  request({
    method: 'PATCH',
    uri: `${api}/services/${data.name}`,
    body: data,
    json: true,
  })
);

const routeExist = async (api, service, route) => (
  request(`${api}/services/${service}/routes/${route}`)
    .then(() => true)
    .catch(() => false)
);

const createRoute = async (api, service, data) => (
  request({
    method: 'POST',
    uri: `${api}/services/${service}/routes`,
    body: data,
    json: true,
  })
);

const updateRoute = async (api, service, data) => (
  request({
    method: 'PATCH',
    uri: `${api}/services/${service}/routes/${data.name}`,
    body: data,
    json: true,
  })
);

const pluginExist = async (api, service, plugin) => (
  request(`${api}/services/${service}/plugins/${plugin}`)
    .then(() => true)
    .catch(() => false)
);

const createPlugin = async (api, service, data) => (
  request({
    method: 'POST',
    uri: `${api}/services/${service}/plugins`,
    body: data,
    json: true,
  })
);

const updatePlugin = async (api, service, data) => (
  request({
    method: 'PATCH',
    uri: `${api}/services/${service}/plugins/${data.id}`,
    body: data,
    json: true,
  })
);

module.exports = {
  consumerExist,
  createConsumer,
  serviceExist,
  createService,
  updateService,
  routeExist,
  createRoute,
  updateRoute,
  pluginExist,
  createPlugin,
  updatePlugin,
};
