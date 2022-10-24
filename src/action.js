
let idSeq = Date.now()
export function createSet(payload) {
    return {
        type: 'set',
        payload
    }
}

export function createAdd(text) {
    return (dispatch, getstate) => {

        setTimeout(() => {
            const { todos } = getstate()
            if (!todos.find(todo => todo.text === text)) {
                dispatch({
                    type: 'add',
                    payload: {
                        id: ++idSeq,
                        text,
                        complete: false
                    }
                })
            }

        }, 3000)

    }
}

export function createRemove(payload) {
    return {
        type: 'remove',
        payload
    }
}

export function createToggle(payload) {
    return {
        type: 'toggle',
        payload
    }
}