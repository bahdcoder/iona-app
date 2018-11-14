# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

# When a server is created, here's what happens (in the userdata):

- Install the selected databases
- Install nginx
- Install NODE VERSION MAANAGER

# When a site is created, here's what happens:

- Ssh into the server
- Add an nginx configuration for the new site, and for the subdomain for site preview.
- Add a very beautiful placeholder site that says welcome. It's a basic HTML file .


# When a new github repository is added and first deployment is launched, here's what happens:

- Ssh into the server
- Visit the folder for apps
- Delete the temporary placeholder site
- If it is first deployment, generate SSH KEY-PAIR, make a curl request to github to add this key to user account.
- Git clone the site.
