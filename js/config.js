const correspondent_id = 1;

const correspondent_identifier = 'frente';

const remittanceData = {
  inbound: {
    label: 'Recebimento',
    value: 'inbound',
    options: [
      { label: 'Outra pessoa', value: 'IR002' },
      { label: 'Eu mesmo', value: 'IR001' },
      { label: 'Eu mesmo - Google AdSense', value: 'ADSENSE' }
    ],
  },
  outbound: {
    label: 'Envio',
    value: 'outbound',
    options: [
      { label: 'Outra pessoa', value: 'IR002' },
      { label: 'Eu mesmo', value: 'IR001' }
    ]
  }
};

const remittanceCurrenciesInbound = [
  { name: 'Dólar Americano', code: 'USD', image: "https://s3.amazonaws.com/frente-exchanges/flags/united-states.svg" },
  { name: 'Euro', code: 'EUR', image: "https://s3.amazonaws.com/frente-exchanges/flags/european-union.svg" },
  { name: 'Libra Esterlina', code: 'GBP', image: "https://s3.amazonaws.com/frente-exchanges/flags/united-kingdom.svg"}
];

const remittanceCurrenciesOutbound = [
  { name: 'Dólar Americano', code: 'USD', image: "https://s3.amazonaws.com/frente-exchanges/flags/united-states.svg" },
  { name: 'Euro', code: 'EUR', image: "https://s3.amazonaws.com/frente-exchanges/flags/european-union.svg" },
  { name: 'Libra Esterlina', code: 'GBP', image: "https://s3.amazonaws.com/frente-exchanges/flags/united-kingdom.svg"}
];
