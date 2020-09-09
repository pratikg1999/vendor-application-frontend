import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from "axios";

export default function Register() {

    function validate(){
        
    }

    function onClick(){
        
    }

    return (
        <div>
            <TextField inputid="email" label="Email address" variant="outlined"/>
            <TextField id="password" label="Password" variant="outlined"/>
            <TextField id="renter_password" label="Re-enter Password" variant="outlined"/>

            <Button variant="contained" color="primary">Register</Button>
        </div>
    )
}
