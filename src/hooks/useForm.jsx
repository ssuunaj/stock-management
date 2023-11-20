import { useState } from "react";
import { omit } from "lodash";

const useForm = (initialValues, validateOnChange=false, validate) => {
 
  //values
  const [values, setValues] = useState(initialValues);
  //errors
  const [errors, setErrors] = useState({});

  //Validate function

  const handleChange = (e) => {
    const {name, value}  = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if(validateOnChange) validate({[name]:value},errors,setErrors)
  };

  // const handleSubmit = () => {
  //   if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
  //     callback();
  //   } else {
  //     alert("There is an error");
  //   }
  // };

  return {
    values,
    errors,
    handleChange,
    setValues,
    setErrors,
  
  };
};
export default useForm;
