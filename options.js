// Saves options to chrome.storage.sync.
function save_options() {
  var currency = document.querySelector('input[name="baseCurrency"]:checked').value;

  chrome.storage.sync.set({
    defaultBaseCurrency: currency,
  }, function() {
	showStatus(chrome.i18n.getMessage("optionsSaved"), false);
  });
}

function restore_options() {
	chrome.storage.sync.get({
		defaultBaseCurrency: 'eur'
	}, function(items) {
		Vue.filter('toUpper', function (value) {
			return value.toUpperCase();
		});
		var model = new Vue({
			el: '#list',
			data: {
				currencies:[
					{id:'eur', icon:'flags/eur.png'},
					{id:'usd', icon:'flags/usd.png'},
					{id:'gbp', icon:'flags/gbp.png'},
					{id:'rub', icon:'flags/rub.png'},
					{id:'cny', icon:'flags/cny.png'}
				],
				baseCurrency: 'eur',
			},
			methods: {
				changeBaseCurrency: function(id) {
					this.baseCurrency = this.currencies.filter(function(item){
						return item.id == id;
					})[0];
				}
			}
		});
		model.changeBaseCurrency(items.defaultBaseCurrency);
		document.getElementById(items.defaultBaseCurrency).checked = true;
	});
}

function showStatus(message, isError) {
    var status = document.getElementById('status');
	status.style.background = isError ? '#f2dede' : '#dff0d8';
    status.textContent = message;
    setTimeout(function() { 
		status.textContent = ''; 
	}, isError ? 3000 : 1000);
}

document.addEventListener('DOMContentLoaded', function() {
	localizeHtmlPage();
	document.getElementById('save').addEventListener('click', save_options);
	restore_options();
});