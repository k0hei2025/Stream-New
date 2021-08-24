import {  TextField } from '@material-ui/core'
import { Button } from '../componentsPragya/Button';

import React, { useState, useRef, Fragment } from 'react'
import { useHistory } from 'react-router';


export default function Signup() {

               const [signup, setSign] = useState(false)
               const emailRef = useRef();
               const passRef = useRef();
               const [err, setErr] = useState(false);
               const [errName, setErrName] = useState('');
               const url = 'AIzaSyBEPyDFaklwGS8C3zUVG1I_8-6WtJk6rFM'
               let history = useHistory();

               const submitHandler = async (event) => {

                              event.preventDefault();

                              if (signup) {

                                             if (passRef.current.value.length > 8) {
                                                            let email = emailRef.current.value;
                                                            let pass = passRef.current.value;

                                                            console.log(email, pass);

                                                            console.log('password is valid');
                                                            event.preventDefault();
                                                            const data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${url}`, {
                                                                           method: 'POST',
                                                                           body: JSON.stringify({
                                                                                          email: email,
                                                                                          password: pass,
                                                                                          returnSecureToken: true,
                                                                           }),
                                                                           headers: {
                                                                                          'Content-Type': 'application/json'
                                                                           }
                                                            })

                                                            const resData = await data.json();
                                                            console.log(resData);


                                             }

                              }

                              if (!signup) {


                                             console.log('singin')

                                             let email = emailRef.current.value;
                                             let pass = passRef.current.value;

                                             console.log(email, pass);

                                             console.log('password is valid');
                                             event.preventDefault();
                                             const data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${url}`, {
                                                            method: 'POST',
                                                            body: JSON.stringify({
                                                                           email: email,
                                                                           password: pass,
                                                                           returnSecureToken: true,
                                                            }),
                                                            headers: {
                                                                           'Content-Type': 'application/json'
                                                            }
                                             })

                                             history.push('/newcall')

                                             const resData = await data.json();
                                             console.log(resData, 'authenticated');




                                             // resData.error.message
                                             // setErr(true)
                                             // setErrName(resData.error.message);








                              }




               }

               const changeHandler = () => {

                              setSign(!signup)
                              console.log(signup)

               }



               return (
                              <Fragment style={{textAlign:"center"}}>
                                             {signup ? <h2> Sign Up </h2> : <h2> Sign In </h2>}
                                             {err ? <p> {errName} </p> : <p></p>}
                                             <form>

                                                            <TextField type="email" placeholder="email" ref={emailRef} /><br />
                                                            <TextField type="password" placeholder="password" ref={passRef} /><br />
                                                            <TextField type="submit" name="submit" onClick={submitHandler} /><br /><br />


                                             </form>
                                             <Button  buttonStyle='btn--primary' buttonColor='blue' style={{display:"block", marginRight:"auto", marginLeft: "auto" }} onClick={changeHandler}>{signup ? "Sign In"  : "Sign Up" }</Button>
                              </Fragment>

               )
}
