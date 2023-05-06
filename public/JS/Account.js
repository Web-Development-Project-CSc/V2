
class Account {
    name= '';
    password ='';
    country ='';
    phone ='';
    address='';
    birthdate='';
    email='';
    paymentMethod ='';
    numofpurchases=0;
    boughtProducts = [];
    id = 0;
    constructor(name, password, country, phone, address,email,birthdate){
        this.name=name;
        this.password= password;
        this.country=country;
        this.phone=phone;
        this.address=address;
        this.birthdate=birthdate; 
        this.email=email;
    }
    get name() {
        return this.name;
    }
    set name(value) {
        this.name = value;
    }
    get password() {
        return this.password;
    }
    set password(value) {
        this.password = value;
    }
    get country() {
        return this.country;
    }
    set country(value) {
        this.country = value;
    }
    get phone() {
        return this.phone;
    }
    set phone(value) {
        this.phone = value;
    }
    get address() {
        return this.address;
    }
    set address(value) {
        this.address = value;
    }
    get birthdate() {
        return this.birthdate;
    }
    set birthdate(value) {
        this.birthdate = value;
    }
    get email() {
        return this.email;
    }
    set email(value) {
        this.email = value;
    }
    get paymentMethod() {
        return this.paymentMethod;
    }
    set paymentMethod(value) {
        this.paymentMethod = value;
    }
    get numofpurchases() {
        return this.numofpurchases;
    }
    set numofpurchases(value) {
        this.numofpurchases = value;
    }
    get boughtProducts() {
        return this.boughtProducts;
    }
    set boughtProducts(value) {
        this.boughtProducts = value;
    }
    set id(value) {
        this.id = value;
    }
    get id() {
       return this.ids;
    }
    buyproduct(product){
        this.boughtProducts.push(product);
        this.numofpurchases++;
    }
}
function makeid(user){
    for(let i=0; i<user.email.length; i++) user.id += user.email.codePointAt(i);
    return user.id;
}
function getid(email){
    let sum = 0;
    for(let i=0; i<email.length; i++) sum += email.codePointAt(i);
    return sum;
}
let users = [];
let admin = new Account('Admin','12345','Egypt','012','FLAVOURED CO','flavouredmiu@gmail.com','2007-01-01');
function addUser(user){
makeid(user);
users[user.id] = user;
}
function removeUser(id) {
    users.splice(id, 1);
    return users[id];
}
function getUser(id){
    if(userExists(id))
    return users[id];
    else return ("user not found");
}

function userExists(id){
    if(users[id] instanceof Account)  return true;
    else return false;
}
function validateData(email,password){
if(userExists(getid(email))){
    if(users[getid(email)].password==password)
    return 1;
    else return 0;
}
else return -1;
}
let tester = new Account('Tester','pass','EGYPT','012345','ACCOUNT.JS','tester@flavoured.com','2023-03-20');
addUser(admin);
addUser(tester);
// console.log(getUser(getid(admin.email)));
// console.log(getUser(getid(tester.email)));
// console.log(users);

let p =document.getElementById("psw");
let e = document.getElementById('email');
p.onchange = function() {confirm()};
e.onfocus = function() {hide()};
function confirm(){
   let d = validateData(e.value,p.value);
   if(d==0){
    document.getElementById('error0').style.display='block';
    document.getElementById('error-1').style.display='none';
    return 0;
   }
   else if(d==-1){
    document.getElementById('error0').style.display='none';
    document.getElementById('error-1').style.display='block';
    return false;
   }
   else {hide(); return true}
}
function hide(){
    document.getElementById('error0').style.display='none';
    document.getElementById('error-1').style.display='none';
}
document.getElementById('logger').addEventListener("click", function(event){
    event.preventDefault();
    if(confirm()==true) {
     if(getUser(getid(e.value))==getUser(admin.id))
      location.replace("dashboard.html");
     else  document.getElementById("myForm").submit();;
    }
    else return false;
  });
document.getElementById('cancel').onclick = function(){
    location.replace("/")
}
