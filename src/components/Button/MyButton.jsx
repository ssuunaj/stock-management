import React from 'react'
import {makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import { Button } from '@mui/material';

const useStyles = makeStyles((theme)=>({
    // root:{
    //     padding:'4px 12px',
    //     outline:'none',
    //     border:'1px solid ' + theme.palette.primary.main ,
    //     backgroundColor:theme.palette.primary.main,
    //     transition: '0.5s ease',
    //     color:'#fff',
    //     width:"100%",

    //     "&:hover":{
    //       backgroundColor: theme.palette.primary.light,
    //       border:'1px solid ' + theme.palette.primary.light ,
    //     },

    //     "&.contained-rounded":{
    //       border:'1px solid ' + theme.palette.primary.dark,
    //       borderRadius:"20px",

    //        "&:hover":{
    //           backgroundColor: theme.palette.primary.light,
    //           border:'1px solid ' + theme.palette.primary.light ,
    //     },
    //     },

    //     "&.outlined":{
    //        border:'1px solid ' + theme.palette.primary.main ,
    //        color:theme.palette.primary.main,
    //        backgroundColor: '#fff',

    //         "&:hover":{
    //         backgroundColor: theme.palette.primary.main,
    //         border:'1px solid ' + theme.palette.primary.main ,
    //         color:'#fff',
    //     },
    //     },

    //       "&.outlined-round":{
    //        border:'1px solid ' + theme.palette.primary.main ,
    //        color:theme.palette.primary.main,
    //        backgroundColor: '#fff',
    //        borderRadius:"20px",

    //         "&:hover":{
    //         backgroundColor: theme.palette.primary.main,
    //         border:'1px solid ' + theme.palette.primary.main ,
    //         color:'#fff',
    //        }
    // }
        



    // }
}))

export default function MyButton({children, variant,color,size, disabled, sx,...props}) {
    const classes = useStyles();
  
  return (
    <Button 
    // className={clsx(classes.root+" "+variant)} 
    {...props}
    variant={variant}
    color={color}
    disabled={disabled}
    sx={sx}
    size={size}
    onClick={props.onClick}>{children}</Button>
  )
}
