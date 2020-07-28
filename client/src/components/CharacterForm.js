import React, { useState } from "react";
import { TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core/';


function CharacterForm({ formOpen, setFormOpen }) {

    const handleClose = () => setFormOpen(false);

    return (
        <Dialog open={formOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
          </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleClose} color="primary">
                    Subscribe
          </Button>
            </DialogActions>
        </Dialog>
    )
};

export default CharacterForm;