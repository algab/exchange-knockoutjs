function ExchangeViewModel() {
    var self = this;

    self.coins = [
        {id: 'AUD', name: 'AUD - Dólar Australiano'},
        {id: 'BRL', name: 'BRL - Real Brasileiro'},
        {id: 'CAD', name: 'CAD - Dólar Canadense'},
        {id: 'EUR', name: 'EUR - Euro'},
        {id: 'GBP', name: 'GBP - Libra Esterlina'},
        {id: 'JPY', name: 'JPY - Iene Japonês'},
        {id: 'MXN', name: 'MXN - Peso Mexicano'},
        {id: 'USD', name: 'USD - Dólar Americano'},
    ];

    self.coinSource = ko.observable();
    self.coinReceiver = ko.observable();
    self.value = ko.observable();
    self.result = ko.observable();
    self.loading = ko.observable(false);

    self.changeCoin = function () {
        let source = self.coinSource();
        let receiver = self.coinReceiver();
        self.coinReceiver(source);
        self.coinSource(receiver);
    };

    self.submit = function () {
        self.loading(true);
        fetch(`https://api.ratesapi.io/api/latest?base=${self.coinSource()}`)
        .then(async (resp) => {
            const body = await resp.json();
            const intl = new Intl.NumberFormat('en').format(self.value());
            const result = parseFloat(intl) * body.rates[self.coinReceiver()];

            if (self.coinReceiver() === 'AUD') {
                self.result(`A$ ${result.toFixed(2)}`);
            } else if (self.coinReceiver() === 'BRL') {
                self.result(`R$ ${result.toFixed(2)}`);
            } else if (self.coinReceiver() === 'CAD') {
                self.result(`C$ ${result.toFixed(2)}`);
            } else if (self.coinReceiver() === 'EUR') {
                self.result(`€ ${result.toFixed(2)}`);
            } else if (self.coinReceiver() === 'GBP') {
                self.result(`£ ${result.toFixed(2)}`);
            } else if (self.coinReceiver() === 'JPY') {
                self.result(`¥ ${result.toFixed(2)}`);
            } else if (self.coinReceiver() === 'MXN') {
                self.result(`$ ${result.toFixed(2)}`);
            } else {
                self.result(`US$ ${result.toFixed(2)}`);
            }

            self.loading(false);
        }).catch(() => self.loading(false));
    };
};

ko.applyBindings(new ExchangeViewModel(), document.querySelector("#app"));
