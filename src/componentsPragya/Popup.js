import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


export default function Popup(props)
{
    const {  children, openPopup, setOpenPopup } = props;

    return (
        <Dialog open={openPopup}>
            <DialogTitle >
                <div style={{ flex: "1" }}>Schedule a Meeting</div>
                <Button onClick={() => { setOpenPopup(false) }}>
                <CloseIcon fontSize="large" />
                </Button>

            </DialogTitle> 
            <DialogContent>
                {children}
            </DialogContent>
            </Dialog>
        )

}