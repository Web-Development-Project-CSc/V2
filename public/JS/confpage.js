class Recovery {
    password ='';
    email='';
    constructor(password,email){
        this.password= password;
        this.email=email;
    }
    get password() {
        return this.password;
    }
    set password(value) {
        this.password = value;
    }
    get email() {
        return this.email;
    }
    set email(value) {
        this.email = value;
    }
}
function validateData(email,password)
{
    if(userExists(getid(email))){
        if(users[getid(email)].password==password)
        return 1;
        else return 0;
    }
}