module.exports = [
  {
    name: 'webapp',
    path: '/',
    url: 'http://webapp:3000',
    routes: [
      {
        name: 'webapp-root',
        paths: [
          '/',
        ],
        hosts: [
          `${process.env.ENVIRONMENT_APP_DOMAIN}`,
        ],
        strip_path: false,
        preserve_host: true,
      },
    ],
    plugins: [
      {
        id: 'd852a3f4-c45f-40dd-a973-166577b526be',
        name: 'cors',
        config: {
          origins: [
            `http://${process.env.ENVIRONMENT_APP_DOMAIN}:8000`,
            `https://${process.env.ENVIRONMENT_APP_DOMAIN}:8443`
          ],
          methods: [
            'GET',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'HEAD',
          ],
          headers: [
            'Accept',
            'Accept-Version',
            'Content-Length',
            'Content-MD5',
            'Content-Type',
            'Date',
            'X-Auth-Token',
            'X-Access-Token',
            'Authorization',
          ],
          exposed_headers: ['X-Access-Token'],
          credentials: true,
          max_age: 3600,
        },
        enabled: true,
      },
      {
        id: '1d771f5f-a0cb-476e-8c96-09cb576e77aa',
        name: 'oidc',
        config: {
          client_id: 'kong',
          client_secret: '<CLIENT_SECRET>',
          discovery: `https://accounts.${process.env.ENVIRONMENT_APP_DOMAIN}:8443/auth/realms/${process.env.REALM_NAME}/.well-known/openid-configuration`,
          bearer_only: 'no',
          realm:  process.env.REALM_NAME,
          introspection_endpoint: `https://accounts.${process.env.ENVIRONMENT_APP_DOMAIN}:8443/auth/realms/${process.env.REALM_NAME}/protocol/openid-connect/token/introspect`
        },
        enabled: true
      },
    ],
  },
  {
    name: 'iam',
    path: '/',
    url: 'http://iam:8080/',
    routes: [
      {
        name: 'iam-root',
        paths: [
          '/',
        ],
        hosts: [
          `accounts.${process.env.ENVIRONMENT_APP_DOMAIN}`,
        ],
        strip_path: false,
        preserve_host: true,
      },
    ],
  },
  {
    name: 'konga',
    path: '/',
    url: 'http://konga:1337/',
    routes: [
      {
        name: 'konga-root',
        paths: [
          '/',
        ],
        hosts: [
          `konga.${process.env.ENVIRONMENT_APP_DOMAIN}`,
        ],
        strip_path: false,
        preserve_host: true,
      },
    ],
    plugins: [
      {
        id: '2d630754-41a8-453b-947f-70f695815cd1',
        name: 'cors',
        config: {
          origins: [`http://konga.${process.env.ENVIRONMENT_APP_DOMAIN}:8000`],
          methods: [
            'GET',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'HEAD',
          ],
          headers: [
            'Accept',
            'Accept-Version',
            'Content-Length',
            'Content-MD5',
            'Content-Type',
            'Date',
            'X-Auth-Token',
            'X-Access-Token',
            'Authorization',
          ],
          exposed_headers: ['X-Access-Token'],
          credentials: true,
          max_age: 3600,
        },
        enabled: true,
      },
    ],
  },
];
