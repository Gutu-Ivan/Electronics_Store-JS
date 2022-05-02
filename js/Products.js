class Products {
    constructor() {
        this.classNameActive = 'active';
        this.labelAdd = 'Add to cart';
        this.labelRemove = 'Remove from cart';
    }

    handlerSetLocalStorage(element, id) {
        const { pushProduct, products } = localStorageUtil.putProducts(id);

        if (pushProduct) {
            element.classList.add(this.classNameActive);
            element.innerText = this.labelRemove;
        } else {
            element.classList.remove(this.classNameActive);
            element.innerText = this.labelAdd;
        }

        shoppingPage.render(products.length);
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';

        CATALOG.forEach(({ id, name, price, img, category }) => {
            let activeClass = '';
            let activeText = '';

            if (productsStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeClass = ' ' + this.classNameActive;
                activeText = this.labelRemove;
            }

            htmlCatalog += `
                <div class="product col-lg-3 col-md-4 col-sm-6 ${category}">
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg">
                            <img src="${img}" width="200px" height="200px">
                            <ul class="featured__item__pic__hover" >
                                <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                                <li class="product__item  ${activeClass}"><p onclick="productsPage.handlerSetLocalStorage(this, '${id}');" class="${activeClass}">${activeText}</p></li>
                            </ul>
                        </div>
                        <div class="featured__item__text">
                            <h6><a href="#">${name}</a></h6>
                            <h5>$${price}</h5>
                        </div>
                    </div>
                </div>
            `;
        });

        const html = `
            <div class="row featured__filter">
                ${htmlCatalog}
            </div>
        `;

        ROOT_PRODUCTS.innerHTML = html;
    }
};

const productsPage = new Products();
