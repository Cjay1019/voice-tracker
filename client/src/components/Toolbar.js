import React, { useState, useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { CircularProgress, IconButton, Tooltip, Zoom, makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
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
    },
    spinner: {
        width: "36px !important",
        height: "36px !important",
        marginRight: "16px !important",
        marginLeft: "24px !important"
    }
}));

function Toolbar({ characterItem, getCharacters, setFormOpen }) {
    const classes = useStyles();
    const [character, setCharacter] = useContext(CharacterContext);
    const [isOpen, setOpen] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const editCharacter = () => {
        setFormOpen(true);
        setCharacter({
            name: characterItem.name,
            description: characterItem.description,
            blobUrl: characterItem.fileUrl,
            buffer: null,
            _id: characterItem._id
        });
    };

    const deleteCharacter = () => {
        setDeleting(true);
        axios.post("/api/deleteCharacter", { character: characterItem }).then(res => {
            setOpen(false);
            setTimeout(() => setDeleting(false), 250);
            getCharacters();
        }).catch(err => {
            setDeleting(false);
            console.error(err)
        });;
    };

    return (
        <>
            <Tooltip TransitionComponent={Zoom} title="Edit character" placement="top" enterDelay={500}>
                <IconButton aria-label="edit" className={classes.editIcon} onClick={editCharacter}>
                    <EditIcon />
                </IconButton>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="Delete character" placement="top" enterDelay={500}>
                <IconButton aria-label="delete" className={classes.deleteIcon} onClick={() => setOpen(true)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                open={isOpen}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Delete ${characterItem.name}?`}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} className={classes.cancelButton}>Cancel</Button>
                    {isDeleting ? <CircularProgress className={classes.spinner} /> : <Button onClick={deleteCharacter} autoFocus className={classes.deleteButton}>Delete</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Toolbar;