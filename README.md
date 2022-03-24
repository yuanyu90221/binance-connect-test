# binance-connect-test

Test for [Binance Connect](https://github.com/binance/binance-connector-node)

## 使用流程

先到 [Biance TestNet](https://testnet.binance.vision/) 使用 github 登入

產生 HMAC_SHA256

會產生一組 API_KEY, SECRET_KEY

## 套件安裝

```sh
npm i @biance/connector -S
npm i dotenv -D
```

## 建立 .env

```sh
touch .env
```
## 填入環境參數

把剛剛申請完 API_KEY, SECRET_KEY 填入

```env
API_KEY=
SECRET_KEY=
WS_URL=wss://testnet.binance.vision/ws
```
## 程式碼

```js
const dotenv = require('dotenv');
const { Spot } = require('@binance/connector');
const result = dotenv.config();
const { API_KEY, SECRET_KEY, WS_URL } = result.parsed
const client = new Spot(API_KEY, SECRET_KEY, {
  WS_URL
});

const callbacks = {
  open: () => client.logger.log('open'),
  close: () => client.logger.log('closed'),
  message: (data) => client.logger.log(data),
};

const aggTrade = client.aggTradeWS('bnbusdt', callbacks);

setTimeout(() => client.unsubscribe(aggTrade), 3000)

```

## 成功畫面

![](https://i.imgur.com/A3mCY5y.png)