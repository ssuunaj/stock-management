import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import authHeader from "../services/auth-header";
import { apiEndPoints } from "./endPoints";
import { CircularProgress } from "@mui/material";
import MyButton from "../components/Button/MyButton";
import { validate } from "../hooks/validations";

export default function ApiCall({ children, ...props }) {
  let initialPayload = props.initialPayload || {};
  let params = props.params || "";
  let thread = props.thread;
  let formData = new FormData();
  let validateOnChange = false;

  const [loading, setLoading] = useState(false);
  const [responseData, setResponsedata] = useState({});

  const [validationErrors, setValidationErrors] = useState({})

  // const [errors, setErrors] = useState();
  //props
  /*
    thread or endpoint
    method
    payload
    params

    //sending data to the serve and handling requests and responses

    responseHandler
    errorHandler

    //api configuration


    requestHandler
        method
        endpoint
        payload
        headers



    */
  const [payload, setPayload] = useState(initialPayload);

  //  input getting input and storing in the payload
  const input = (options) => {
    const { name, defaultValue } = options;

    return {
      ...options,
      onChange: (e) => {
        const { name, value, type, checked } = e.target;

        

        setPayload({
          ...payload,
          [name]: type === "checkbox" || type === "radio" ? checked : value,
        });
        if(validateOnChange)validate({[name]:payload[name]},validationErrors,setValidationErrors)

      },

      value:
        typeof payload[name] === "string"
          ? payload[name].trimStart()
          : payload[name] || defaultValue,
    };
  };

  // fileupload input

  const FileUpload = (props) => {
    const handleFileUploadChange = (e) => {
      var file = e.target.files[0]

      setPayload({
        ...payload,
        [props.name]:file,
      })
    };

    return (
      <React.Fragment>
        <label>Upload File</label>
        <input
          type="file"
          name={props.name}
          onChange={handleFileUploadChange}
          {...props}
        />
      </React.Fragment>
    );
  };

  // Api configuration

  const apiConfig = (options) => {
    // this returns the axios values
    //header, method,url, content type
    // var url = "http://localhost:3333/admin/logout";

    var contentType = "application/json";

    var data = {
      ...initialPayload,
      ...payload,
    };
    var url = null;
    var method = null;

    if (typeof thread !== "undefined") {
      if (thread in apiEndPoints) {
        const { endPoint, apiMethod } = apiEndPoints[thread];

        if (typeof endPoint === "function") {
          url = endPoint(params);
        } else {
          url = endPoint;
        }

        if (typeof apiMethod === "string") {
          method = apiMethod;
        }
      } else {
        alert("EndPoint undefined");
      }
    }

    if (
      props.hasFileUpload === true ||
      props.hasFileUpload === "true"
    ) {
      contentType = `multipart/form-data; boundary=${Math.random()
        .toString()
        .substr(2)}`;
      for (var key in payload) {
        formData.append(key,payload[key]);
      }
      data = formData;
      setPayload({
        ...payload,
        data
      })
      
    }

     

    return {
      url,
      headers: authHeader(),
      contentType,
      data,
      method,
    };
  };

  const handleResponse = (response) => {
    
    if (response.data) {
      console.log(response.data);
      

      if (response.data.error === true) {
        alert(response.data.message);
      }

      if (response.data.success == true) {
        // console.log(response.data.message);
        if (typeof response.data.message !== "undefined") {
          alert(response.data.message);
          console.log(response.data.message);
        }
        if (typeof response.data.data !== null || "undefined") {
          setResponsedata(response.data.data);
        }
      }

      setLoading((current) => !current);
    }

    //handle response from the server
    //checking for errors and success messages
    //updating state with data from the serve
  };

  const handleErrors = (error) => {
    console.log(error);
    //handle error messages
    //update the state with error messages from the server

   

    if (error.response) {
      if (typeof error.response.data !== "undefined") {
        const { message } = error.response.data;
        if (typeof message == "object") {
          if(typeof message.responseText == "undefined"){
             alert(message.sqlMessage);
          }else{
            alert(message.responseText);
          }

        } else {
          alert(message);
        }
      } else {
        alert(error.message);
        window.location.href = "/";
      }

      setLoading((current) => !current);
    } else {
      setLoading((current) => !current);
    }
  };

  //Making a request to the server
  const request = () => {
    //check loading state
    //request has been completed
    //using axios
    //loading the response handlers and error handlers
    if (loading === false) {
      setLoading((current) => !current);
      axios(apiConfig())
        .then((response) => {
          handleResponse(response);
        })
        .catch((error) => {
          handleErrors(error);
        });
    }
  };

  const SubmitButton = (props) => {
    if (loading == true) {
      return (
        <MyButton
          endIcon={<CircularProgress size="16px" />}
          disabled
          {...props}
        />
      );
    }
    return (
      <MyButton
        {...props}
        onClick={() => {
          if (props.onClick === "function") {
            props.onClick();
          }
          if (validate(payload, validationErrors, setValidationErrors)){
            console.log(validationErrors)
             request();
          }
         
        }}
      />
    );
  };

  const Reset = () =>{
    setPayload({
      ...payload,
      ...initialPayload
    })
  }

  useEffect(() => {
    if (props.autoload === true || props.autoload === "true") {
      request();
    }
  }, []);
  return children({
    SubmitButton,
    input,
    responseData,
    FileUpload,
    validationErrors,
  });
}
