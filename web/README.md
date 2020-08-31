# fashionscape - web app


[scape.fashion](https://scape.fashion) is a website built to help players of Old School Runescape find an outfit which makes
them look good (☞ﾟヮﾟ)☞

This repository contains the React app that powers the website. You can find the api at the [fashionscape-api](https://github.com/ncpierson/fashionscape-api) repo.

If you want to work on this project, you can clone the repo:

```bash
git clone https://github.com/ncpierson/fashionscape-web.git
```

If you just want to run the web application, you can use the **docker image**:

```bash
docker pull ncpierson/fashionscape-web
```

Note that this image does require the environment variable `REACT_APP_FASHIONSCAPE_API` to be set.

# Development

Install dependencies:

```bash
yarn
```

Run locally:

```bash
yarn start
```

# Deployment


To deploy a new image to Docker Hub:

```bash
yarn version --patch # --minor, --major also supported
yarn deploy
```

This will push to the `ncpierson/fashionscape-web` docker hub image. However, if you are not `ncpierson`,
I recommend that you make changes to the `./scripts/deploy.sh` file before trying to deploy.
