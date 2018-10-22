import {createStore} from 'redux'
import modules from './modules'

export default function configureStore() {
    const store = createStore(
        modules,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}