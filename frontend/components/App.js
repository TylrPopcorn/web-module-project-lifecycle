import React from 'react'
import TodoList from "./TodoList"
import TodoForm from "./Form"
import axios from "axios"

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  //Variables:
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleted: true,
  }
  //================FUNCTIONS===========\\
  //-------------
  //-APP.JS:
  toggleCompleted = (id) => { //Patch a todo

    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state,
          ["todos"]: this.state.todos.map(td => {
            if (td.id !== id) {
              return td
            } else {
              return res.data.data
            }
          })
        })
      })
      .catch(err => {
        alert(err)
        this.setState({
          ...this.state,
          ["error"]: err.response.data.message, //update state
        })
      })
  }

  postNewTodo = (evt) => { //Post a todo
    evt.preventDefault()

    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.setState({
          ...this.state,
          ["todoNameInput"]: '',
          ["todos"]: this.state.todos.concat(res.data.data)
        })
      })
      .catch(err => {
        //Set the error

        alert(err); //alert the user.
        this.setState({
          ...this.state,
          ["error"]: err.response.data.message, //update state
        })
      })
  }

  fetchAllTodos = () => { //Grab all todos.
    axios.get(URL) //request HTTP.
      .then(todoInfo => {
        this.setState({
          ...this.state,
          ["todos"]: todoInfo.data.data //update the state.
        })
      })
      .catch(err => { //catch any errors.
        //Set error.
        //console.log(err)

        alert(err); //alert the user.
        this.setState({
          ...this.state,
          ["error"]: err.response.data.message, //update state
        })
      })
  }

  componentDidMount() { //useEffect()
    //fetch all todos from server.
    this.fetchAllTodos(); //get todos.
  }

  //---------
  //FORM.JS:
  NameInputChange = (evt) => { //Each time the todo input box changes
    const { value } = evt.target
    this.setState({
      ...this.state,
      ["todoNameInput"]: value, //update the state for the name input text box.
    })
  }

  toggleDisplayCompleted = () => {
    this.setState({
      ...this.state,
      ["displayCompleted"]: !this.state.displayCompleted
    })
  }

  //--------------START----------------\\
  render() {
    //Dummy data:
    /* let todos = [{
       "id": "Ic4B0",
       "name": "laundry",
       "completed": false
     },
     ]; */
    let { todos } = this.state;

    return (
      <div>
        {/*Make the error label*/}
        {this.state.error ?
          <div id="error">{this.state.error}</div> :
          <div></div>
        }


        <TodoList toggleCompleted={this.toggleCompleted} id="todos" state={this.state} todos={todos} /> {/*Make the todo list*/}

        <TodoForm id="todoForm" state={this.state} NameInputChange={this.NameInputChange} postNewTodo={this.postNewTodo} toggleDisplayCompleted={this.toggleDisplayCompleted} /> {/*Make the form*/}
      </div>
    )
  }
}
