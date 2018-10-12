import { combineReducers } from 'redux'
import { clickCountReducer } from './reducer/clickCountReducer.js'
import { myReducer } from './reducer/myReducer.js'

const reducers = combineReducers({
	myReducer: myReducer,
	clickCountReducer: clickCountReducer
})

export default reducers