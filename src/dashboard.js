import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import pokeball from './assets/pokeball.png';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

function isInt(value) {
  return !isNaN(value)
      && parseInt(Number(value)) == value
      && !isNaN(parseInt(value, 10));
}

async function handlePost(state) {
  if (state.name === null || state.pokedexNumber === null || state.primaryType === null) {
    alert('Name, Pokedex Number, and Primary Type cannot be empty');
    return;
  }
  if (state.name.split(" ").length > 1) {
    alert('Name cannot have more than one word (e.g. you cannot put John Cena >_< )');
    return;
  }
  if (!isInt(state.pokedexNumber)) {
    alert('Pokedex Number must be an integer');
    return;
  } else {
    state.pokedexNumber = parseInt(state.pokedexNumber);
  }
  if (state.secondaryType === null) {
    delete state.secondaryType;
  }
  fetch('https://asia-east2-cs3219-pokedex.cloudfunctions.net/pokedex/api/pokemon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state)
  }).then(result => {
    console.log(result);
    alert('Pokemon Added!');
  });
}

async function handleDelete(state) {
  if (state.name === null) {
    alert('Name cannot be empty');
    return;
  }
  if (state.name.split(" ").length > 1) {
    alert('Name cannot have more than one word (e.g. you cannot put John Cena >_< )');
    return;
  }
  fetch(`https://asia-east2-cs3219-pokedex.cloudfunctions.net/pokedex/api/pokemon/${state.name}`, {
    method: 'DELETE'
  }).then(result => {
    console.log(result);
    alert('Pokemon Deleted!');
  }, error => {
    alert('Error: ' + error);
  });
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      pokedexNumber: null,
      primaryType: null,
      secondaryType: null
    }
  }

  render() {
    const pokemon = this.props.pokemon;
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <TextField id="standard-basic" label="Name" style={{width: '20vw'}} onChange={event => this.setState({ name: event.target.value })}/>
          <TextField id="standard-basic" label="Pokedex Number" style={{width: '20vw'}} onChange={event => this.setState({ pokedexNumber: event.target.value })}/>
          <TextField id="standard-basic" label="Primary Type" style={{width: '20vw'}} onChange={event => this.setState({ primaryType: event.target.value })}/>
          <TextField id="standard-basic" label="Secondary Type (Optional)" style={{width: '20vw'}} onChange={event => this.setState({ secondaryType: event.target.value })}/>
          <div style={{marginTop: '2vw'}}>
            <Button variant="contained" color="primary" style={{marginRight: '1vw'}} onClick={async () => await handlePost(this.state)}>
              Add Pokemon
            </Button>
            <Button variant="contained" color="secondary" style={{marginLeft: '1vw'}} onClick={async () => await handleDelete(this.state)}>
              Delete Pokemon
            </Button>
          </div>
        </div>
        <List subheader={<ListSubheader>Pokemon</ListSubheader>} style={{marginTop: '1vw'}} borderLeft={1} borderRight={1}>
          <Divider />
          {
            pokemon.map(pokemon => (
              <>
                <ListItem>
                  <img src={pokeball} style={{height: '1vw', width: '1vw', marginRight: '1vw'}} />
                  <div>
                    Name: {pokemon.name}, Pokedex Number: {pokemon.pokedexNumber}, Primary Type: {pokemon.primaryType}, Secondary Type: {pokemon.secondaryType ? pokemon.secondaryType : 'None'}
                  </div>
                </ListItem>
                <Divider />
              </>
            ))
          }
        </List>
      </div>
    );
  }
}

export default Dashboard;
