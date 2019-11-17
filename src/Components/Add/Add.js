import React, { Component } from "react";

import "./Add.css";
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {
      uniqueBucket,
      selectedVal,
      todoname,
      toggleStatus,
      onSaveEdit,
      handleChange,
      handleOptionChange,
      onSave
    } = this.props;
    return (
      <div className="input-container">
        {toggleStatus ? (
          <form
            type="submit"
            name="EditTodo"
            className="EditTodo"
            onSubmit={onSaveEdit}
          >
            <div
              className="mt-5"
              style={{
                position: "relative",

                border: 0,
                padding: 0,
                margin: 0
              }}
            >
              <select
                style={{
                  position: "absolute"
                }}
                onChange={handleChange}
                className="form-control"
              >
                {uniqueBucket.map((item, key) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                name="displayValue"
                id="displayValue"
                style={{
                  position: "absolute",

                  width: "90%",

                  border: "none"
                }}
                type="text"
                className="form-control"
                value={selectedVal}
                onChange={handleChange}
                placeholder="Bucket Name"
              />
            </div>
            <br />
            {/* <input type="text" /> */}
            <input
              type="text"
              className="form-control mb-custm mt-custm"
              value={todoname}
              name="todoname"
              placeholder="Todo Name"
              onChange={handleOptionChange}
            />
            <input
              type="submit"
              value="Save Todo"
              className="btn btn-warning mb-2"
            />
          </form>
        ) : (
          <form
            type="submit"
            name="addTodo"
            className="AddTodo"
            onSubmit={onSave}
          >
            <div
              className="mt-5"
              style={{
                position: "relative",

                border: 0,
                padding: 0,
                margin: 0
              }}
            >
              <select
                style={{
                  position: "absolute"
                }}
                onChange={handleChange}
                onClick={handleChange}
                className="form-control"
              >
                {uniqueBucket.map((item, key) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                name="displayValue"
                id="displayValue"
                style={{
                  position: "absolute",

                  width: "90%",

                  border: "none"
                }}
                type="text"
                className="form-control"
                value={selectedVal}
                onChange={handleChange}
                placeholder="Bucket Name"
              />
            </div>
            <br />
            {/* <input type="text" /> */}
            <input
              type="text"
              className="form-control mb-custm mt-custm"
              value={todoname}
              name="todoname"
              placeholder="Todo Name"
              onChange={handleOptionChange}
            />

            <input
              type="submit"
              value="Add Todo"
              className="btn btn-warning mb-2"
            />
          </form>
        )}
      </div>
    );
  }
}

export default Add;
