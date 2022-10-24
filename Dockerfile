FROM keymetrics/pm2:12-slim

COPY src src/
COPY package.json .
COPY webpack.config.js .
COPY pm2.json .

RUN yarn install
RUN yarn build

CMD [ "pm2-runtime", "start", "pm2.json" ]