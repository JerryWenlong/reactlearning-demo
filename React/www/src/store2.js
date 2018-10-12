import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers.js'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'


function myStore (){
	const store = createStore(
		reducers,
		{},
		compose(
			applyMiddleware(createLogger())
		)
	);

	return store
}

export default myStore()