# Introduction

This project is a prototype for the purpose demonstrairing how to use [Keycloak](https://www.keycloak.org/) as an IAM (Identity and Access Management) provider.

## System Prerequisites

- [Docker](https://www.docker.com/)
- [docker-compose](https://github.com/docker/compose)
- [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) (@TODO)

## Setting up the project

The process for installing and getting up and running the project is fully automated by the `./manage` script and the varios commands it provides.

### Before you start

You have to modify your `/etc/hosts` file and append the following:

```bash
127.0.0.1 amadita.loc
127.0.0.1 konga.amadita.loc
127.0.0.1 accounts.amadita.loc
```

<span style="color:red">
  NOTE: If you are using mac you maybe need to replace `127.0.0.1` with the docker virtual machine IP address.
</span>

### Installing

`./manage install`

This command will:

- Download images, if not present.
- Build images from Dockerfiles, if needed.
- Run containers.
- Run database migrations and setup scripts.
- Get the system up and running.

<span style="color:red">
  NOTE: This command must only be used the first time you run the system, or after executing `./manage uninstall`.
</span>

After the scripts are done executing you can access the application through your browser:

- [https://amadita.loc:8443](https://amadita.loc:8443): Dummy react application created with react-create-app.
- [https://konga.amadita.loc:8443](https://konga.amadita.loc:8443): Kong dashboard.
- [https://accounts.amadita.loc:8443](https://accounts.amadita.loc:8443): Keycloak dashboard.

### Running

`./manage init`

This command will init the system after it have been halted.

### Configuring keycloak and kong

`./manage bootstrap`

This command will:

- Set up the the realm in Keycloak.
- Register services in kong.

### Stopping

`./manage halt`

This command will shutdown the system.

### Uninstalling

`./manage uninstall`

This command will:

- Stop containers.
- Remove containers.
- Remove volumes.
- Remove networks.
- Remove built images.

### Executing docker-compose commands

Any docker-docker compose command can be executed by following this syntax `./manage [docker-compose comand]`, e.g.:

```bash
./manage logs -f kong
./manage exec kong bash
./manage restart keycloak
```

## Setting up Azure AD

### Requirements
- The system must be up and running.
- An Azure account with access to Azure AD.

### Setup

#### Creating Active Directory

IF YOU HAVE AN ACTIVE DIRECTORY ALREADY YOU CAN SKIP THIS SECTION.

1. Browse to the [Azure portal](https://portal.azure.com/).

![Azure portal screenshot](screenshots/azure-portal.png "Azure Portal")

2. Select the **plus icon** (+) and search for **Azure Active Directory**.

![Plus icon screenshot](screenshots/plus-icon.png "Plus icon")

![Search bar screenshot](screenshots/search-bar.png "Search bar")

3. Select **Create**.

![Active Directory details screenshot](screenshots/active-directory-details-page.png "Active Directory details")

4. Provide an **Organization name** and an **Initial domain name**. Then select **Create**.

![Create tenant screenshot](screenshots/create-tenant.png "Create tenant")

5. Ragister a new application using Azure portal; follow the instructions in this [link](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).

6. Let's import the configuration. Copy the OpenID connect metadata url.

![OpenID Connent metadata link screenshot](screenshots/metadata-link.png "OpenID Connent metadata link")

7. Go to the [Keycloak dashboard](https://accounts.amadita.loc:8443/) and login.

![Keycloak home screenshot](screenshots/keycloak-home.png "Keycloak home")

![Keycloak login screenshot](screenshots/keycloak-login.png "Keycloak login")

8. Go to the **Identity Providers** page.

![Identity providers screenshot](screenshots/empty-identity-providers-page.png "Identity providers")

9. Add a new **OpenID Connect** provider.

10. Scroll to the button of the screen and paste the url you copied from Azure (step 6) in the **Import from URL** field. Then click **Import**. Most of the form will be filled automatically.

![Import from URL screenshot](screenshots/import-from-url.png "Import from URL")

11. Now scroll up to the **Client Authentication** section. Set client authentication as in the image. You can get **Client ID** and **Client Secret** from Azure.

![Credentials screenshot](screenshots/credentials.png "Credentials")
![Credentials screenshot](screenshots/azure-credentials.png "Credentials")
![Credentials screenshot](screenshots/azure-credentials-2.png "Credentials")

12. Scroll up and set **Display Name** to **Azure AD**.

13. Click **Save**.

14. Go to the **Authentication** page. Select **Broser** flow and make sure everything looks like in the screenshot below.

![Authentication screenshot](screenshots/authentication-flow.png "Authentication")

That's it, now you should be able to login with your Azure Active directory.

