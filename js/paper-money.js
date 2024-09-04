// let _$ = $ || jQuery;


let state = 'SP';
const exchange = new Exchange();
const agent = new Agent();


// ********* Fetch Quoatations *********
function updateTicker(vuoriId) {
  'use strict';

  exchange.fetchData(vuoriId)
    .then(response => {
      const data = response;

      exchange.populateCurrencies(_$('#paper-money-currencies'));

      _$('#agentId').val(vuoriId);
      _$("#state").val(_$("#state option:selected").val());

      _$('#exchange-button').removeAttr('disabled');
    })
    .catch(error => {
      console.error(error);
    });
}

// Get Agents
function getAgent() {
  agent.fetchData()
    .then(response => {
      const data = response;
      agent.populateAgent(_$('#state'));
      const val = data[0].vuoriId;
      _$('ul#state').val(val);
      updateTicker(val);
    })
    .catch(error => {
      console.error(error);
    });
}


/**
 * 
 ********************************************************************************************
 * 
*/

// ********* Transform to integer *********
function transformToInteger(num, size) {
  let str = num.toString();
  let decimals;

  if (str.includes(',')) {
    str = str.replace(',', '.');
  }

  decimals = str.includes('.') ? str.split('.')[1].length : 0;

  while (decimals < size) {
    decimals += 1;
    str = `${str}0`;
  }

  return Number(str.replace('.', ''));
}


/**
 * 
 ********************************************************************************************
 * 
*/


// ********* Paper Money Simulation *********
async function simulateExchange(reverse = false) {
  if (!exchange) {
    return;
  }

  let convertedValue = '';
  let value = '';

  if (reverse) {
    value = _$('input#paper-money-result').val()
  } else {
    value = _$('input#paper-money-value').val();
  }

  const valueAsInteger = Math.trunc(value * 100);
  const currencyCode = window.exchange.value;
  const correspondentId = window.merchant.value;

  if (currencyCode === '' || correspondentId === '') {
    return true;
  }

  const { total: { withTax }, rounding, currency, tax, price } = await exchange.fetchPaperMoney(correspondentId, currencyCode, valueAsInteger, reverse);

  const minValue = currency.minToSell;
  const maxValue = currency.maxToSell;
  const multiples = currency.multiples;
  const currencySymbolExchange = currency.code;

  let timer;

  _$('label#currency-symbol-exchange-value').html(currencySymbolExchange);

  //-- Validate: Rounding method - min and max values for PAPER MONEY.

  if (rounding.method === "MINIMUM" && rounding.rounded) { // MINIMUM 
    _$('input#paper-money-value').val(minValue);
    M.toast({ html: 'O valor mínimo de compra para ' + currencyCode + ' é de: ' + minValue });
  } else if (rounding.method === "MAXIMUM" && rounding.rounded) { // MAXIMUM
    _$('input#paper-money-value').val(maxValue);
    M.toast({ html: 'Limite de ' + currencySymbolExchange + ' ' + maxValue + ' excedido! Não é possível realizar transações acima deste valor através da plataforma. Entre em contato com a nosssa mesa de operações para maiores informações ou troque o valor desejado: (11) 9662-75419' });
  } else if (rounding.method === "NORMAL" && rounding.rounded) { // NORMAL
    _$('input#paper-money-value').val(currency.offer);
    M.toast({ html: `Sua quantia foi arredondada pois não é um múltiplo das cédulas disponíveis: ${multiples.map(m => m)}` });
  }

  // Fee infos for paper Money 
  convertedValue = (withTax.value / withTax.divisor);

  const iofValue = (tax.iof.total.value / tax.iof.total.divisor);
  const vetValue = (price.withTax.value / price.withTax.divisor);
  const quoatationValue = (currency.levelingRate.value / currency.levelingRate.divisor);

  // Paper Money result
  _$('input#paper-money-result').val(convertedValue.toFixed(2));

  // Paper Money fee labels
  _$('span#exchange-iof').html(tax.iof.percentage);
  _$('span#exchange-with-iof').html(iofValue.toFixed(2));
  _$('span#vet-exchange').html(vetValue);
  _$('span#quoation-exchange').html(quoatationValue);
}