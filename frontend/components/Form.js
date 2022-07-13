import React from 'react'

export default class Form extends React.Component {

  clickHandler = () => {
    this.props.toggleDisplayCompleted()
  }

  render() {
    //console.log(this.props.state)

    return (
      <div>
        <form onSubmit={this.props.postNewTodo}>
          {/*console.log(this.props)*/}

          <input type="text" placeholder="Type todo" value={this.props.state.todoNameInput} onChange={this.props.NameInputChange} />

          <button>Add</button>
        </form>

        { //This works but only if all items are checked off. I spent a couple of hours trying to figure out why it bugged out but I am not sure. :(
          /*
          <button onClick={this.clickHandler}>{this.props.state.displayCompleted ? 'Hide' : 'Show'} Completed</button>
          */
        }
      </div>
    )
  }
}
