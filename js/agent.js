class Agent {
	constructor() {
		this.baseUrl = `https://api.frentecorretora.com.br`; // API url
		this.correspondent_identifier = 'frente'; // Correspondent id name
		this._agentData = null;
	}

	// ********* Fetch agents *********

	async fetchData() {
		let url = `${this.baseUrl}/v1/correspondents/${this.correspondent_identifier}/agents?orderByLocation=true`;

		if ('fetch' in window) {
			try {
				const response = await fetch(url);
				if (response.ok) {
					this._agentData = await response.json();
					return this._agentData;
				} else {
					return Promise.reject(response.status);
				}
			} catch (e) {
				console.error(e);
			}
		} else {
			return $.getJSON(url, function (result) {
				const data = result;
				this._agentData = data;
				resolve(this._agentData);
			})
				.fail((error) => {
					reject(error);
				});
		}
	}

	// Populate Agent Select
	populateAgent(select) {
		if (!this._agentData) {
			throw new Error('Data not loaded');
		}

		for (const agent of this._agentData) {
			const option = $(`<li class="mdc-list-item" data-value=${agent.vuoriId} data-state=${agent.state}></li>`)
				.html(agent.label);
			$('#state').append(option);
		};
		window.merchant.selectedIndex = '0'; // Set index 1st agent
	}
}
