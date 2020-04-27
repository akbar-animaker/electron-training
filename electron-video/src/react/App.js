import React, { Component } from "react";


class App extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    navigator.getUserMedia({ video: true, audio: true }, (localMediaStream) => {
      debugger
      this.setState({
        src:  window.URL.createObjectURL(localMediaStream)
      })
    }, this.errorCallback)
  }

  errorCallback = (e) => {
    alert('Error', e)
  }

  render() {
    return (
      <video autoplay ref={this.myRef} onloadedmetadata={() => {

      }}/>
    )
  }
}

export default App;
