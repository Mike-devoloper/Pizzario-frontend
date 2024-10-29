import React, { Component } from "react";

interface CarState {
    color: string;
    brand: string;
    year: number;
}

class Test extends Component<{}, CarState> {
    constructor(props: {}) {
      super(props);
      this.state = {
        brand: "Ford",
        color: "red",
        year: 1964
      };
    }

    // Lifecycle method: Runs after the component mounts
    componentDidMount() {
      console.log("Component did mount");
    }

    // Lifecycle method: Runs when the component updates
    componentDidUpdate() {
      console.log("Component updated");
    }

    // Lifecycle method: Runs before the component unmounts
    componentWillUnmount() {
      console.log("Component will unmount");
    }

    // Custom method to change color
    changeColor = () => {
      this.setState({ color: "blue" });
    };

    // Render method
    render() {
      return (
        <div>
          <h1>My {this.state.brand}, It is a {this.state.color}</h1>
          <button type="button" onClick={this.changeColor}>
            Change color
          </button>
        </div>
      );
    }
}

export default Test;
