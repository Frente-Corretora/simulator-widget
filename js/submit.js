(function ($) {

	"use strict";

	$(document).ready(function () {
		/**
		 * Paper Money Simulator Submit
		*/
		$("#exchange").on('submit', e => {
			e.preventDefault();

			const query = $('#exchange').serialize();
			const currencyCode = window.exchange.value;
			const merchantId = window.merchant.value;
			const url = `https://iamsimple.com.br/${correspondent_identifier}/?simulator=paperMoney&${query}&receiveMerchantId=${merchantId}&receiveCurrency=${currencyCode}`;
			window.open(url, '_blank');
		});

		/** 
		*Remittance Simulator Submit
		*/
		$("#remittance").on('submit', e => {
			e.preventDefault();
			const query = $('#remittance').serialize();
			const currencyCode = window.remittance.value;
			const purposeCode = window.beneficiary.value;
			const remittanceType = window.remittanceType.value;
			const url = `https://iamsimple.com.br/${correspondent_identifier}/?simulator=remittance&${query}&receivePurposeCode=${purposeCode}&receiveCurrency=${currencyCode}&remittanceType=${remittanceType}`;
			window.open(url, '_blank');
		});

	}); // End document ready

})(jQuery);
