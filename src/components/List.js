import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControlLabel
} from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AudioControl from "./AudioControl";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
});

const listData = [
    {
        name: "Itzel Goldberger",
        description: "Lives in Dracan"
    },
    {
        name: "Roe Vask",
        description: "Wandering Half-Orc"
    },
    {
        name: "Senechal O'Brien",
        description: "Badass dude"
    }
]

function List() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {listData.map(character => (
                <Accordion key={character.name}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                    >
                        <FormControlLabel
                            aria-label="Acknowledge"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<AudioControl fileName="phoebe.mp3" />}
                            label={character.name}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="textSecondary">{character.description}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default List;