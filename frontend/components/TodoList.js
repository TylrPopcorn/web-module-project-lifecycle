import React from 'react'
import Todo from "./Todo"

export default class TodoList extends React.Component {
  render() {
    //console.log(this)

    return (

      <div>

        <ul>
          { /* Hide/Show any completed chores */
            this.props.todos.reduce((acc, td) => {
              console.log(acc, td)

              //**** BUG LOCATED HERE ****/
              if (this.props.state.displayCompleted || !td.completed) return acc.concat(
                (<Todo key={td.id} todo={td} toggleCompleted={this.props.toggleCompleted} />)
              )
            }, [])
            //-----------------------------\\
          }

          {/* this.props.todos.map(todo => {
            return (<Todo key={todo.id} todo={todo} toggleCompleted={this.toggleCompleted} />)
          }) */}
        </ul>
      </div>
    )
  }
}
