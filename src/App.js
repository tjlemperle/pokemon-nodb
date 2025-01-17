import React, {Component} from 'react'
import Header from './Components/Header'
import Finder from './Components/Finder'
import './App.css'
import Pokedex from './Components/Pokedex'
import axios from 'axios'

class App extends Component{
  constructor(){
    super()

    this.state = {
      caughtPokemon : [{id: 1, name: 'bulbasaur', image: 'test'}],

    }

    this.catchPokemon = this.catchPokemon.bind(this)
    this.saveName = this.saveName.bind(this)
    this.releasePokemon = this.releasePokemon.bind(this)
  }


  componentDidMount(){
    axios.get('http://localhost:3333/api/pokemon')
      .then(res => {
        this.setState({
          caughtPokemon: res.data
        })
      })
  }

  catchPokemon(pokemon){
    axios.post('http://localhost:3333/api/pokemon', {pokemon})
      .then(res => {
        this.setState({
          caughtPokemon: res.data
        })
      })
  }

  saveName(id, newName){
    axios.put(`http://localhost:3333/api/pokemon/${id}`, {name: newName})
      .then(res => {
        this.setState({
          caughtPokemon: res.data
        })
      })
  }

  releasePokemon(id){
    axios.delete(`http://localhost:3333/api/pokemon/${id}`)
      .then(res => {
        this.setState({
          caughtPokemon: res.data
        })
      })
  }

  render(){
    return(
      <div className='App'>
        <Header />
        <Finder catchPokemon= {this.catchPokemon}/>
        <Pokedex 
        saveName = {this.saveName}
        releasePokemon = {this.releasePokemon}
        caughtPokemon = {this.state.caughtPokemon} 
        />
      </div>
    )
  }
}

export default App