// import {Provider} from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers';

const initialState = {}

const middleware = [thunk]
const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // Redux 插件开启：
        window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    
)
export default store