import React from 'react'
import useStyles from './newsStyles';

export default function Visualise() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.toolbar} />
            <div className={classes.toolbar} />
            data Visualise
        </div>
    )
}
