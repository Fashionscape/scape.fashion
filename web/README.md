# fashionscape - web app

This directory contains the React app that powers the website. You can find the
API docs in the `api/` directory instead.

If you just want to run the web application, you can use the **docker image**:

```bash
docker pull ncpierson/fashionscape-web
```

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
