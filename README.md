# fashionscape-api

[scape.fashion](https://scape.fashion) is a website built to help players of Old School Runescape find an outfit which makes
them look good (&nbsp;☞ﾟ&nbsp;ヮﾟ&nbsp;)&nbsp;☞

This repository contains the Node/Express application that powers the api. You can find the web application at the
[fashionscape-web](https://github.com/ncpierson/fashionscape-web) repo.

If you want to work on this project, you can clone the repository:

```bash
git clone https://github.com/ncpierson/fashionscape-api.git
```

If you just want to run the api, you can pull the **docker image**:

```bash
docker pull ncpierson/fashionscape-api
```

# Development

To start the application locally with Docker, run:

```bash
yarn start
```

This will mount the `./src/` and `./data/` directories to the container, so that any changes you make will be reflected
on the server without restarting it.

To stop the docker container:

```bash
yarn stop
```

# Deployment

To deploy a new image to Docker Hub:

```bash
yarn version --patch # --minor, --major also supported
yarn deploy
```

This will push to the `ncpierson/fashionscape-api` docker hub image. However, if you are not `ncpierson`,
I recommend that you make changes to the `./scripts/deploy.sh` file before trying to deploy.

# Documentation

All routes begin with the base url: `https://api.scape.fashion`.

## GET /colors/:color

This route takes a parameter `color` which can be any 6-digit hex code. Note that this parameter must be URI encoded. For example, looking up matching items for #C4C3C4 would be `/colors/%23C4C3C4`. [Try it out](https://api.scape.fashion/colors/%23C3C4C3)

## GET /items/:item

This route takes a parameter `item` which can be the name of any item known by the API. You can find a list of these items at `/items/`. Note that this parameter must be URI encoded. For example, looking up items matching "Gnome scarf" would be `/items/Gnome%20scarf`. [Try it out](https://api.scape.fashion/items/Gnome%20scarf)

## GET /items

This route will return the list of all items. [Try it out](https://api.scape.fashion/items)
