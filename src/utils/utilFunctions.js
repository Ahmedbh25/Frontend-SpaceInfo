import laptop from '../img/products/laptop2.jpeg';
import desktop from '../img/products/desktop3.jpeg'
import phone from '../img/products/phone2.jpeg';
import otherProd from '../img/products/otherProd.jpeg';

export const generatePhoto = (imagePath) => {
    let img;
    if (imagePath.toLowerCase() === "laptop") {
        img = laptop;
    } else if (imagePath.toLowerCase() === "desktop") {
        img = desktop;
    } else if (imagePath.toLowerCase() === "phone") {
        img = phone;
    } else {
        img = otherProd;
    }
    return img;
}



export const reducerSidenav = (state, action) => {
    const updatedTypes = { ...state.toggle, [action.payload]: !state.toggle[action.payload] }
    const productsliststor = localStorage.getItem('initialComputers');
    const Computerscovss = JSON.parse(productsliststor);
    const updatedPro = Computerscovss.filter(prod => prod.type.toLowerCase() === action.payload.toLowerCase());
    Object.keys(updatedTypes).forEach(key => {
        if (key !== action.payload && updatedTypes[key] === true) {
            updatedTypes[key] = false;
        }
    });

    return { updatedTypes, updatedPro }
}





export const Email_Password_Verifcation = (email, password,errorEmail, errorPassword ) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,16}$/;
    if (!(emailRegex.test(email))) {
        return errorEmail.current.innerHTML = "email must accept the standards";
    } else {
        errorEmail.current.innerHTML = "";
    }

    if (!(passwordRegex.test(password))) {
        return errorPassword.current.innerHTML = "Password must contain at least 8 caracters letters & numbers";
    } else {
        errorPassword.current.innerHTML = "";
    }
}

export const Register_Verification = (FieldState, errorUsername, errorEmail, errorPassword, errorFirstn, errorLastn, errorAddress, errorCity, errorState, errorCountry, errorPhone) =>{
    const fetch_error = Email_Password_Verifcation(FieldState.email, FieldState.password, errorEmail, errorPassword);
    if(fetch_error){
        return errorState
    }

    const ruleRegex1 = /^[a-zA-Z\s]{3,}$/;
    const ruleRegex2 = /^.{5,}$/;
    const phoneRegex = /^(\+216|00216)?[25-9]\d{7}$/;
    
    if(!ruleRegex2.test(FieldState.username)){
        return errorUsername.current.innerHTML = "username must be over 5 caracters & contain only letters";
    }else{
        errorUsername.current.innerHTML = ""
    }

    if(!ruleRegex1.test(FieldState.first_name)){
        return errorFirstn.current.innerHTML = "First name must be over 5 caracters & contain only letters";
    }else{
        errorFirstn.current.innerHTML = "";
    }

    if(!ruleRegex1.test(FieldState.last_name)){
        return errorLastn.current.innerHTML = "Last name must be over 5 caracters & contain only letters";
    }else{
        errorLastn.current.innerHTML = "";
    }

    if(!ruleRegex2.test(FieldState.address)){
        return errorAddress.current.innerHTML = "Adress must at least 5 caracters";
    }else{
        errorAddress.current.innerHTML = "";
    }

    if(!ruleRegex1.test(FieldState.city)){
        return errorCity.current.innerHTML = "City must be over 5 caracters & contain only letters";

    }else{
        errorCity.current.innerHTML = "";
    }

    if(!ruleRegex1.test(FieldState.state)){
        return errorState.current.innerHTML = "City must be over 5 caracters & contain only letters";
    }else{
        errorState.current.innerHTML = "";
    }

    if(!ruleRegex1.test(FieldState.country)){
        return errorCountry.current.innerHTML = "City must be over 5 caracters & contain only letters";

    }else{
        errorCountry.current.innerHTML = "";
    }

    if(!phoneRegex.test(FieldState.phone)){
        return errorPhone.current.innerHTML = "Tunisian Phone number must be this format : +216XXXXXXXX";

    }else{
        errorPhone.current.innerHTML = "";        
    }
}

