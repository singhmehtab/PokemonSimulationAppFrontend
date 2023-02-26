import {Grid, Typography} from "@mui/material";
import PlayerSection from "./PlayerSection";
import Button from "@mui/material/Button";

const GameStart = (props) => {

    const startBattle = () => {
      props.prepareBattle()
    }

    return (
        <Grid container>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={10}>
                <Grid item>
                    <Typography variant="h1" component="h2">
                        Welcome to Pokemon Game
                    </Typography>;
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <PlayerSection name="First" setGameData={props.setGameData} gameData={props.gameData}></PlayerSection>
                </Grid>
                <Grid item xs={6}>
                    <PlayerSection name="Second" setGameData={props.setGameData} gameData={props.gameData}></PlayerSection>
                </Grid>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={10}>
                    <Grid item>
                        <Button onClick={() => startBattle()}>Start Battle</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default GameStart;