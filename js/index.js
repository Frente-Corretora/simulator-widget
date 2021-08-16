let _$ = jQuery;

(function ($) {
  'use strict';
  
  // ********* Document Ready *********

  $(document).ready(function () {

    if (typeof window.initSelects === 'function') {
      window.initSelects();
    }

    if (typeof window.merchant === 'undefined') {
      return true;
    }
    
    // Prevent submit form when enter key is pressed
    $(window).keydown(function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        return false;
      }
    });

    // Set time out
    let timerValuePM; // Timer paper money value
    let timerResultPM; // Timer paper money result
    let timerValue; // Timer remittance value
    let timerResult; // Timer remittance result

    // ********* Paper Money listeners *********
    $('ul#state').ready(function () {
      getAgent();
    });

    // Get request if Paper Money tab is active
    window.merchant.listen('MDCSelect:change', () => {
      simulateExchange();
    });

    $('input#paper-money-value').on('change keyup', function () {
      clearTimeout(timerValuePM);
      timerValuePM = setTimeout(() => {
        simulateExchange();
      }, 1200);
    });

    $('input#paper-money-result').on('change keyup', function () {
      clearTimeout(timerResultPM);
      timerResultPM = setTimeout(() => {
        simulateExchange(true);
      }, 1200);
    });

    // Currency selector: Apply flag icon
    window.exchange.listen('MDCSelect:change', () => {
      Array.from($('#exchange-selected-text').children()).forEach((item) => {
        if ($(item).is('img')) {
          $(item).remove();
        }
      })
      Array.from($('#paper-money-currencies').children()).forEach((el, i) => {
        const icon = el.getAttribute('data-icon');
        if ($('#exchange-selected-text').text().replace(/ /g, '') === el.getAttribute('data-text')) {
          Array.from($('#exchange-selected-text').children()).forEach((item) => {
            if ($(item).is('img')) {
              $(item).remove();
            }
          })
          $('#exchange-selected-text').prepend(`<img style="width: 22px; display: inline-block; margin-left: 12px; vertical-align: middle; margin-right: 7px;" src=${icon} />`);
        }
      })
      $('input#paper-money-value').val(1000);

      simulateExchange();
    })



/**
 * 
 ********************************************************************************************
 * 
*/


    // ********* Remittance listeners *********

    $('select#remittance-beneficiary').ready(function () {
      getBeneficiaries();
    });

    window.beneficiary.listen('MDCSelect:change', () => {
      delayedGetRemittance();      
    });

    // Slide down outbound input - slide up inbound input
    window.remittanceType.listen('MDCSelect:change', () => {
      if (window.remittanceType.value === 'inbound') {
        $('#outbound-down').addClass("outbound-down");
        $('#inbound-up').addClass("inbound-up");
        getInboundCurrencies(); // Get USD, EUR , GBP.
        setBeneficiaries('inbound');
        delayedGetRemittance(true, true);
      } else {
        $('#outbound-down').removeClass("outbound-down").addClass("transition-up");
        $('#inbound-up').removeClass("inbound-up").addClass("transition-up");
        getOutboundCurrencies(); // Get USD, EUR.
        setBeneficiaries('outbound');
        delayedGetRemittance(false, true);
      }
    });

    $('input#remittance-value').on('keyup', function () {
      clearTimeout(timerValue);
      timerValue = setTimeout(() => {
        delayedGetRemittance();
      }, 1200);
    });

    $('input#remittance-result').on('keyup', function () {
      clearTimeout(timerResult);
      timerResult = setTimeout(() => {
        delayedGetRemittance(false);
      }, 1200);
    })

    // Currency selector: Apply flag icon
    window.remittance.listen('MDCSelect:change', () => {
      Array.from($('#remittance-selected-text').children()).forEach((item) => {
        if ($(item).is('img')) {
          $(item).remove();
        }
      });

      Array.from($('#remittance-currencies').children()).forEach((el, i) => {
        const icon = el.getAttribute('data-icon');
        if ($('#remittance-selected-text').text().replace(/ /g, '') === el.getAttribute('data-text')) {
          $('#remittance-selected-text').prepend(`<img style="width: 22px; display: inline-block; margin-left: 12px; vertical-align: middle; margin-right: 7px;" src=${icon} />`);
        }
      });
      delayedGetRemittance();
    })
  });
  

})(jQuery);


