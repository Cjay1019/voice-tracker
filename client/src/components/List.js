import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, FormControlLabel, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AudioControl from "./AudioControl";
import Toolbar from "./Toolbar";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    accordianDetails: {
        paddingRight: "0"
    }
});

function List(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.characters.map(character => (
                <Accordion key={character.name}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                    >
                        <FormControlLabel
                            aria-label="Acknowledge"
                            onClick={event => event.stopPropagation()}
                            onFocus={event => event.stopPropagation()}
                            control={<AudioControl fileName="phoebe.mp3" />}
                            label={character.name}
                        />
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordianDetails}>
                        <Typography color="textSecondary">{character.description}</Typography>
                        <Toolbar character={character} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default List;