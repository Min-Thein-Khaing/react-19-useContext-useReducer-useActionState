import React, { useReducer } from 'react'

type FormState = {
  name: string,
  city: string,
  country: string
}
type FormAction = {
  type:"UPDATE_FIELD",
  field:keyof FormState,
  value:string
} | {
  type:"RESET"
}
const initialState = {
  name: "",
  city: "",
  country: ""
}

const reducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]:action.value
      }
    case "RESET":
      return initialState
    default:
      return state
}
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState )
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submit",state)
    dispatch({type:"RESET"})
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    dispatch({type:"UPDATE_FIELD",field:name as keyof FormState,value})
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input value={state.name} name='name' onChange={(e) => handleOnChange(e)} type="text" id="name" />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input value={state.city} name='city' onChange={(e) => handleOnChange(e)} type="text" id="city" />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input value={state.country} name='country' onChange={(e) => handleOnChange(e)} type="text" id="country" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default App