import React from 'react';
import Dashboard from './dashboard';
import ErrorPage from './errorPage';
import LoadingPage from './loadingPage';
import pokeball from './assets/pokeball.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pokemon: []
    };
  }

  componentDidMount() {
    fetch('https://asia-east2-cs3219-pokedex.cloudfunctions.net/pokedex/api/pokemon')
      .then(result => result.json())
      .then(result => {
        this.setState({
          pokemon: result.data,
          isLoaded: true,
        });
      },
      error => {
        console.log(error);
        this.setState({
          isLoaded: true,
          error: error
        });
      });
  }

  render() {
    const { error, isLoaded, pokemon } = this.state;
    return (
      <div style={{display:'flex', alignItems:'center', justifyContent: 'center', margin: '2vw', flexDirection: 'column'}}>
        <div style={{display: 'flex', alignItems:'center', justifyContent: 'center', margin: '2vw'}}>
          <img src={pokeball} style={{height: '5vw', width: '5vw', marginRight: '1vw'}} />
          <p>Welcome to my Pokedex!</p>
        </div>
        {
          error
            ? <ErrorPage error={error} />
            : !isLoaded
              ? <LoadingPage />
              : <Dashboard pokemon={pokemon} />
        }
      </div>
    );
  }
}

export default App;
