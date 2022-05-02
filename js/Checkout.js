class Checkout {
    constructor() {
        this.phoneno = /^\d{8}$/;
        this.mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.firstName = document.querySelector(".first__name");
        this.lastName = document.querySelector(".last__name");
        this.country = document.querySelector(".country");
        this.address = document.querySelector(".address");
        this.city = document.querySelector(".city");
        this.phone = document.querySelector(".phone");
        this.email = document.querySelector(".email");
        this.postcode = document.querySelector(".postcode");
        this.note = document.querySelector(".note");
        this.paypal = document.getElementById("paypal");
        this.stripe = document.getElementById("stripe");
        this.delivery = document.getElementById('delivery');
        this.payment = '';
    }

    checkNumber() {
        if (this.phone.value.match(this.phoneno)) {
            return true;
        }
        else {
            alert("Not a valid phone number!")
            return false;
        }
    }

    checkEmail() {
        if(this.email.value.match(this.mailformat)) {
            return true;
        }
        else {
            alert("You have entered an invalid email address!");
            return false;
        }
    }


    submit() {
        if (this.paypal.checked === true && this.stripe.checked === true){
            alert("Please choose just 1 payment method!")
            return false;
        }
        else if (this.paypal.checked === true) {
            this.payment = "PayPal"
        }
        else if(this.stripe.checked === true) {
            this.payment = "Stripe"
        }
        else{
            console.log("Please choose the payment method!")
        }

        let data = {
            "First name": this.firstName.value,
            "Last name": this.lastName.value,
            "Country": this.country.value,
            "Address": this.address.value,
            "City": this.city.value,
            "Phone": this.phone.value,
            "Email": this.email.value,
            "Postcode": this.postcode.value,
            "Note": this.note.value,
            "Payment": this.payment,
            "Delivery": this.delivery.options[this.delivery.selectedIndex].value,
            "Total": shoppingPage.total,
            "Products": localStorageUtil.getProducts()

        }

        if (this.checkEmail() === true && this.checkNumber() === true){
            localStorage.setItem('Data', JSON.stringify(data))
            alert("Data was sent successfully!");
        } else{
            console.log("Data has not been sent!")
        }
    }

    render()  {
        let htmlTotal = '';
        htmlTotal = `
            <div class="checkout__order__total">Total <span>$${shoppingPage.total}</span></div>
        `;
        ROOT_ORDER_TOTAL.innerHTML = htmlTotal;
    }

};

const checkoutPage = new Checkout();
