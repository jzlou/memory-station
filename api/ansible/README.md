# Ansible playbooks

## Deploying to production

Due to issues with ansible not being able to pull from Github (I've tried so many things), instead copy over app.js files, package.json, process.json (if using pm2), and run yarn to build package locally. In some ways, this is cleaner in development mode because all the additional git overhead does not need to be transferred, including a commit and auxillary files (like this directory). Additionally, it allows for the .env file to be copied over directly in Ansible, circumventing the need to configure that seperately on the remote. I guess this only really works if environment variables are mostly the same. Or use something like .env.prod vs .env.dev

`yarn run deploy` runs the delpoy.yml playbook

Deploy redeploys new code and rebuilds the application on the server.
TODO: in conjunction with below, deploy should use Docker instead of installing on bare metal.

`yarn run launch` runs the launch.yml playbook

Launching the app on the remote server is intended for first time installation only.
TODO: consider instead copying over key app files, as well as Dockerfile. Then, run and initialize the application inside of Docker. This has the biggest impact in launch, as one does not need to install yarn, node, etc... manually. This could be pulled from Dockerhub. Additionally, I don't think that pulling a Docker image from a remote registry is the best choice, either. It'll be higher bandwidth, and additionally need to manage yet another external server. This is cleaner:

Dev machine <> Remote server

vs

Dev machine <> Github <> Docker Hub
and
Dev machine kicks off ansible <> Remote server <> Docker Hub

Additionally, Docker Hub builds real slow, introducing latency into the development cycle.

## Development
TODO: consider adding a `yarn run develop` or equivalent, which launches a local instance in Docker. Probably don't need to run this through Ansible, but I guess I totally could.
