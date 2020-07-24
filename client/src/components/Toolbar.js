import React, { useState } from "react";
import { IconButton, Tooltip, Zoom, makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    deleteIcon: {
        margin: "-12px 5px -12px 0"
    },
    editIcon: {
        margin: "-12px 0 -12px auto"
    },
    deleteButton: {
        color: theme.palette.error.main
    },
    cancelButton: {
        color: theme.palette.primary.main
    }
}));

function Toolbar({ character, getCharacters }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const deleteCharacter = () => {
        axios.post("/api/deleteCharacter", { _id: character._id }).then(res => console.log);
        setOpen(false);
        getCharacters();
    };

    return (
        <>
            <Tooltip TransitionComponent={Zoom} title="Edit character" placement="top" enterDelay={500}>
                <IconButton aria-label="edit" className={classes.editIcon}>
                    <EditIcon />
                </IconButton>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="Delete character" placement="top" enterDelay={500}>
                <IconButton aria-label="delete" className={classes.deleteIcon} onClick={() => setOpen(true)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Delete ${character.name}?`}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} className={classes.cancelButton}>Cancel</Button>
                    <Button onClick={deleteCharacter} autoFocus className={classes.deleteButton}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Toolbar;