import React, { useState } from "react";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/authenticate.service";
import { validate } from "../hooks/validations";
import Input from "../components/Inputs/Input"

import MyButton from "../components/Button/MyButton";

export default function Login() {
  // const [showMessage, setShowMessage] = useState(false);
  const { message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
    username: "",
  };

  const { handleChange, values, errors, setErrors, setValues } = useForm(
    initialValues,
    false,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (validate(values, errors, setErrors))
      dispatch(login({ email, password }));
  };

  return (
    <section className="login">
      <div className="content-wrapper  d-flex align-items-center justify-content-center">
        <div className="form-wrapper card p-4">
          <h5 className="text-center py-1">Please Log In</h5>

          <p className="text-center" style={{ color: "red" }}>
              {message}
            </p>

          <form onSubmit={handleSubmit}>
            <div>
         
              <Input
                type="email"
                onChange={handleChange}
                name="email"
                placeholder="Email"
                value={values.email}
              /> 
              {errors.email && <p className="errors">{errors.email}</p>}
            </div>
            <div>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                value={values.password}
              />
              {errors.password && <p className="errors">{errors.password}</p>}
            </div>

            <MyButton type="submit" variant="contained" color="secondary">LOGIN</MyButton>
          </form>
        </div>
      </div>
    </section>
  );
}
