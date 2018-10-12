var _state = {
	companyName: 'vphotos',
	demoObj: {
		name: 'WWW'
	},
	add_to: 0
}
export function myReducer(currentState=_state, action){
	switch(action.type){
		case "ACTION_CHANGE_NAME":
			var newState = {
				...currentState,
				demoObj: action.demoObj
			};
			return newState

		case "ACTION_TRY_REDUCER":
			var newState = {
				...currentState,
				add_to: currentState.add_to + action.add_to
			}
			// console.log("newState.add_to:" + newState.add_to)
			return newState
		default: 
			return currentState
	}
}
