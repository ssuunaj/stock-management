import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    // width: "50%",
  },
  inputMain: {
    padding: "6px",
    outline: "none",
    marginBottom: "10px",
    fontSize: "14px",
    transition: "0.3s ease",
    width: "100%",
    border: "1px solid #aaa",
    borderRadius: "0px",

    // ["&::placeholder"]:{
    //   color:theme.palette.primary.main,
    // },

    "&:focus": {
      border: "1px solid" + theme.palette.primary.main,
      color: theme.palette.primary.main,
      outline: "none",

      "&::placeholder": {
        color: theme.palette.primary.main,
      },
    },

    "&.line": {
      border: "none",
      borderBottom: "1px solid #aaa",

      "&:focus": {
        borderBottom: "1px solid" + theme.palette.primary.main,
      },
    },
    "&.round": {
      borderRadius: "18px",
    },

    //  ["&:hover"]:{
    //     backgroundColor:'rgba(0,0,0,0.4)'
    // }
  },
  inputWithIcon: {
    paddingLeft: "24px",
  },
  inputWithOutIcon: {
    paddingLeft: "6px",
  },
  startIcon: {
    position: "absolute",
    bottom: "10px",
    top: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",

    "& *": {
      fontSize: "18px",
      color: "#aaa",
    },
  },
  endIcon: {
    position: "absolute",
    top: "0px",
    right: "5px",
    bottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& *": {
      fontSize: "18px",
      color: "#aaa",
    },
  },
}));

export default function Input(props) {
  const classes = useStyles();

  const [inputType, setInputType] = useState(props.type || "text");
  const onShowPasswordChange = () => {
    setInputType(inputType === "text" ? "password" : "text");
  };

  //if startIcon has been set

  const inputStyle =
    props.inputicon == null || props.inputicon == "undefined"
      ? classes.inputWithOutIcon
      : classes.inputWithIcon;

  //Check for variant
  const variant = props.variant || " ";

  var errors = props.errors || null;

  let entries = errors != null ? Object.entries(errors) : null;

  return (
    <div className={classes.root}>
      {props.inputicon ? (
        <div className={classes.startIcon}>{props.inputicon}</div>
      ) : null}
      <input
        {...props}
        className={clsx(classes.inputMain + " " + variant, inputStyle)}
        type={inputType}
      />
      {props.type === "password" ? (
        <div onClick={onShowPasswordChange} className={classes.endIcon}>
          {inputType === "text" ? <MdVisibilityOff /> : <MdVisibility />}
        </div>
      ) : props.endIcon ? (
        <div className={classes.endIcon}>{props.endIcon}</div>
      ) : (
        ""
      )}
      {entries != null &&
        entries.map(([key, val]) => {
          if (key == inputType && val != "") {
            return <p>{val}</p>;
          }
          if(key == inputType && val == ""){
            return <p>Field is required</p>;
          }
        })}
    </div>
  );
}
/*
    An input can have the following props

    label
    placeholder
    startIcon
    endIcon
    variant = outline | round | line 
    color: primary| secondary

    An input could be  text-area



*/
