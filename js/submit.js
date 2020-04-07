(function ($) {

	"use strict";

	$(document).ready(function () {
		/**
		 * Paper Money simulator submit
		*/
		$("#exchange").on('submit', e => {
			e.preventDefault();

			const query = $('#exchange').serialize();
			const currencyCode = window.exchange.value;
			const merchantId = window.merchant.value;
			const url = `https://iamsimple.com.br/cambio/app/checkout/paper-money?${query}&agentId=${merchantId}&productId=${currencyCode}`;
			window.open(url, '_blank');
		});

		/** 
		 * Remittance simulator submit
		*/
		$("#remittance").on('submit', e => {
			e.preventDefault();
			const query = $('#remittance').serialize();
			const currencyCode = window.remittance.value;
			const purposeCode = window.beneficiary.value;
			const remittanceType = window.remittanceType.value;
			const url = `https://iamsimple.com.br/cambio/app/checkout/remittance?remittance=true&${query}&purposeCode=${purposeCode}&currencyCode=${currencyCode}&remittanceType=${remittanceType}`;
			window.open(url, '_blank');
		});

	}); // End document ready

})(jQuery);
