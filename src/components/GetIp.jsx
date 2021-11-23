import React from "react";
import { yourIp_URL } from "./Urls";
class GetIp extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false,
    };
  }

  // ComponentDidMount is used to
  componentDidMount() {
    fetch(yourIp_URL)
      .then((res) => res.json())

      .then((json) => {
        this.setState({ items: [json], DataisLoaded: true });
      });
  }

  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1> Fetching Data! Please wait.... </h1>{" "}
        </div>
      );

    return (
      <div>
        {items.map((e) => (
          <ol key={e}>Your IPAddress is: {e.ip}</ol>
        ))}
      </div>
    );
  }
}

export default GetIp;
