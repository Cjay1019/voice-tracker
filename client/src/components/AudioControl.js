import React, { useState, useEffect, useRef } from "react";
import { Button, makeStyles } from "@material-ui/core";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ReactAudioPlayer from "react-audio-player";

const useStyles = makeStyles(theme => ({
    audioButton: {
        color: theme.palette.primary.main
    }
}));

function AudioControl(props) {
    const classes = useStyles();
    const rap = useRef();
    const [isPlaying, setPlaying] = useState(false);

    useEffect(() => {
        isPlaying ? rap.current.audioEl.current.play() : rap.current.audioEl.current.pause();
    }, [isPlaying]);

    const playPause = e => {
        e.preventDefault();
        isPlaying ? setPlaying(false) : setPlaying(true);
    };

    return (
        <>
            <ReactAudioPlayer src={props.fileName} ref={rap} />
            <Button onClick={event => playPause(event)}>
                {isPlaying ?
                    <PauseCircleFilledIcon className={classes.audioButton} />
                    :
                    <PlayCircleFilledIcon className={classes.audioButton} />}
            </Button>
        </>
    );
};

export default AudioControl;