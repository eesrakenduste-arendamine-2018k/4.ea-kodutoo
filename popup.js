document.addEventListener('DOMContentLoaded', function() {
	localizeHtmlPage();
	chrome.storage.sync.get({
		defaultBaseCurrency: 'eur',
		rates: {}
	}, function(items){
		if (!items || !items.receiveDateTime || Math.abs(new Date() - items.receiveDateTime)>3600000) {
			getRates(function(response) {
				response.receiveDateTime = new Date();

				chrome.storage.sync.set({
					rates: response
				}, function(){
					init(items.defaultBaseCurrency, response.rates);
				});
			}, function(errorMessage) {
				renderError(errorMessage);
			});
		} else {
			init(items.defaultBaseCurrency, items.rates);
		}
	});
});
  
function init(defaultBaseCurrency, rates){
	Vue.filter('toUpper', function (value) {
		return value.toUpperCase();
	});
	Vue.filter('currencyDisplay', function(val) {
			return !val || isNaN(val) ? '-' : parseFloat(val).formatMoney(2, '.', ',')
		}
	);
	
	var model = new Vue({
		el: '#container',
		data: {
			currencies:[
				{id:'eur', icon:'flags/eur.png', value: '', symbol:'&#x20ac;', rate: 1.0},
				{id:'usd', icon:'flags/usd.png', value: '', symbol:'&#x24;', rate: rates['USD']},
				{id:'gbp', icon:'flags/gbp.png', value: '', symbol:'&#xa3;', rate: rates['GBP']},
				{id:'rub', icon:'flags/rub.png', value: '', symbol:'<s>Ð</s>', rate: rates['RUB']},
				{id:'cny', icon:'flags/cny.png', value: '', symbol:'&#xa5;', rate: rates['CNY']}
			],
			baseValue: '',
			baseCurrency: {},
		},
		methods: {
			baseCurrencyChanged: function(event) {
				this.changeBaseCurrency(event.target.id);
			},
			changeBaseCurrency: function(id) {
				this.baseCurrency = this.currencies.filter(function(item){
					return item.id == id;
				})[0];
			},
			recalculate: function() {
				for (var i=0; i<this.currencies.length; i++) {
					this.currencies[i].value = !this.baseValue || isNaN(this.baseValue) ? '-' :
						this.currencies[i].rate * parseFloat(this.baseValue) / this.baseCurrency.rate;
				}
			},
			keyup: function(t){
				if (this.baseValue.length>=8) this.baseValue = this.baseValue.slice(0, -1);
			}
		}
	});
	model.changeBaseCurrency(defaultBaseCurrency);
	document.getElementById(defaultBaseCurrency).checked = true;
	model.recalculate();
	
	model.$watch('baseValue', function(){
		this.recalculate();
	});
	model.$watch('baseCurrency', function(){
		this.recalculate();
	});
	
	document.getElementById('overlay').style['display'] = 'none';
}

function getRates(callback, errorCallback) {
  var searchUrl = 'http://api.fixer.io/latest?symbols=USD,GBP,RUB,CNY';
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  x.responseType = 'json';
  x.onload = function() {
	var response = x.response;
    if (!response || !response.base || !response.date || !response.rates) {
      errorCallback(chrome.i18n.getMessage("notAbleLoad"));
	  return;
    }
    callback(response);
  };
  x.onerror = function() {
    errorCallback(chrome.i18n.getMessage("notAbleLoad"));
  };
  x.send();
}

function renderError(statusText) {
  console.log(statusText);
  document.getElementById('overlay').innerHTML = "<div><p><em>" + statusText + "</em></p></div>";
}

Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
		c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t, 
		s = n < 0 ? "-" : "", 
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
		j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };
