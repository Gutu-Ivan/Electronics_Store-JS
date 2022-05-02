class Shopping {
    constructor() {
        this.coupons_2k = ['2000coupon_1', '2000coupon_2'];
        this.coupons_10k = ['10000coupon_1', '10000coupon_2'];
        this.total = 0;
    }

    getCoupon() {
        this.coupon = document.getElementById('shopping__coupon').value
    }

    calculateDiscount() {
        let discount = 0;
        if(this.coupons_2k.includes(this.coupon)){
            discount = 2000
            this.total = this.sumCart - discount;
        }
        else if(this.coupons_10k.includes(this.coupon)){
            discount = 10000
            this.total = this.sumCart - discount;
        }
        else{
            this.total = this.sumCart;
        }

        if(this.total <= 0) {
            this.total = 0;
        }

        const htmlTotal = `
        <li>Total <span>$${this.total}</span></li>
        `;
        ROOT_TOTAL.innerHTML = htmlTotal;
    }

    render(count) {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';
        let htmlOrder = '';
        this.sumCart = 0;

        CATALOG.forEach(({ id, name, price, img}) => {
            if (productsStore.indexOf(id) !== -1) {
                this.sumCart += price;
                htmlCatalog += `
                    <tr>
                        <td class="shoping__cart__item">
                            <img src="${img}" width="100px" height="100px" alt="">
                            <h5>${name}</h5>
                        </td>
                        <td class="shoping__cart__price">$${price.toLocaleString()}
                        </td>
                        <td class="shoping__cart__quantity">
                            <div class="quantity">
                                <div class="pro-qty">
                                    <input type="text" value="1" class="product__quantity" onblur="shoppingPage.changeQuantity()">
                                </div>
                            </div>
                        </td>
                        <td class="shoping__cart__total">${this.sumCart.toLocaleString()}
                        </td>
                        <td class="shoping__cart__item__close" onclick="shoppingPage.removeProduct()">
                            <span class="icon_close"></span>
                           </td>
                    </tr>
                `;

                htmlOrder += `
                    <li>${name}<span>$${price.toLocaleString()}</span></li>
                `;
            }
        });

        const html = `
            <div class="shoping__cart__table">
                <table>
                    <thead>
                        <tr>
                            <th class="shoping__product">Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${htmlCatalog}
                    </tbody>
                </table>
            </div>
        `;

        const htmlSum = `
            <li>Subtotal <span id="checkpoint_subtotal">$${this.sumCart}</span></li>                  
        `;

        const htmlCart = `
            <li><a href="#"><i class="fa fa-shopping-bag"></i> <span id="header__count">${count}</span></a></li>
            <div class="header__cart__price">Total: <span id="header__total" ">$${this.sumCart}</span></div>
        `;

        ROOT_CART_ITEMS.innerHTML = html;
        ROOT_CART.innerHTML = htmlSum;
        ROOT_CART_COUNT.innerHTML = htmlCart;
        ROOT_ORDER_PRODUCTS.innerHTML = htmlOrder;
    }

    changeQuantity() {
        this.productCount = document.querySelector(".product__quantity").value;
        console.log(this.productCount);
    }

    removeProduct() {
        let products = document.querySelector('tbody');
        let headerCount = document.getElementById('header__count');
        let headerTotal = document.getElementById('header__total');
        let checkpointSubtotal = document.getElementById('checkpoint_subtotal');
        localStorage.removeItem("products")
        products.style.display = "none";
        headerCount.innerHTML = 0;
        headerTotal.innerHTML = '$0';
        checkpointSubtotal.innerHTML = '$0';
    }

};

const shoppingPage = new Shopping();
