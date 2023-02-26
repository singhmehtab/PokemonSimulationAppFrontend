import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";

const Battle = (props) => {

    const[dialogOpen, setDialogOpen] = useState(false)
    const playTurn = (childProps) => {
        props.playTurn(childProps)
    }

    const retry = () => {
        props.prepareBattle()
    }

    const close = () => {
        props.setShowBattlePage(false)
        props.setShowMainPage(false)
    }
    return (
        <Grid>
            <Dialog
                open={props.battleData["battleCompleted"]}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Battle Completed"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Player " + props.battleData["winner"] + " has bon the Battlle"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => close()}>Close</Button>
                    <Button  autoFocus onClick={() => retry()}>
                        Retry
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={10}>
                <Grid item>
                    <Typography variant="h1" component="h2">
                        Battle Stats
                    </Typography>;
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={10}>
                <Grid item>
                    <Typography >
                        Turn: {props.battleData["playerOneTurn"] === true? props.battleData["firstPlayerDetails"]["playerName"] : props.battleData["secondPlayerDetails"]["playerName"]}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={10}>
                <Grid item>
                    <PlayerData playerNumber="one" battleData={props.battleData["firstPlayerDetails"]}></PlayerData>
                </Grid>
                <Grid item>
                    <PlayerData playerNumber="two" battleData={props.battleData["secondPlayerDetails"]}></PlayerData>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={10}>
                <Grid item >
                    <Button onClick={() => playTurn({attackType: "normal"})}>Normal Attack</Button>
                    <Button onClick={() => playTurn({attackType: "special"})}>Special Attack</Button>
                </Grid>
            </Grid>
        </Grid>
    )

}

const PlayerData = (props) => {
    return (
        <>

        <Typography padding={4}>{"Player Name: " + props.battleData["playerName"]}</Typography>
        <Typography padding={4}>{"Player Pokemon Name: " + props.battleData["playerPokemonName"]}</Typography>
        <Typography padding={4}>{"Player Pokemon Power: " + props.battleData["playerPokemonPower"]}</Typography>
        <Typography padding={4}>{"Player Rounds Won: " + props.battleData["playerRoundsWinner"]}</Typography>
        </>
    )
}

export default Battle