var _state = {
	clickCount: 0
}
export function clickCountReducer (currentState=_state, action){
	switch (action.type){
		case "ACTION_CLICK_COUNT":
			var newState = {
				...currentState,
				clickCount: currentState.clickCount + 1
			}
			return newState

		default: 
			return currentState
	}
}