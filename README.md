# How to Run these files

First Setup mongodb and aws-s3

## Run Server
npm run watch

## Run Faculty
yarn start or yarn run dev

## Run Frontend
yarn start or yarn run dev

## Note
* yarn run dev should be run either in faculty or frontend but not on both
* There are few static ip address change them to your local ips while testing
* while testing across devices chrome doesn't allow http for video calls
  * Go to : chrome://flags/#unsafely-treat-insecure-origin-as-secure
  * Enable the option in both mobile and laptop/system
  * It will ask for url's give access to your local ip's (don't forget to mention port)
