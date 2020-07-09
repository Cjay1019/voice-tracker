import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-ui/core/";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ReactAudioPlayer from "react-audio-player";


function AudioControl(props) {
    const rap = useRef()
    const [isPlaying, setPlaying] = useState(false);

    useEffect(() => {
        isPlaying ? rap.current.audioEl.current.play() : rap.current.audioEl.current.pause();
    }, [isPlaying]);

    const playPause = (e) => {
        e.preventDefault();
        isPlaying ? setPlaying(false) : setPlaying(true);
    }

    return (
        <>
            <ReactAudioPlayer src={props.fileName} ref={rap} />
            <Button onClick={(event) => playPause(event)}>
                {isPlaying ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon />}
            </Button>
        </>
    );
}

export default AudioControl;