import React, { Component } from "react";
import axios from "axios";
import "./input.css";
export default class Input extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      username: "",
      password: "",
      d_id: "",
      val: false,
      data: [],
      user: {
        id: "",
        name: "",
        pass: ""
      },
      del: {
        id: ""
      }
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleForm = event => {
    event.preventDefault();
    this.setState(
      {
        user: {
          id: this.state.id,
          name: this.state.username,
          pass: this.state.password
        }
      },
      async () => {
        console.log(this.state.user);

        let a = { b: this.state.user };
        console.log(a);
        await axios
          .post("http://localhost:3005/createUser", a)
          .then(response => {
            console.log(response);
          });
      }
    );
    this.handleView();
    this.Clear();
  };
  handleDelete = event => {
    event.preventDefault();
    this.setState(
      {
        del: {
          id: this.state.d_id
        }
      },
      async () => {
        let c = { d: this.state.del };
        console.log(c);
        await axios
          .post("http://localhost:3005/deleteUser", c)
          .then(response => {
            console.log(response);
          });
      }
    );
    this.handleView();
    this.Clear();
  };
  handleUpdate = event => {
    event.preventDefault();
    this.setState(
      {
        user: {
          id: this.state.id,
          name: this.state.username,
          pass: this.state.password
        }
      },
      async () => {
        console.log(this.state.user);

        let a = { b: this.state.user };
        console.log(a);
        await axios
          .post("http://localhost:3005/updateUser", a)
          .then(response => {
            console.log(response);
          });
      }
    );
    this.handleView();
    this.Clear();
  };
  handleView = ()=> {
    axios.post("http://localhost:3005/viewUser").then(response => {
      console.log(response.data);
      this.setState({
        data: response.data,
        val: true
      },()=>{
        this.handleView();
      });
    });
  };
  Clear = () => {
    this.setState({
      id: "",
      username: "",
      password: "",
      d_id: "",
      val: false
    });
  };
  render() {
    return (
      <>
        <div className="main">
          <form onSubmit={this.handleForm}>
            <div className="form">
              <input
                className="input"
                type="text"
                name="id"
                value={this.state.id}
                placeholder="Enter Your ID"
                onChange={this.handleChange}
              />
              <input
                className="input"
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Enter Your Name"
                onChange={this.handleChange}
              />
              <input
                className="input"
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Enter Your Password"
                onChange={this.handleChange}
              />
            </div>
            <div className="btn1">
              <input type="submit" value="Add" onClick={this.state.viewUser} />
              <p>or</p>
              <input type="submit" value="Update" onClick={this.handleUpdate} />
            </div>
          </form>
          <hr />
          <form onSubmit={this.handleDelete}>
            <div className="form2">
              <input
                className="input"
                type="text"
                name="d_id"
                value={this.state.d_id}
                placeholder="Enter Your ID To Delete"
                onChange={this.handleChange}
              />
            </div>
            <div className="btn2">
              <input type="submit" value="Delete" />
            </div>
          </form>
        </div>
        <hr />
        <button onClick={this.handleView} className="view">
          view
        </button>
        {/* <p>{this.state.id}</p>
        <p>{this.state.username}</p>
        <p>{this.state.password}</p>
        <p>{this.state.d_id}</p> */}
        {this.state.val && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th className="id">Id</th>
                  <th className="name">Name</th>
                  <th className="pass">Password</th>
                </tr>
              </thead>
              {this.state.data.map((value, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td className="uid">{value.id}</td>
                      <td className="uname">{value.username}</td>
                      <td className="upass">{value.password}</td>
                    </tr>
                  </tbody>
                );
              })}
              <tfoot>
                <tr>
                  <td className="fid"></td>
                  <td className="fname"></td>
                  <td className="fpass"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </>
    );
  }
}
