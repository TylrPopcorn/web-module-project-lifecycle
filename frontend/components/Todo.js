import React from 'react'

export default class Todo extends React.Component {

  clickHandler = () => {
    this.props.toggleCompleted(this.props.todo.id)
  }

  render() {
    //console.log(this.props.todo.id)

    return (
      <div>

        <li onClick={this.clickHandler}>{this.props.todo.name}
          {this.props.todo.completed ? <span> ✔️ </span> : <span></span>}
        </li>
      </div>
    )
  }
}
