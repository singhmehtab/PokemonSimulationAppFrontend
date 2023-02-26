import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {useState} from "react";
import Button from "@mui/material/Button";

const CustomizedListItem = (props) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const getDetails = (data) => {
        return "Height: " + data["height"] + ",Weight: " + data["weight"]
    }

    const selectPokemon = (pokemon) => {
        const key = props.name === "First" ? "firstPlayerPokemonName":"secondPlayerPokemonName"
        var gameData = props.gameData
        gameData[key] = pokemon["name"]
        props.setGameData(gameData)
        console.log(gameData)
        props.setPokemonName(pokemon["name"])
    }

    return (
        <>
            <ListItemButton onClick={() => handleClick()} key={props.pokemon["name"]}>
                <ListItemText primary={props.pokemon["name"]} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={getDetails(props.pokemon)} />
                    </ListItemButton>
                </List>
                <Button onClick={() => selectPokemon(props.pokemon)}>Select Me</Button>
            </Collapse>
        </>
    )
}

export default CustomizedListItem;