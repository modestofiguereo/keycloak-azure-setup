const fs = require('fs').promises;
const realms = require('./config/realms');
const {
  getAccessToken,
  realmExist,
  createRealm,
  clientExist,
  getSecret,
  createClient,
  userExist,
  createUser,
  getRole,
  createRole,
  addComposites,
  getRealManagementRoles,
  assignRoles,
  getClientUser,
} = require('./lib/keycloak.js');

const api = process.env.IAM || 'http://iam:8080';

// TODO: REFACTOR THIS CODE TO MAKE IT MORE READABLE.
(async () => {
  const accessToken = await getAccessToken(
    api,
    {
      username: process.env.KEYCLOAK_USERNAME,
      password: process.env.KEYCLOAK_PASSWORD,
    },
  );

  for (const realm of realms) {
    const {
      roles, clients, users, ...params
    } = realm;
    params.smtpServer.user = process.env.SMTP_USER;
    params.smtpServer.password = process.env.SMTP_PASSWORD;

    if (!(await realmExist(api, accessToken, params.id))) {
      await createRealm(api, accessToken, params);
    }

    for (const client of clients) {
      if (!(await clientExist(api, accessToken, realm.id, client.id))) {
        await createClient(api, accessToken, realm.id, client);
      }
    }

    for (const user of users) {
      if (!(await userExist(api, accessToken, realm.id, user.email))) {
        await createUser(api, accessToken, realm.id, user);
      }
    }
  }
})()
  .then(() => {
    console.info('** REALMS REGISTED SUCESSFULLY **');
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
