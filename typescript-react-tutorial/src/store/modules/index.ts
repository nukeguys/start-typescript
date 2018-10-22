import { combineReducers } from 'redux'
import counter, { ICounterState } from './counter';
import todos, { TodosState } from './todos';

export default combineReducers({
    counter,
    todos,
});

export interface IStoreState {
    counter: ICounterState;
    todos: TodosState;
}