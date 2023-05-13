class Product{
    product_id;
    product_name;
    product_price;
    product_image;
    numofpurchases;
    constructor(product_id,product_name,product_price,product_image){
        this.product_id=product_id;
        this.product_name=product_name;
        this.product_price=product_price;
        this.product_image=product_image;
        this.numofpurchases=0;
    }
    set product_image(value) {
        this.product_image = value;
    }
    get product_image() {
        return this.product_image;
    }
    set product_id(value) {
        this.product_id = value;
    }
    get product_id() {
        return this.product_id;
    }
    set product_name(value) {
        this.product_name = value;
    }
    get product_name() {
        return this.product_name;
    }
    set product_price(value) {
        this.product_price = value;
    }
    get product_price() {
        return this.product_price;
    }
    set numofpurchases(value) {
        this.numofpurchases = value;
    }
    get numofpurchases() {
        return this.numofpurchases;
    }
     bought(){
        this.numofpurchases++;
    }
}