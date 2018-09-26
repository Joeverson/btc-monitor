const dialog = require('dialog')
const axios = require('axios')
const moment = require('moment')

let quark = {
  baseStart: {
    time: 0,
    value: 0
  },
  last: 0,
  count: 0,
  time: ''
}

function alert() {
  const message = `
Aumento: R$ ${((quark.last - quark.baseStart.value) * 4.03).toFixed(2)} desde ${quark.baseStart.time}
USD: $ ${(quark.last).toFixed(2)}
BRL: R$ ${(quark.last * 4.03).toFixed(2)}`
  dialog.warn(message, 'BTC Avanço', () => {

  });
}

function seeBTC() {
  axios.get('https://blockchain.info/ticker').then(result => {
    quark.time = moment().format('HH:mm:ss DD/MM/YYYY');

    if (quark.last < result.data.USD.last) {
      // colocando o primeiro valor para calcular quanto subiu
      if (quark.last == 0) {
        quark.baseStart.value = result.data.USD.last
        quark.baseStart.time = moment().format('DD/MM/YYYY HH:mm:ss')
      }
      // atualizando o ultimo valor
      quark.last = result.data.USD.last;

      quark.count++;
    }

    if (quark.count > 10) {
      alert();

      // zerando os valores
      quark.count = 0;
      quark.last = 0;
      quark.baseInit = 0;
    }
  })
}

/**
* runner the listem BTC
*/
setInterval(() => {
  seeBTC()
}, 10000)
