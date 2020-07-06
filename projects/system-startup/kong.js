const services = require('./config/services.json');
const {
  serviceExist,
  createService,
  updateService,
  routeExist,
  createRoute,
  updateRoute,
  pluginExist,
  createPlugin,
  updatePlugin,
} = require('./lib/kong');

const {
  getAccessToken,
  getSecret,
} = require('./lib/keycloak');

const api = process.env.GATEWAY || 'http://kong:8001';

(async () => {
  for (const service of services) {
    const { routes, plugins = [], ...params } = service;
    !(await serviceExist(api, params.name))
      ? await createService(api, params)
      : await updateService(api, params);

    for (const route of routes) {
      !(await routeExist(api, service.name, route.name))
        ? await createRoute(api, service.name, route)
        : await updateRoute(api, service.name, route);
    }

    for (const plugin of plugins) {
      if (plugin.name === 'oidc') {
        const aimAPI = process.env.IAM;
        const accessToken = await getAccessToken(
          aimAPI,
          {
            username: process.env.KEYCLOAK_USERNAME,
            password: process.env.KEYCLOAK_PASSWORD,
          },
        );
        const secret = await getSecret(
          accessToken,
          aimAPI,
          plugin.config.realm,
          plugin.config.client_id,
        );
        plugin.config.client_secret = secret;
      }

      !(await pluginExist(api, service.name, plugin.id))
        ? await createPlugin(api, service.name, plugin)
        : await updatePlugin(api, service.name, plugin);
    }
  }
})()
  .then(() => {
    console.info('** SERVICES REGISTED SUCESSFULLY **');
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
