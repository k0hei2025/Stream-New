import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import style from './join.module.css'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';



function rand() {
               return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
               const top = 50 + rand();
               const left = 50 + rand();

               return {
                              top: `${top}%`,
                              left: `${left}%`,
                              transform: `translate(-${top}%, -${left}%)`,
               };
}

const useStyles = makeStyles((theme) => ({
               paper: {
                              position: 'absolute',
                              width: 400,
                              backgroundColor: theme.palette.background.paper,
                              border: '2px solid #000',
                              boxShadow: theme.shadows[5],
                              padding: theme.spacing(2, 4, 3),
               },
}));

export default function SimpleModal(props) {
               const classes = useStyles();

               const history = useHistory();

               // getModalStyle is not a pure function, we roll the style only on the first render
               const [modalStyle] = React.useState(getModalStyle);
               const [open, setOpen] = React.useState(false);

               const inputRef = useRef();

               const urlState = useSelector((state) => state.majorStore.url)







               useEffect(() => {

                              if (props.closedByNewCall) {
                                             setOpen(true);
                                             console.log('handle in JoinProps ClosedByNewCall called by props.closedByNew')
                              }




                              if (props.activation) {


                                             setOpen(true);
                                             console.log('handle Open called by props.activation which sytatye is ' + props.activation)



                              }


               }, [])

               const checkHandler = (event) => {



                              window.location.href = inputRef.current.value;



               }

               const handleClose = () => {
                              setOpen(false);
               };

               const body = (
                              <div style={modalStyle} className={classes.paper}>
                                             <h2 id="simple-modal-title">JOIN Meeting</h2>

                                             <input type="text" placeholder='Enter Url' ref={inputRef} />
                                             <input type="submit" onClick={checkHandler} />
                              </div>
               );

               return (
                              <div>

                                             {/* <button type="button" onClick={handleOpen}>
                                                            Open Modal
                                             </button> */}
                                             <Modal
                                                            open={open}
                                                            onClose={handleClose}
                                                            aria-labelledby="simple-modal-title"
                                                            aria-describedby="simple-modal-description"
                                             >
                                                            {body}
                                             </Modal>
                              </div>
               );
}
