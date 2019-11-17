import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import Add from "../Add/Add";
import uuid from "uuid";
import DisplayList from "../DisplayList/DisplayList";

import "./List.css";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      toggleStatus: false,
      editBucketName: "",
      editTodoName: "",
      editIndex: "",
      todoname: "",
      bucketname: "",
      selectedVal: "",
      uniqueBucket: [],
      checked: false
    };
  }

  updateBucketList = () => {
    const uniqueArr = [
      ...new Set(this.state.items.map(data => data.bucketname))
    ];

    this.setState({ uniqueBucket: uniqueArr });
  };
  addItem = item => {
    this.state.items.push(item);
    this.setState({ items: this.state.items });
  };

  onDeleteTodo = index => {
    const bucketname = this.state.items[index].bucketname;
    var uniqueBucket = this.state.uniqueBucket.filter(name => {
      return name !== bucketname;
    });

    this.state.items.splice(index, 1);
    this.setState({
      items: this.state.items,
      uniqueBucket: uniqueBucket
    });
    ToastsStore.success("Deleted Successfully!");
    this.updateBucketList();
  };

  onEditTodo = (index, id) => {
    this.setState({
      toggleStatus: true,
      selectedVal: this.state.items[index].bucketname,
      todoname: this.state.items[index].todoname,
      editIndex: id
    });
  };

  handleChange = e => {
    this.setState({
      selectedVal: e.target.value
    });
  };

  handleOptionChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({
      [nam]: val
    });
  };

  reset = () => {
    this.setState({
      bucketname: "",
      todoname: "",
      selectedVal: ""
    });
  };

  onSave = e => {
    e.preventDefault();
    if (this.state.selectedVal !== "" && this.state.todoname !== "") {
      let item = {
        id: uuid.v4(),
        bucketname: this.state.selectedVal,
        todoname: this.state.todoname,
        done: false
      };
      this.addItem(item);
      ToastsStore.success("Added Successfully!");
      this.reset();
      this.updateBucketList();
    } else {
      ToastsStore.error("Fields are empty");
    }
  };

  onSaveEdit = e => {
    e.preventDefault();
    if (this.state.selectedVal !== "" && this.state.todoname !== "") {
      var items = [...this.state.items];
      var index = items.findIndex(todo => todo.id === this.state.editIndex);

      items[index].bucketname = this.state.selectedVal;
      items[index].todoname = this.state.todoname;

      this.setState({
        items,
        toggleStatus: false
      });
      ToastsStore.success("Saved Successfully!");
      this.reset();
      this.updateBucketList();
    } else {
      ToastsStore.error("Fields are empty");
    }
  };

  onCheck = item => {
    var items = [...this.state.items];
    var index = items.findIndex(todo => todo.id === item.id);

    items[index].done = !items[index].done;

    this.setState({ items, checked: !this.state.checked });
  };

  render() {
    const {
      items,
      uniqueBucket,
      selectedVal,
      todoname,
      toggleStatus,
      editBucketName,
      editTodoName,
      editIndex
    } = this.state;
    return (
      <div className="container mt-5">
        <ToastsContainer store={ToastsStore} />
        <div className="row">
          <div className="todo-container col-md-10">
            <div className="row header">
              {toggleStatus ? <h2>Edit Todo</h2> : <h2>Add Todo</h2>}
            </div>
            <div className="row main">
              <div className="col-md-4 add-container">
                <Add
                  addItem={this.addItem}
                  uniqueBucket={uniqueBucket}
                  items={items}
                  todoname={todoname}
                  selectedVal={selectedVal}
                  toggleStatus={toggleStatus}
                  editTodoName={editTodoName}
                  editBucketName={editBucketName}
                  editIndex={editIndex}
                  handleChange={this.handleChange}
                  handleOptionChange={this.handleOptionChange}
                  onSaveEdit={this.onSaveEdit}
                  onSave={this.onSave}
                />
              </div>
              <div className="col-md-8 list-container">
                <DisplayList
                  items={items}
                  onDeleteTodo={this.onDeleteTodo}
                  onEditTodo={this.onEditTodo}
                  onCheck={this.onCheck}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
