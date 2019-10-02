# Web Experiments Backend

## Intro

Web Experiments backend is a monorepo for my [AWS EB](https://aws.amazon.com/elasticbeanstalk)-hosted online portfolio website along with MySQL / PHP / Node.js backends for various other personal projects including [Weightlifting App](https://apps.apple.com/us/app/id1266077653) and ESPN Fantasy Football stats. 

Currently, I am in the process of deprecating my PHP / MySQL backend in favor of a AWS EB app running Node.js with DynamoDB and S3 as my storage components. I previously had my backend running on a Linux instance managed by GoDaddy but I decided to convert to AWS due to the reliability benefits.

## Contents

### Online Portfolio

My portfolio website is comprised of a single-page HTML file backed by [Vue.js](https://vuejs.org) and a series of CSS / JSON files. I prefer Vue.js over React JS due to its simplicity and ease-of-use, particularly for single-page applications. Having all of my website data stored in JSON files allows me to easily update my website and integrates perfectly with Vue.js.

### Weightlifting App

While I have a decent amount of funcationality already available in my Weightlifting App PHP API, I made the decision to switch to Node.js for its vibrant developer community and plethora of helpful libraries. As I stated above, I am currently in the process of rewriting my API in JavaScript accessing a DynamoDB database instead of MySQL.

Eventually, I plan to support a variety of features in my Weightlifting API, including user creation / querying / updating / deletion, leaderboard querying, social features, and more.

### ESPN Fantasy Football

The ESPN Fantasy Football season has recently begun and I've been interested in all the [IBM Watson](https://www.ibm.com/sports/fantasy) fantasy football insights ESPN has integrated in the past two years. While they have integrated these insignts to some extent, I think there is a lot of comparative and predictive funcationality that is still missing. [Example](http://chappyasel.com/fantasy/v1/projections)

```
http://chappyasel.com/fantasy/v1/projections
```

Becuase of this, I have decided to start working on a web app / API that can be used to unlock deeper insights into player performance predictions along with a more accurate 'win probability' system that puts these predictions to use. Right now, I am working on reverse-engineering the ESPN Fantsy Football API and IBM Watson fantasy football insight system to use in my own web app. I am hoping that eventually I can create a supirior predictions system that shows win probability over time along with better player comparison tools, allowing fantasy football players to perform better in their leagues.

## Installation

This repo is relatively easy to get running locally since it runs as a [Node.js](https://nodejs.org/en/) backend. To install the repo's dependencies, run `npm install`. Then, to run the app locally, simply run `node app.js` on the command line. 
