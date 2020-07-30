import React, { useState } from "react";
import { TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, recomposeColor } from '@material-ui/core/';


function CharacterForm({ formOpen, setFormOpen }) {

    const handleClose = () => setFormOpen(false);

    return (
        <Dialog open={formOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create new character</DialogTitle>
            <DialogContent>
                <TextField
                    autoComplete="off"
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoComplete="off"
                    multiline
                    rows={4}
                    rowsMax={8}
                    margin="dense"
                    variant="outlined"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                />
                <Button onClick={() => setRecording(!recording)}>Record</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleClose} color="primary">
                    Create
          </Button>
            </DialogActions>
        </Dialog>
    )
};

export default CharacterForm;