const correspondent_id = 1;

const correspondent_identifier = 'frente';

const remittanceData = {
  inbound: {
    label: 'Recebimento',
    value: 'inbound',
    options: [
      { label: 'Outra pessoa', value: 'MAINTENANCE' },
      { label: 'Eu mesmo', value: 'AVAILABILITY' },
      { label: 'Eu mesmo - Google AdSense', value: 'ADSENSE' }
    ],
  },
  outbound: {
    label: 'Envio',
    value: 'outbound',
    options: [
      { label: 'Outra pessoa', value: 'MAINTENANCE' },
      { label: 'Eu mesmo', value: 'AVAILABILITY' },
      { label: 'Pagamento de Serviços', value: 'SERVICES' }
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
  { name: 'Libra Esterlina', code: 'GBP', image: "https://s3.amazonaws.com/frente-exchanges/flags/united-kingdom.svg"},
  { name: 'Dólar Australiano', code: 'AUD', image: "https://s3.amazonaws.com/frente-exchanges/flags/australia.svg"},
  { name: 'Dólar Canadense', code: 'CAD', image: "https://s3.amazonaws.com/frente-exchanges/flags/canada.svg"}
];
