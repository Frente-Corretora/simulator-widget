// let _$ = $ || jQuery;


class Exchange {

	constructor () {
		this.baseUrl = 'https://api.frentecorretora.com.br'; // API url
		this.correspondentId = 'correspondentId=1'; // Correspondent ID
		this._exchangeData = null;
		this._remittanceData = null;
	}

  // ********* Fetch currencies *********
	async fetchData(agent) {
		let url = `${this.baseUrl}/v1/exchanges/paper-money/currencies`;

		if (agent) {
			url += `/${agent}`;
		}

		if ('fetch' in window) {
			try {
				const response = await fetch(url);
				if (response.ok) {
					this._exchangeData = await response.json();
					return this._exchangeData;
				} else {
					return Promise.reject(response.status);
				}
			} catch (e) {
				console.error(e);
			}
		} else {
			return new Promise((resolve, reject) => {
				_$.getJSON(url, function (result) {
					const data = result;
					this._exchangeData = data;
					resolve(this._exchangeData);
				})
					.fail((jqxhr, textStatus, error) => {
						reject(error);
					});
			})

		}
	}

  // ********* Paper Money request *********
	async fetchPaperMoney(correspondentId, currencyCode, value, reverse = false) {
		let url = `${this.baseUrl}/v1/exchanges/paper-money/quotations/${correspondentId}?currency=${currencyCode}&value=${value}&reverse=${reverse}`;
		if ('fetch' in window) {
			try {
				const response = await fetch(url);
				if (response.ok) {
					this._exchangeData = await response.json();
					return this._exchangeData;
				} else {
					return Promise.reject(response.status);
				}
			} catch (e) {
				console.error(e);
			}
		} else {
			return new Promise((resolve, reject) => {
				_$.getJSON(url, function (result) {
					const data = result;
					this._exchangeData = data;
					resolve(this._exchangeData);
				})
					.fail((jqxhr, textStatus, error) => {
						reject(error);
					});
			})
		}
	}

  // ********* Remittance Request *********
	async fetchRemittanceData(remittanceType = 'outbound', purposeCode = 'IR001', currencyCode, value, reverse = true) {
		let url = '';
		if (reverse) {
			url = `${this.baseUrl}/v1/exchanges/remittance/${remittanceType}/reverse?purposeCode=${purposeCode}&currency=${currencyCode}&${this.correspondentId}&value=${value}`;
		} else {
			url = `${this.baseUrl}/v1/exchanges/remittance/${remittanceType}/?purposeCode=${purposeCode}&currency=${currencyCode}&${this.correspondentId}&value=${value}`;
		}
		if ('fetch' in window) {
			try {
				const response = await fetch(url);
				if (response.ok) {
					this._remittanceData = await response.json();
					return this._remittanceData;
				} else {
					return Promise.reject(response.status);
				}
			} catch (e) {
				console.error(e);
			}
		} else {
			return new Promise((resolve, reject) => {
				_$.getJSON(url, function (result) {
					const data = result;
					this._remittanceData = data;
					resolve(this._remittanceData);
				})
					.fail((jqxhr, textStatus, error) => {
						reject(error);
					});
			})

		}
	}

  // ********* Populate select with all currencies *********
	populateCurrencies(select) {
		if (!this._exchangeData) {
			throw new Error('Data not loaded');
		}

		for (const currency of this._exchangeData) {
			const option = _$(`<li class="mdc-list-item" data-value=${currency.currencyCode} data-text=${currency.currencyName.replace(/ /g, '')} data-icon=${currency.countryFlagUrl}>
					</li>`
			)
				.html(` <img width="22px" src=${currency.countryFlagUrl}></img> &nbsp; ${currency.currencyName}`);
			_$('#paper-money-currencies').append(option);
		}
		window.exchange.selectedIndex = '0'; // Set index 1st
	}

	exchangeInfo(currency) {
		if (!this._exchangeData) {
			throw new Error('Data not loaded');
		}
		return this._exchangeData.find(cur => cur.currencyCode === currency);
	}

}
