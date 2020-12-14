let remittanceRequestTimer;

function delayedGetRemittance(reverse, slide) {
  clearTimeout(remittanceRequestTimer);
  remittanceRequestTimer = setTimeout(() => {
    getRemittanceData(reverse, slide)
  }, 1)
}


/**
 * 
 ********************************************************************************************
 * 
*/


// ********* Remittance Simulation *********
async function getRemittanceData(reverse = true, slide = false) {
  _$('#remittance-action-btn').attr('disabled', true);
  let purposeCode = window.beneficiary.value;
  let remittanceType = window.remittanceType.value;
  let remittanceBRLValue = '';
  
  if (purposeCode === 'SERVICES') {
    _$('span#IR').show()
  } else {
    _$('span#IR').hide()
  }

  // Reverse route
  if (!reverse) {
    remittanceBRLValue = _$('input#remittance-result').val();
  } else {
    remittanceBRLValue = _$('input#remittance-value').val();
  }

  const currencyCode = window.remittance.value;

  _$('label#currency-symbol-remittance-value').html(currencyCode);
  const value = transformToInteger(remittanceBRLValue, 2);

  if (remittanceType === '') {
    remittanceType = undefined;
  }

  if (purposeCode === '') {
    purposeCode = undefined;
  }

  const {
    currency: {
      code,
      minValue,
      maxValue,
      offer,
      price,
      levelingRate
    },
    tax: {
      iof,
      bankFee
    },
    total: {
      withTax
    },
    clamp
  } = await exchange.fetchRemittanceData(remittanceType, purposeCode, currencyCode, value, reverse);

  const minValueRemittance = minValue;
  const maxValueRemittance = maxValue;
  const currencyCodeRemittance = code;
  const brlValue = withTax.value / withTax.divisor;


  //-- Validate: Clamp method- min and max values for OUTBOUND and INBOUND.

  // Outbound: 
  if (remittanceType === 'outbound' && clamp === "MINIMUM") {
// 	const valueBrl = withTax.value / withTax.divisor;
    _$('input#remittance-value').val(brlValue);
    M.toast({ html: 'O valor mínimo de envio é de ' + currencyCodeRemittance + ' ' + minValueRemittance });
  } else if (remittanceType === 'outbound' && clamp === "MAXIMUM") {
    _$('input#remittance-value').val(brlValue);
    M.toast({ html: 'O valor máximo de envio é de ' + currencyCodeRemittance + ' ' + maxValueRemittance });
  }

  // Inbound
  if (remittanceType === 'inbound' && clamp === "MINIMUM") {
    _$('input#remittance-value').val(minValue);
    M.toast({ html: 'O valor mínimo de recebimento é de ' + currencyCodeRemittance + ' ' + minValueRemittance });
  } else if (remittanceType === 'inbound' && clamp === "MAXIMUM") {
    _$('input#remittance-value').val(maxValue);
    M.toast({ html: 'O valor máximo de recebimento é de ' + currencyCodeRemittance + ' ' + maxValueRemittance });
  }


  if (slide) {
    // moeda estrangeira
    simulateRemittance(offer, iof, true);
    // real
    simulateRemittance(withTax, iof, false);
    // codigo bom
  } else {
    if (reverse) {
      simulateRemittance(offer, iof, reverse);
    } else {
      simulateRemittance(withTax, iof, reverse);
    }
  }


  // Fee infos for remittance 
  if (window.remittanceType.value === 'outbound') {
    populateQuotation(levelingRate.value / levelingRate.divisor);
  } else {
    populateQuotation(levelingRate.value / levelingRate.divisor);
  }

  populateVet(price.withTax.value / price.withTax.divisor);

  populateBankFeelBRL(bankFee.total.value / bankFee.total.divisor);
  

}

function populateQuotation(quoatation) {
  _$('span#priceWithoutTax').html(quoatation);
}

function populateVet(vet) {
  _$('span#priceWithTax').html(vet);
}

function populateBankFeelBRL(bankFee) {
  _$('span#bankFee').html(bankFee);
}


function simulateRemittance(offer, iof, reverse) {
  if (!exchange) {
    return;
  }

  const convertedValue = (offer.value / offer.divisor);
  if (reverse) {
    _$('input#remittance-result').val(convertedValue.toFixed(2));
  } else {
    _$('input#remittance-value').val(convertedValue.toFixed(2));
  }

  const iofPercentage = iof.percentage;
  const iofValue = (iof.total.value / iof.total.divisor);

  _$('span#remittance-iof').html(iofPercentage);
  _$('span#remittance-with-iof').html(iofValue.toFixed(2));

  _$('#remittance-action-btn').removeAttr('disabled');
}


// Populate beneficiares and remittance types on select
function getBeneficiaries() {  
  for (const option of remittanceData.outbound.options) {
    const result = _$(`<li class="mdc-list-item" data-value=${option.value} data-text=${option.label}></li>`)
      .html(option.label);

    _$('#remittance-beneficiary').append(result);
  }

  const outboundType = _$(`<li class="mdc-list-item" data-value=${remittanceData.outbound.value} data-text=${remittanceData.outbound.label}></li>`)
    .html(remittanceData.outbound.label);
  _$('#remittance-type').append(outboundType);

  const inboundType = _$(`<li class="mdc-list-item" data-value=${remittanceData.inbound.value} data-text=${remittanceData.inbound.label}></li>`)
    .html(remittanceData.inbound.label);
  _$('#remittance-type').append(inboundType);

  window.beneficiary.selectedIndex = '0';
  window.remittanceType.selectedIndex = '0';


  delayedGetRemittance();
}

function setBeneficiaries(type) {
  document.querySelector('#remittance-beneficiary').innerHTML = "";

  for (const option of remittanceData[type].options) {
    const result = _$(`<li class="mdc-list-item" data-value=${option.value} data-text=${option.label}></li>`)
      .html(option.label);

    _$('#remittance-beneficiary').append(result);
  }

  window.beneficiary.selectedIndex = '0';
}

// Populate currencies for Outbound type (USD, EUR)
function getOutboundCurrencies () {
  (_$('#remittance-currencies').children().remove());

  for (const currency of remittanceCurrenciesOutbound) {
    const remittanceCurrenciesOutbound = _$(
      `<li class="mdc-list-item" data-value=${currency.code} data-text=${currency.name.replace(/ /g, '')} data-icon=${currency.image}>
      </li>`
    )
      .html(` <img width="22px" alt="Ilustração da bandeira dos Estados Unidos, indicando a moeda Dólar Americano" src=${currency.image}></img> &nbsp; ${currency.name}`);

    _$('#remittance-currencies').append(remittanceCurrenciesOutbound);
  }

  window.remittance.selectedIndex = '0';
  delayedGetRemittance();
}

// Populate currencies for Inboud type (USD, EUR, GBP)
function getInboundCurrencies() {
  (_$('#remittance-currencies').children().remove());

  for (const currency of remittanceCurrenciesInbound) {
      const remittanceCurrenciesInbound = _$(
      `<li class="mdc-list-item" data-value=${currency.code} data-text=${currency.name.replace(/ /g, '')} data-icon=${currency.image}>
      </li>`
    )
      .html(` <img width="22px" src=${currency.image}></img> &nbsp; ${currency.name}`);

    _$('#remittance-currencies').append(remittanceCurrenciesInbound);

  }

  delayedGetRemittance();
  window.remittance.selectedIndex = '0';
  
}