import React, { Component } from 'react';
import './App.css';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

const DATA_URL = 'https://jsonplaceholder.typicode.com/users';

class App extends Component {
  constructor() {
    super();

    this.state={
      users: [],
      searchField:""
    };
  }

  componentDidMount() {
    fetch(DATA_URL).then(response=>response.json())
    .then(resp=>{
      this.setState({
        users: resp
      });
    });
  }

  render() {
    const { users, searchField} = this.state;
    let filteredUsers=users.filter(user=>{
      if (user.name.toLowerCase().includes(searchField.toLowerCase())) return user.name;
    });
    return (
      <div className="App">
        <SearchBox 
          placeHolder={"Search Monsters"}
          handleChange={e=>{
            this.setState({
                searchField:e.target.value,
            },()=>{
                console.log("set state: ",this.state);
            });
        }}/>
        <CardList monsters={filteredUsers}/>
      </div>
    );
  }
}

export default App;
