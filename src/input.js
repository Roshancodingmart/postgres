import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";
// import imageCompression from "browser-image-compression"
import "./input.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default class Input extends Component {
  constructor() {
    super();
    this.state = {
      ad: true,
      lo: false,
      bool:true,
      id: "",
      username: "",
      password: "",
      signup: true,
      signin: false,
      img: "",
      sid: "",
      susername: "",
      spassword: "",
      d_id: "",
      admin: "",
      // bat:false,
      in: false,
      count: 0,
      up: false,
      data: [],
      bata: "",
      base: "",
      sname: [],
      cretab: {
        ide: "",
        url: "",
        bol: false
      },
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
  // componentDidMount = () => {
  //   this.handleDisplay();
  // };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  // handleCheck = () => {
  //   let c = { d: this.state.id };
  //   axios.post("http://localhost:3005/checkUser", c).then(response => {
  //     alert("j");
  //     console.log(response);
  //   });
  // };
  handleSignup = event => {
    event.preventDefault();
    localStorage.setItem("admin", this.state.username);
    localStorage.setItem("id", this.state.id);
    console.log(this.state.username);
    console.log(this.state.id);
    this.setState(
      {
        user: {
          id: this.state.id,
          name: this.state.username,
          pass: this.state.password
        },
        admin: this.state.username,
        lo: true
      },
      async () => {
        console.log(this.state.user);
        // this.handleCheck();
        let a = { b: this.state.user };
        // if(localStorage.getItem('admin')==""){
        //   this.setState({
        //     bool:false
        //   })
        // }
        await axios
          .post("http://localhost:3005/createUser", a)
          .then(response => {
            // console.log(response)
            alert("second");
            this.setState({
              in: true,
              lo: true,
              ad: true,
              bool:true
            });
          });
      }
    );
    // window.location.reload(false);
    // this.handleSignup();
    this.handleDisplay();
    this.handleTable();
    this.handleMain();
    this.Clear();
  };
  handleSignin = event => {
    event.preventDefault();
    this.setState(
      {
        user: {
          id: this.state.sid,
          name: this.state.susername,
          pass: this.state.spassword
        }
      },
      async () => {
        let a = { b: this.state.user };
        await axios
          .post("http://localhost:3005/signinUser", a)
          .then(response => {
            // console.log(response.data[0].id)
            // console.log(response.data[0].username)
            this.setState({
              sname: response.data[0].username,
              in: true,
              admin: response.data[0].username,
              lo: true,
              bool:true
            });
            localStorage.setItem("id", response.data[0].id);
          });
        localStorage.setItem("admin", this.state.admin);
        this.handleDisplay();
        this.handleMain();
        this.handleTable();
      }
    );
    // this.handleTable();

    this.Clear();
  };
  handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem("id");
    localStorage.removeItem("url")
    this.setState({
      lo: false,
      ad: true,
      bool:true
    });
  };
  handleMain = () => {
    this.setState({
      ad: false
    });
  };
  handleDelete = event => {
    // console.log(event.target.id)
    this.setState(
      {
        del: {
          id: event.target.id
        }
      },
      async () => {
        let c = { d: this.state.del };
        // console.log(c);
        await axios
          .post("http://localhost:3005/deleteUser", c)
          .then(response => {
            console.log(response);
          });
      }
    );
    this.handleTable();
    this.Clear();
  };
  handleEdit = event => {
    window.scrollTo(0, 0);
    // console.log(event.target.id)
    // console.log(event.target.name)
    // console.log(event.target.value)
    this.setState({
      up: true,
      id: event.target.id,
      username: event.target.name,
      password: event.target.value
    });
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
        // console.log(this.state.user);

        let a = { b: this.state.user };
        // console.log(a);
        await axios
          .post("http://localhost:3005/updateUser", a)
          .then(response => {
            console.log(response);
          });
      }
    );
    this.handleTable();
    this.Clear();
  };
  handleView = () => {
    let counts = {
      count: this.state.count + 10
    };
    axios.post("http://localhost:3005/viewUser", counts).then(response => {
      // console.log(response.data);
      this.setState(
        {
          data: response.data,
          val: true,
          count: counts.count
        },
        () => {
          this.handleView();
        }
      );
    });
  };
  handlePrint = () => {
    html2canvas(document.querySelector("#print")).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, 0, 2);
      pdf.save("user's table.pdf");
    });
  };

  handleTable = () => {
    let count = {
      count: this.state.count + 10
    };
    axios.post("http://localhost:3005/tableUser", count).then(response => {
      // console.log(response.data);
      this.setState({
        data: response.data,
        val: true,
        count: count.count
      });
    });

    // console.log("bottom");
  };

  handleImage = event => {
    var fileSelected = event.target.files;
    let base64value = "";

    if (fileSelected.length > 0) {
      var fileToLoad = fileSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = fileLoadEvent => {
        base64value = fileLoadEvent.target.result;

        this.setState(
          {
            base: base64value,bool:true
          },
          () => {
            localStorage.setItem('url',base64value)
            // console.log(this.state.base);
            let x = localStorage.getItem("id");
            let c = localStorage.getItem("admin");

            this.setState(
              {
                cretab: {
                  ide: x,
                  url: this.state.base,
                  bol: true,
                  bata: c
                },
                bool:true
              },
              () => {
                let y = { z: this.state.cretab };
                axios.post("http://localhost:3005/insertImage", y);
              }
            );
          }
        );
        this.handleDisplay();
      };
      const base = fileReader.readAsDataURL(fileToLoad);
    }
    this.handleDisplay();
  };

  handleDisplay = async () => {
    // window.location.reload();
    this.setState({
      bool:true
    })
    if(!localStorage.getItem('url')){
this.setState({
  bool:false
})
    }
    let id = { a: localStorage.getItem("id") };
    let i = { j: id };
console.log(id.a)
    await axios.post("http://localhost:3005/displayTable", i).then(response => {
      // console.log(response.data.id);
      // console.log(response.data.url);
      // console.log(response.data.bol);
      if(response.data.bol){
        this.setState({
        bata: response.data.url,
        bool:response.data.bol
      })}
    });
  };
  displaySignup = () => {
    this.setState({
      signup: true,
      signin: false,
      ad: true
    });
  };
  displaySignin = () => {
    this.setState({
      signup: false,
      signin: true,
      ad: true
    });
  };
  imageUpdate=(event)=>{
   
    
     var fileSelected = event.target.files;
    let base64value = "";

    if (fileSelected.length > 0) {
      var fileToLoad = fileSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = fileLoadEvent => {
        base64value = fileLoadEvent.target.result;

        this.setState(
          {
            base: base64value,
            bata:base64value
          },
          () => {
            // console.log(this.state.base);
            let id = { a: localStorage.getItem("id"),
            url:this.state.base };
            let i = { j: id };
                axios.post("http://localhost:3005/updateImage", i);
    })
              }
              const base = fileReader.readAsDataURL(fileToLoad);
          }

        
        // this.handleDisplay();
      };
      
    
    
  
  Clear = () => {
    this.setState({
      id: "",
      username: "",
      password: "",
      d_id: "",
      sid: "",
      susername: "",
      spassword: "",
      up: false
    });
  };
  componentWillMount = () => {
    document.addEventListener("scroll", () => {
      // console.log(document.documentElement.scrollHeight);
      // console.log(window.innerHeight);
      // console.log(window.scrollY);
      let total = document.documentElement.scrollHeight - window.innerHeight;
      let scrolV = window.scrollY;
      if (scrolV === total) {
        this.handleTable();
      }
    });
    let a = localStorage.getItem("admin");
    // let b = localStorage.getItem('id');
    // this.handleDisplay();
    this.setState(
      {
        admin: a
      },
      () => {
        if (this.state.admin) {
          this.handleDisplay();
          this.handleTable();
          this.setState({
            ad: false,
            lo: true,
            bool:true
          });
        }
        else{
          this.handleDisplay();
          this.handleTable();
          this.setState({
            ad: true,
            lo: false,
            bool:true
          });
        }
      }
    );
  };

  render() {
    return (
      < div className="body">
        <div className="header-main">
          <div className="btn-holder">
            {!this.state.lo && (
              <button onClick={this.displaySignup}>Sign Up</button>
            )}
            {!this.state.lo && (
              <button onClick={this.displaySignin}>Sign In</button>
            )}
            {this.state.lo && (
              <button onClick={this.handleLogout}>Log Out</button>
            )}
          </div>
        </div>
        {this.state.ad && (
          <div className="main">
            {/* // todo this is  */}
            {/* // ! SIGN UP */}

            {this.state.signup && (
              <form onSubmit={this.handleSignup}>
                <div className="form">
                  {!this.state.up && <h3>SIGN UP</h3>}
                  {this.state.up && <h3>UPDATE</h3>}
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
                  {!this.state.up && (
                    <input
                      type="submit"
                      value="Sign Up"
                      onClick={this.state.viewUser}
                    />
                  )}
                  {this.state.up && (
                    <input
                      type="submit"
                      value="Update"
                      onClick={this.handleUpdate}
                    />
                  )}
                </div>
              </form>
            )}

            <p>{/* // todo this is 
          // ! SIGN IN */}</p>
            {this.state.signin && (
              <form onSubmit={this.handleSignin}>
                <div className="form">
                  <h3>SIGN IN</h3>
                  <input
                    className="input"
                    type="text"
                    name="sid"
                    value={this.state.sid}
                    placeholder="Enter Your ID"
                    onChange={this.handleChange}
                  />
                  <input
                    className="input"
                    type="text"
                    name="susername"
                    value={this.state.susername}
                    placeholder="Enter Your Name"
                    onChange={this.handleChange}
                  />
                  <input
                    className="input"
                    type="password"
                    name="spassword"
                    value={this.state.spassword}
                    placeholder="Enter Your Password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="btn1">
                  {!this.state.up && (
                    <input
                      type="submit"
                      value="Sign In"
                      onClick={this.state.viewUser}
                    />
                  )}
                  {this.state.up && (
                    <input
                      type="submit"
                      value="Update"
                      onClick={this.handleUpdate}
                    />
                  )}
                </div>
              </form>
            )}
          </div>
        )}
        <hr />
        {!this.state.ad && (
          <h1>
            <center>{this.state.admin.toUpperCase()} is Signed in</center>
          </h1>
        )}
        {!this.state.ad && (
          <center>
   
              {!this.state.bool && <form>
                <label className="photo">
                  <svg viewBox="0 0 24 24" className="upload">
                    <g>
                      <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
                      <circle cx="8.868" cy="8.309" r="1.542"></circle>
                    </g>
                  </svg>
                  <input
                    type="file"
                    name="img"
                    value={this.state.img}
                    onChange={this.handleImage}
                  />
                </label>
              </form>}
            

            
              {this.state.bool && <div>
                <img
                  src={this.state.bata}
                  // alt={this.state.bata.name}
                  className="disp"
                ></img>
              </div>}
           <div className="update">
              {this.state.bool && <label className="update-btn">
              Update
                <input name="Update" className="update-btn2" type="file" onChange={this.imageUpdate} />
              </label>}
           </div>
          </center>)
        }
        {this.state.val && (
          <>
            <div className="table-container" id="print">
              <table className="table" id="table-to-xls">
                <thead>
                  <tr>
                    <th className="id">Id</th>
                    <th className="name">Name</th>
                    <th className="pass">Password</th>
                    <th className="mutate">
                      <button
                        onClick={this.handlePrint}
                        className="print-container1"
                      >
                        <img src="printing.svg" alt="img" className="print1" />
                      </button>
                    </th>
                    <th>
                      <ReactHTMLTableToExcel
                        className="print-container2"
                        table="table-to-xls"
                        filename="user's list"
                        sheet="sheet1"
                        buttonText={
                          <img src="excel.png" alt="img" className="print2" />
                        }
                      />
                    </th>
                  </tr>
                </thead>
                {this.state.data.map((value, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td className="uid">{value.id}</td>
                        <td className="uname">{value.username}</td>
                        <td className="upass">{value.password}</td>
                        <td>
                          <button
                            type="submit"
                            id={value.id}
                            name={value.username}
                            value={value.password}
                            onClick={this.handleEdit}
                            className="btn1-input"
                          >
                            <img src="edit.png" alt="img" className="edit" />
                          </button>
                        </td>
                        <td>
                          <button
                            type="submit"
                            className="btn2-input"
                            id={value.id}
                            onClick={this.handleDelete}
                          >
                            X
                          </button>
                        </td>
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
          </>
        )}
      </div>
    );
  }
}
