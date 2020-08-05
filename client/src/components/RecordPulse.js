import React from "react";
import { makeStyles } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.error.main,
        borderRadius: "50%",
        boxShadow: `0 0 0 0 ${theme.palette.error.main}`,
        margin: "10px",
        height: "20px",
        width: "20px",
        transform: "scale(1)",
        animation: "$pulse-red 2s infinite"
    },
    "@keyframes pulse-red": {
        "0%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(255, 82, 82, 0.7)"
        },        
        "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 10px rgba(255, 82, 82, 0)"
        },        
        "100%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(255, 82, 82, 0)"
        }
    }
}));

function RecordPulse() {
    const classes = useStyles();
    return <div className={classes.root}></div>
};

export default RecordPulse;