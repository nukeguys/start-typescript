import * as React from 'react';
import './App.css';

import Profile from './components/Profile';
import CounterContainer from './store/containers/CounterContainer';
import TodoListContainer from './store/containers/TodoListContainer';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Profile name="lucas" job="developer"/>
        <CounterContainer />
        <TodoListContainer />
      </div>      
    );
  }
}

export default App;
