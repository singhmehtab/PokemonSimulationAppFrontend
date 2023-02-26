import {useEffect, useState} from "react";
import {Grid, List, TextField, Typography} from "@mui/material";
import CustomizedListItem from "./CustomizedListItem";

const PlayerSection = (props) => {

    const[pokemons, setPokemons] = useState([])
    const[pokemonName, setPokemonName] = useState(props.name + " Pokemon Name")
    useEffect(() => {
        fetch("http://localhost:8080/getPokemon")
            .then(res => res.json())
            .then(
                (result) => {
                    setPokemons(result["data"])
                },
                (error) => {

                }
            )
    }, [])

    const onPlayerNameChange = (event) => {
        const key = props.name === "First" ? "firstPlayerName":"secondPlayerName"
        var gameData = props.gameData
        gameData[key] = event.target.value
        props.setGameData(gameData)
    }

    const onPlayerPokemonNameChange = (event) => {
        const key = props.name === "First" ? "firstPlayerPokemonName":"secondPlayerPokemonName"
        var gameData = props.gameData
        gameData[key] = event.target.value
        props.setGameData(gameData)
    }

    const data = pokemons.map(pokemon => {
        return (
            <CustomizedListItem setPokemonName={setPokemonName}setGameData={props.setGameData} gameData={props.gameData} pokemon={pokemon} name={props.name}></CustomizedListItem>
        )
    })
    return(
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={10}>
            <Grid item xs ={4} >
                <TextField id="outlined-basic" label={props.name + " Player Name"} variant="outlined" onChange={(event) => onPlayerNameChange(event)}/>
            </Grid>
            <Grid item>
                <TextField disabled id="outlined-basic" label={pokemonName} variant="outlined"/>
            </Grid>
            <Grid item xs ={5}>
                <Typography>List of Pokemons</Typography>
                <List>
                    {data}
                </List>
            </Grid>
        </Grid>
    )
}

export default PlayerSection