### Dependency

project depend on node, cnpm and other 3rd-party lib

#### node

download node@8.11.2 binary to your computer and add bin path to your environment

#### cnpm

`npm install -g cnpm --registry=https://registry.npm.taobao.org`

#### other 3rd-party lib

`cnpm install`

### Build & Launch Server

`cnpm run build-client && cnpm run build-server && cnpm run server`

>also support `dev-client` `dev-server` command to use in develop progress

### FQA

#### run `dev-server` command error: [nodemon] Internal watch failed: watch /path/to/server_source ENOSPC

`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
