let remittanceRequestTimer;

function delayedGetRemittance(reverse) {
  clearTimeout(remittanceRequestTimer);
  remittanceRequestTimer = setTimeout(() => {
    getRemittanceData(reverse)
  }, 1)
}


/**
 * 
 ********************************************************************************************
 * 
*/


// ********* Remittance Simulation *********
async function getRemittanceData(reverse = true) {
  $('#remittance-action-btn').attr('disabled', true);
  let purposeCode = window.beneficiary.value;
  let remittanceType = window.remittanceType.value;
  let remittanceBRLValue = '';

  // Reverse route
  if (!reverse) {
    remittanceBRLValue = $('input#remittance-result').val();
  } else {
    remittanceBRLValue = $('input#remittance-value').val();
  }

  const currencyCode = window.remittance.value;

  $('label#currency-symbol-remittance-value').html(currencyCode);
  const value = transformToInteger(remittanceBRLValue, 4);

  if (remittanceType === '') {
    remittanceType = undefined;
  }

  if (purposeCode === '') {
    purposeCode = undefined;
  }

  const { currency, offer, maxValue, price, tax: { iof }, total, clamp, bankFeeBRL } = await exchange.fetchRemittanceData(remittanceType, purposeCode, currencyCode, value, reverse);

  const remittanceMaxValue = maxValue;
  const outboundMinValue = currency.minValueOutbound;
  const inboundMinValue = currency.minValueInbound;
  const currencyCodeRemittance = currency.currencyCode;

  //-- Validate: Clamp method- min and max values for OUTBOUND and INBOUND.

  // Outbound: 
  if (remittanceType === 'outbound' && clamp === "MINIMUM") {
    $('input#remittance-value').val(outboundMinValue);
    // alert("O valor mínimo de envio é de $$$");
    M.toast({ html: 'O valor mínimo de envio é de ' + currencyCodeRemittance + ' ' + outboundMinValue });
  } else if (remittanceType === 'outbound' && clamp === "MAXIMUM") {
    $('input#remittance-value').val(remittanceMaxValue);
    M.toast({ html: 'O valor máximo de envio é de ' + currencyCodeRemittance + ' ' + remittanceMaxValue });
  }

  // Inbound
  if (remittanceType === 'inbound' && clamp === "MINIMUM") {
    $('input#remittance-value').val(outboundMinValue);
    M.toast({ html: 'O valor mínimo de recebimento é de ' + currencyCodeRemittance + ' ' + inboundMinValue });
  } else if (remittanceType === 'inbound' && clamp === "MAXIMUM") {
    $('input#remittance-value').val(remittanceMaxValue);
    M.toast({ html: 'O valor máximo de recebimento é de ' + currencyCodeRemittance + ' ' + remittanceMaxValue });
  }


  if (reverse) {
    simulateRemittance(offer, iof, reverse);
  } else {
    simulateRemittance(total.withTax, iof, reverse);
  }

  // Fee infos for remittance 
  if (window.remittanceType.value === 'outbound') {
    populateQuotation(price.rawValueOutbound.value / price.rawValueOutbound.divisor);
  } else {
    populateQuotation(price.rawValueInbound.value / price.rawValueInbound.divisor);
  }

  populateVet(price.withTax.value / price.withTax.divisor);
  if (typeof bankFeeBRL === 'undefined') {
    $('span#bankFeelBRL').html('0,00');
  } else {
    populateBankFeelBRL(bankFeeBRL.value / bankFeeBRL.divisor);
  }

}

function populateQuotation(quoatation) {
  $('span#priceWithoutTax').html(quoatation);
}

function populateVet(vet) {
  $('span#priceWithTax').html(vet);
}

function populateBankFeelBRL(bankFeeBRL) {
  $('span#bankFeelBRL').html(bankFeeBRL);
}


function simulateRemittance(offer, iof, reverse) {
  if (!exchange) {
    return;
  }

  const convertedValue = (offer.value / offer.divisor);
  if (reverse) {
    $('input#remittance-result').val(convertedValue.toFixed(2));
  } else {
    $('input#remittance-value').val(convertedValue.toFixed(2));
  }

  const iofPercentage = iof.percentage;
  const iofValue = (iof.total.value / iof.total.divisor);

  $('span#remittance-iof').html(iofPercentage);
  $('span#remittance-with-iof').html(iofValue.toFixed(2));

  $('#remittance-action-btn').removeAttr('disabled');
}


// Populate beneficiares and remittance types on select
function getBeneficiaries() {

  const remittanceOptions = [
    { label: 'Eu mesmo', value: 'IR001' },
    { label: 'Outra pessoa', value: 'IR002' }
  ];

  const remittanceType = [
    { label: 'Envio', value: 'outbound' },
    { label: 'Recebimento', value: 'inbound' }

  ];

  for (const option of remittanceOptions) {
    const result = $(`<li class="mdc-list-item" data-value=${option.value} data-text=${option.label}></li>`)
      .html(option.label);

    $('#remittance-beneficiary').append(result);
  }

  for (const option of remittanceType) {
    const result = $(`<li class="mdc-list-item" data-value=${option.value} data-text=${option.label}></li>`)
      .html(option.label);

    $('#remittance-type').append(result);
  }

  window.beneficiary.selectedIndex = '1';
  window.remittanceType.selectedIndex = '0';

  delayedGetRemittance();
}

// Populate currencies for Outbound type (USD, EUR)
function getOutboundCurrencies () {
  const remittanceCurrenciesOutbound = [
    { currencyName: 'Dólar Americano', currency: 'USD', image: "https://s3.amazonaws.com/frente-exchanges/flags/united-states.svg" },
    { currencyName: 'Euro', currency: 'EUR', image: "https://s3.amazonaws.com/frente-exchanges/flags/european-union.svg" }
  ];

  ($('#remittance-currencies').children().remove());

  for (const currency of remittanceCurrenciesOutbound) {
    const remittanceCurrenciesOutbound = $(
      `<li class="mdc-list-item" data-value=${currency.currency} data-text=${currency.currencyName.replace(/ /g, '')} data-icon=${currency.image}>
      </li>`
    )
      .html(` <img width="22px" src=${currency.image}></img> &nbsp; ${currency.currencyName}`);

    $('#remittance-currencies').append(remittanceCurrenciesOutbound);
  }

  delayedGetRemittance();
  window.remittance.selectedIndex = '0';
}

// Populate currencies for Inboud type (USD, EUR, GBP)
function getInboundCurrencies() {

  
  const remittanceCurrenciesInbound = [
    { currencyName: 'Dólar Americano', currency: 'USD', image: "https://s3.amazonaws.com/frente-exchanges/flags/united-states.svg" },
    { currencyName: 'Euro', currency: 'EUR', image: "https://s3.amazonaws.com/frente-exchanges/flags/european-union.svg" },
    { currencyName: 'Libra Esterlina', currency: 'GBP', image: "https://s3.amazonaws.com/frente-exchanges/flags/united-kingdom.svg"}
  ];

  ($('#remittance-currencies').children().remove());

  for (const currency of remittanceCurrenciesInbound) {
      const remittanceCurrenciesInbound = $(
      `<li class="mdc-list-item" data-value=${currency.currency} data-text=${currency.currencyName.replace(/ /g, '')} data-icon=${currency.image}>
      </li>`
    )
      .html(` <img width="22px" src=${currency.image}></img> &nbsp; ${currency.currencyName}`);

    $('#remittance-currencies').append(remittanceCurrenciesInbound);

  }

  delayedGetRemittance();
  window.remittance.selectedIndex = '0';
  
}