import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, FormControlLabel, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AudioControl from "./AudioControl";
import Toolbar from "./Toolbar";

const useStyles = makeStyles({
    root: {
        width: "100%",
        marginBottom: "86px"
    },
    accordianDetails: {
        paddingRight: "0"
    }
});

function List({ characters, getCharacters, formIsOpen, setFormOpen }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {characters.map(characterItem => (
                <Accordion key={characterItem.name}>
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
                            control={<AudioControl fileUrl={characterItem.fileUrl} />}
                            label={characterItem.name}
                        />
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordianDetails}>
                        <Typography color="textSecondary">{characterItem.description}</Typography>
                        <Toolbar characterItem={characterItem} getCharacters={getCharacters} setFormOpen={setFormOpen} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default List;