import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


export default function Popup(props)
{
    const {  children, openPopup, setOpenPopup } = props;

    return (
        <Dialog open={openPopup}>
            <DialogTitle >
                <Button onClick={() => { setOpenPopup(false) }} style={{float:"right", margin:"2px"}}>
                <CloseIcon fontSize="large" />
                </Button>

            </DialogTitle> 
            <DialogContent>
                {children}
            </DialogContent>
            </Dialog>
        )

}