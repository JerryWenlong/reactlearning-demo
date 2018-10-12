export function changeName(inputVal){
	return {
		type:'ACTION_CHANGE_NAME',
		demoObj: {
  		name: inputVal
  	}
	}
}

export function updateClickCount(){
	return {
		type: "ACTION_CLICK_COUNT"
	}
}