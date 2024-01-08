(function ($) {
	"use strict";

	const formatValueForQueryPattern = (queryString) => {
		const params = new URLSearchParams(queryString);
	
		const formattedQueryString = Array.from(params.entries())
			.map(([key, value]) => {
				if (/^\d+(\.\d+)?$/.test(value) && !key.includes('foreignCurrency')) {
					const formattedValue = value.includes('.') ? value.replace('.', '') : value + '00';
					return `${key}=${formattedValue}`;
				}
				return null;
			})
			.filter((entry) => entry !== null) 
			.join('&');
	
		return formattedQueryString;
	};
	

	$(document).ready(function () {
		/**
		 * Paper Money Simulator Submit
		*/
		$("#exchange").on('submit', e => {
			e.preventDefault();

			const query = $('#exchange').serialize();
			const currencyCode = window.exchange.value;
			const merchantId = window.merchant.value;
			const url = `https://iamsimple.com.br/${correspondent_identifier}/?simulator=paper-money&${formatValueForQueryPattern(query)}&receiveMerchantId=${merchantId}&currencyCode=${currencyCode}`;
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
			const url = `https://iamsimple.com.br/${correspondent_identifier}/?simulator=remittance&${formatValueForQueryPattern(query)}&receivePurposeCode=${purposeCode}&currencyCode=${currencyCode}&remittanceType=${remittanceType}&reverse=true`;
			window.open(url, '_blank');
		});

	}); // End document ready

})(jQuery);
