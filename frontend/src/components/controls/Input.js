import React from "react";
import {TextField} from '@material-ui/core'

export default function Input(props) {
  const { name, value, label,error=null, onChange,...other } = props;
  return (
    <TextField
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...error && {error:true,helperText:error}}
    />
  );
}
