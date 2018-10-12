import { createStore, applyMiddleware, compose } from 'redux'
import { myReducer } from './reducer/myReducer.js'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

let defaultState = {
	companyName: 'vphotos',
	demoObj: {
		name: 'WWW'
	},
	add_to: 0
} //第二个参数 state的最初状态

function myStore (){
	const store = createStore(
		myReducer,// 第一个参数 reducer
		defaultState,
		compose(
			applyMiddleware(createLogger())
		)
	);

	return store
}

export default myStore()