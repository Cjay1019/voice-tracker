import React, { useState, useEffect, useContext } from "react";
import AudioControl from "./AudioControl";
import { UserContext } from "../contexts/UserContext";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";
import RecordPulse from "./RecordPulse";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    audioContainer: {
        width: "24px",
        display: "inline-block"
    },
    recordButton: {
        width: "64px"
    }
});

const Mp3Recorder = new MicRecorder({ bitRate: 320 });

function CharacterForm({ formOpen, setFormOpen, getCharacters }) {
    const classes = useStyles();
    const [user] = useContext(UserContext);
    const [characterInfo, setCharacterInfo] = useState({ name: "", description: "" });
    const [isRecording, setRecording] = useState(false);
    const [audio, setAudio] = useState({ blobUrl: "", buffer: null });
    const [isBlocked, setBlocked] = useState(false);

    useEffect(() => {
        navigator.getUserMedia({ audio: true }, () => setBlocked(false), () => setBlocked(true));
    }, []);

    const handleClose = () => setFormOpen(false);

    const handleChange = e => setCharacterInfo({ ...characterInfo, [e.target.name]: e.target.value });

    const readyToCreate = () => !isRecording && audio.buffer;

    const startRecording = () => {
        if (!isBlocked) {
            Mp3Recorder.start().then(() => setRecording(true)).catch(e => console.error(e));
        };
    };

    const stopRecording = () => {
        Mp3Recorder.stop().getMp3().then(([buffer, blob]) => {
            blob.arrayBuffer().then(arrayBuffer => {
                setAudio({ blobUrl: URL.createObjectURL(blob), buffer: Buffer.from(arrayBuffer) });
                setRecording(false);
            });
        }).catch(e => console.error(e))
    };

    const handleCreate = () => {
        const data = { buffer: audio.buffer, character: characterInfo, user };
        axios.post("/api/createCharacter", data).then(res => {
            // TODO: Spinner
            console.log(res.data)
            handleClose();
            getCharacters();
        });
    };


    return (
        <Dialog open={formOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create new character</DialogTitle>
            <DialogContent>
                <TextField
                    autoComplete="off"
                    autoFocus
                    name="name"
                    value={characterInfo.name}
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
                    value={characterInfo.description}
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
                    {readyToCreate() && <AudioControl fileUrl={audio.blobUrl} />}
                </div>
                {/* <RecordPulse /> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleCreate} color="primary" disabled={!readyToCreate()}>
                    Create
          </Button>
            </DialogActions>
        </Dialog>
    )
};

export default CharacterForm;