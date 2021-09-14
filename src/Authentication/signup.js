

import { TextField } from '@material-ui/core'

import { Button } from '../componentsPragya/Button';

import { Redirect, Link } from 'react-router-dom'

import React, { useState, useRef, Fragment, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'

import { majorStoreAction } from '../store/majorStore'

import Cookies from 'js-cookie'




export default function Signup() {

               const [signup, setSign] = useState(false)
               const emailRef = useRef();
               const passRef = useRef();
               const [err, setErr] = useState(false);


               const [dataSaveName, setDataName] = useState(false);
               const url = 'AIzaSyBEPyDFaklwGS8C3zUVG1I_8-6WtJk6rFM'
               let history = useHistory();

               let tokenIdState = useSelector((state) => state.majorStore.tokenId)
               let userIdState = useSelector((state) => state.majorStore.userId)


               console.log('idToken', tokenIdState, 'userId', userIdState)


               const dispatch = useDispatch();




               const requestLogin = async e => { }
               const refresh = async () => { }



               const hasAccess = async (accessToken, refreshToken) => {
                              if (!refreshToken) return null;

                              if (accessToken === undefined) {
                                             accessToken = await refresh(refreshToken);
                                             return accessToken;
                              }

                              return accessToken



               }

               const protect = async e => {

                              let accessToken = Cookies.get("access");
                              let refreshToken = Cookies.get("refresh")

                              accessToken = await hasAccess(accessToken, refreshToken)

                              if (!accessToken) {
                                             //
                              }
                              else {
                                             await requestLogin(accessToken, refreshToken)
                              }



               }

               const checkAuthTimeOut = (expiresIn) => {
                              setTimeout(() => {

                                             console.log("time up")
                              }, expiresIn * 1000)
               }



               const submitHandler = async (event) => {

                              event.preventDefault();

                              if (signup) {



                                             if (passRef.current.value.length > 8 && emailRef.current.value !== '') {


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

                                                            const { idToken, refreshToken } = resData
                                                            //   console.log(` refresh token ${refreshToken}  access token ${idToken}`);
                                                            Cookies.set("access", idToken);
                                                            Cookies.set("refresh", refreshToken);


                                                            const { localId } = resData

                                                            //console.log('userID ', localId, " idToken ", idToken);

                                                            dispatch(majorStoreAction.storeToken({
                                                                           tokenId: idToken,
                                                                           userId: localId
                                                            }))





                                                            await requestLogin





                                                            setDataName(true)

                                             } else {
                                                            setErr(true)
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



                                             //     history.push('/newcall')



                                             const resData = await data.json();
                                             console.log(resData, 'authenticated');



                                             const { idToken, localId, expiresIn } = resData

                                             console.log('userID ', localId, " idToken ", idToken, 'expiresIn ', +expiresIn);

                                             dispatch(majorStoreAction.storeToken({
                                                            tokenId: idToken,
                                                            userId: localId
                                             }))


                                             checkAuthTimeOut(+expiresIn)

                                             if (resData.idToken) {
                                                            console.log(resData)
                                                            console.log(resData.localId)

                                                            history.push('/newcall')
                                             }



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


                              <div style={{ textAlign: "center" }}>
                                             {signup ? <h2> Sign Up </h2> : <h2> Sign In </h2>}
                                             {err ? <p style={{ color: "red" }}> <b>Invalid credientials</b> </p> : <p></p>}
                                             {dataSaveName ? <b style={{ color: "green" }}> Data saved successfully </b> : <p></p>}
                                             <form>

                                                            <input type="email" placeholder="email" ref={emailRef} /><br />
                                                            <input type="password" placeholder="password" ref={passRef} /><br />


                                                            <TextField type="submit" name="submit" onClick={submitHandler} /><br /><br />


                                             </form>


                                             <Button buttonStyle='btn--primary' buttonColor='blue' style={{ display: "block", marginRight: "auto", marginLeft: "auto" }} onClick={changeHandler}>{signup ? "Sign In" : "Sign Up"}</Button>
                              </div>



               )
}
