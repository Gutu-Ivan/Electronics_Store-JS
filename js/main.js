'use strict';

function render() {
	const productsStore = localStorageUtil.getProducts();

	productsPage.render(productsStore.length);
	shoppingPage.render(productsStore.length);
	checkoutPage.render();
}
spinnerPage.render();

let CATALOG = [];

fetch('catalog.json')
    .then(res => res.json())
    .then(body => {
		CATALOG = body;

		setTimeout(() => {
			spinnerPage.handleClear();
			render();
		}, 1000);
    })
    .catch(() => {
        spinnerPage.handleClear();
    })
