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

// const aggTrade = client.aggTradeWS('bnbusdt', callbacks);

// setTimeout(() => client.unsubscribe(aggTrade), 3000)
const combineStreams = client.combinedStreams(['bnbusdt@aggTrade', 'bnbusdt@depth5@100ms'], callbacks)
setTimeout(() => client.unsubscribe(combineStreams), 3000)