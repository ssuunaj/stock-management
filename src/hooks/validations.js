export const validate = (values, errors,setErrors) => {

    let Values = values;
    let temp = {...errors}

    // if (typeof ("username" in Values) !== undefined) {
    //   if (Values.username.length <= 5) {
    //     temp.username = Values.username
    //       ? ""
    //       : "Username atleast have 6 letters";
    //   }
    // }
    
    if("email" in Values){
         temp.email =
           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
             Values.email
           )
             ? ""
             : "Email is incorrect";
    }
    if('password' in Values){
        temp.password =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(Values.password)?
        "":"Password must contain an Uppercase, number and not less than 8 characters"
    }


    setErrors({
        ...temp
    })

    if (Values == values) return Object.values(temp).every((x) => x == "");
};
