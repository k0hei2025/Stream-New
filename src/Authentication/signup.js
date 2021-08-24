import { Button } from '@material-ui/core'

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
                              <Fragment>
                                             {signup ? <h1> Signup </h1> : <h1> Signin </h1>}
                                             {err ? <p> {errName} </p> : <p></p>}
                                             <form>

                                                            <input type="email" placeholder="email" ref={emailRef} />
                                                            <input type="password" placeholder="password" ref={passRef} />
                                                            <input type="submit" name="submit" onClick={submitHandler} />


                                             </form>
                                             <Button variant="contained" color="primary" onClick={changeHandler}>Submit</Button>
                              </Fragment>

               )
}
