import React, { useState, useEffect, useContext } from "react";
import AudioControl from "./AudioControl";
import { UserContext } from "../contexts/UserContext";
import { CharacterContext } from "../contexts/CharacterContext";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";
import RecordPulse from "./RecordPulse";
import { TextField, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    audioContainer: {
        width: "24px",
        display: "inline-block"
    },
    recordButton: {
        width: "64px"
    },
    spinner: {
        width: "36px !important",
        height: "36px !important",
        marginRight: "16px !important",
        marginLeft: "24px !important"
    }
});

const Mp3Recorder = new MicRecorder({ bitRate: 320 });

function CharacterForm({ formIsOpen, setFormOpen, getCharacters }) {
    const classes = useStyles();
    const [user] = useContext(UserContext);
    const [character, setCharacter] = useContext(CharacterContext);
    const [isRecording, setRecording] = useState(false);
    const [isBlocked, setBlocked] = useState(false);
    const [isCreating, setCreating] = useState(false);

    useEffect(() => {
        navigator.getUserMedia({ audio: true }, () => setBlocked(false), () => setBlocked(true));
    }, []);

    const handleClose = () => {
        setFormOpen(false);
        if (isUpdating()) setTimeout(() => resetForm(), 250);
    };

    const handleChange = e => setCharacter({ ...character, [e.target.name]: e.target.value });

    const audioRecorded = () => !isRecording && character.buffer;

    const readyToCreate = () => audioRecorded() && character.name;

    const resetForm = () => setCharacter({ name: "", description: "", blobUrl: "", buffer: null, _id: "" });

    const startRecording = () => {
        if (!isBlocked) {
            Mp3Recorder.start().then(() => setRecording(true)).catch(e => console.error(e));
        };
    };

    const isUpdating = () => character._id ? true : false;

    const stopRecording = () => {
        Mp3Recorder.stop().getMp3().then(([buffer, blob]) => {
            blob.arrayBuffer().then(arrayBuffer => {
                setCharacter({ ...character, blobUrl: URL.createObjectURL(blob), buffer: Buffer.from(arrayBuffer) });
                setRecording(false);
            });
        }).catch(e => console.error(e))
    };

    const handleCreate = () => {
        const data = { buffer: character.buffer, character, user };
        setCreating(true);
        axios.post("/api/createCharacter", data).then(res => {
            handleClose();
            setTimeout(() => setCreating(false), 250);
            resetForm();
            getCharacters();
        }).catch(err => {
            setCreating(false);
            console.error(err)
        });
    };

    const handleUpdate = () => {
        const data = { filter: { _id: character._id }, buffer: character.buffer, character, user };
        setCreating(true);
        axios.post("/api/updateCharacter", data).then(res => {
            handleClose();
            setTimeout(() => setCreating(false), 250);
            resetForm();
            getCharacters();
        }).catch(err => {
            setCreating(false);
            console.error(err)
        });
    };

    return (
        <Dialog open={formIsOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{isUpdating() ? `Update ${character.name}` : "Create new character"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoComplete="off"
                    autoFocus
                    name="name"
                    value={character.name}
                    margin="dense"
                    variant="outlined"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    autoComplete="off"
                    name="description"
                    value={character.description}
                    multiline
                    rows={4}
                    rowsMax={8}
                    margin="dense"
                    variant="outlined"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <Button onClick={isRecording ? stopRecording : startRecording} className={classes.recordButton}>
                    {isRecording ? "Stop" : "Record"}
                </Button>
                <div className={classes.audioContainer}>
                    {audioRecorded() && <AudioControl fileUrl={character.blobUrl} />}
                </div>
                {/* <RecordPulse /> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                {isCreating
                    ? <CircularProgress className={classes.spinner} />
                    : <Button onClick={() => isUpdating() ? handleUpdate() : handleCreate()} color="primary" disabled={!readyToCreate()}>
                        {isUpdating() ? "Update" : "Create"}
                    </Button>}
            </DialogActions>
        </Dialog>
    )
};

export default CharacterForm;