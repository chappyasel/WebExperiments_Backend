# Web Experiments Backend

## Intro

Web Experiments backend is a monorepo for my [AWS EB](https://aws.amazon.com/elasticbeanstalk)-hosted online portfolio website along with Node / Express / PHP / MySQL backends for various other personal projects including [Weightlifting App](https://apps.apple.com/us/app/id1266077653) and ESPN Fantasy Football stats.

Currently, I am in the process of deprecating my PHP / MySQL backend in favor of a AWS EB app running Node / Express with DynamoDB and S3 as my storage components. I previously had my backend running on a Linux instance managed by GoDaddy but I decided to convert to AWS due to reliability and cost benefits.

## Contents

### Online Portfolio

My portfolio website was written using [React](https://reactjs.org). This was previously done using Vue.js, although as my website continuous to expand React will become more and more useful, particularly in terms of code reuse and modularization. I also have nearly all my website's data stored as JSON files which allows me to easily update my projects, contact info etc. and integrates perfectly with React.

- Home page: [www.chappyasel.com](http://chappyasel.com)

### Weightlifting App

While I have a decent amount of functionality already available in my Weightlifting App PHP API, I made the decision to switch to Express / Node.js for its vibrant developer community and plethora of helpful libraries. As I stated above, I am currently in the process of rewriting my API in JavaScript accessing a DynamoDB database instead of MySQL.

Eventually, I plan to support a variety of features in my Weightlifting API, including user creation / querying / updating / deletion, leaderboard querying, social features, and more.

### Liar's Dice

[Liar's Dice](https://en.wikipedia.org/wiki/Liar%27s_dice) is a dice game that combines luck and skill as one must weigh probabilities with the game theory involved in predicting the decisions of other intellegent actors. I developed a simple tool to assist in deriving probabilities for each hand to aid in decision-making. This is exposed both as a simple React webpage as well as an API accessible by posting a POST request `/api/v1/liarsdice/play`

- Demo: [www.chappyasel.com/liarsdice](http://chappyasel.com/liarsdice)

### ESPN Fantasy Football

The ESPN Fantasy Football season has recently begun and I've been interested in all the [IBM Watson](https://www.ibm.com/sports/fantasy) fantasy football insights ESPN has integrated in the past two years. While they have integrated these insignts to some extent, I think there is a lot of comparative and predictive functionality that is still missing.

Because of this, I have decided to start working on a web app / API that can be used to unlock deeper insights into player performance predictions along with a more accurate 'win probability' system that puts these predictions to use. Right now, I am working on reverse-engineering the ESPN Fantsy Football API and IBM Watson fantasy football insight system to use in my own web app. I am hoping that eventually I can create a supirior predictions system that shows win probability over time along with better player comparison tools, allowing fantasy football players to perform better in their leagues.

- Projections: [/api/fantasy/v1/projections](http://chappyasel.com/api/fantasy/v1/projections)

## Dependency Installation

```bash
npm install && (cd client && npm install)
```

## Run

### Development

To run the Express backend (exposed via `localhost:3000`):

```bash
npm run start-server-dev
```

To run the React frontend (exposed via `localhost:8081`):

```bash
npm run start-client-dev
```

To run both simultaneously (same ports as above; client running detached):

```bash
npm run start-dev

# to stop the detached client
npm run stop-dev
```

### Production

```bash
npm run build && npm run start
```

### AWS Elastic Beanstalk Deployment

```bash
npm run deploy
```

## Setup

Add the following files to this project:

`/shared/auth/keys.ts`

```ts
export const AWS_CONFIG = {
  remote: {
    accessKeyId: 'XXXXXXXXXXXXXXXXXXXX',
    secretAccessKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    region: 'us-east-1',
  },
  cognito: {
    userPoolId: 'us-east-1_xxxxxxxxx',
    clientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
}
```

`/api/util/access/keys.ts`

```ts
export = {
  HEADERS: {
    INTERNAL: '<internal>',
    INTERNAL_DEVICE_ID: '<internal-device-id>',
  },
  INTERNAL_DEVICE_IDS: new Set([
    '<device uuid>', // device description
    ...
  ]),
}

```

`/api/util/apns/keys.ts`

```ts
export = {
  KEY_CERT: '<cert_name.p8>',
  KEY_ID: '<key id>',
  TEAM_ID: '<team id>',
  BUNDLE_IDS: {
    MAIN: '<com.company.app>',
    INTERNAL: '<com.company.app.internal>',
  },
  DEV_DEVICE_TOKENS: [
    '<dev device token>', // device description
    ...
  ],
}
```

`/config/notif_cert.p8`

- Can be retrieved from Apple for sending notifications via APNS
- See [APNS with Node.js](https://solarianprogrammer.com/2017/02/14/ios-remote-push-notifications-nodejs-backend/)

## Expose Localhost

To expose the active Express backend:

```bash
ngrok http 8081
```

To expose the active Express backend:

```bash
ngrok http 3000 -host-header="localhost:3000"
```
