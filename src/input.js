import React, { Component } from "react";
import axios from "axios";
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

    this.Clear();
  };
  handleView = event => {
    event.preventDefault();
    axios.post("http://localhost:3005/viewUser").then(response => {
      console.log(response.data);
      this.setState({
        data: response.data,
        val: true
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
        <form onSubmit={this.handleForm}>
          <input
            type="text"
            name="id"
            value={this.state.id}
            placeholder="enter ur id"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="enter ur name"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="enter ur password"
            onChange={this.handleChange}
          />
          <input type="submit" value="Add" />
          <input type="submit" value="Update" onClick={this.handleUpdate} />
        </form>
        <form onSubmit={this.handleDelete}>
          <input
            type="text"
            name="d_id"
            value={this.state.d_id}
            placeholder="enter ur id to delete"
            onChange={this.handleChange}
          />
          <input type="submit" value="Delete" />
        </form>
        <button onClick={this.handleView}>view</button>
        <p>{this.state.id}</p>
        <p>{this.state.username}</p>
        <p>{this.state.password}</p>
        <p>{this.state.d_id}</p>
        {/* {this.state.val && ( */}
          <div>
            
                <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Password</th>
                  </tr>
                </thead>
                {this.state.data.map((value,index) => {
              return (
                  <tbody key={index}>
                    <tr>
                      <td>{value.id}</td>
                      <td>{value.username}</td>
                      <td>{value.password}</td>
                    </tr>
                  </tbody>
                  );
                })}
                </table>
          </div>
        {/* )} */}
      </>
    );
  }
}
