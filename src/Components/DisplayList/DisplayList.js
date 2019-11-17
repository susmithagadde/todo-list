import React, { Component } from "react";

import "./DisplayList.css";
class DisplayList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { items, onCheck } = this.props;

    return (
      <div className="tasks">
        <h1>To-Do List</h1>

        {items.map((item, key) => (
          <div key={key}>
            <label htmlFor="label-1">
              <input
                id="label-1"
                type="checkbox"
                checked={item.done}
                onChange={() => onCheck(item)}
              />
              <h3>{item.todoname}</h3>

              <p>{item.bucketname}</p>
              <i
                className="fa fa-edit"
                onClick={() => this.props.onEditTodo(key, item.id)}
              ></i>
              <i
                className="fa fa-trash"
                onClick={() => this.props.onDeleteTodo(key)}
              ></i>
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default DisplayList;
