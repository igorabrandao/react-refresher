import { Component } from "react";

import classes from "./User.module.css";

class User extends Component {
  /*
   * Called right before component is unmounted, equivalent to useEffect(() => { return () => {...} }, []);
   * Clean up function from useEffect
   */
  componentWillUnmount() {
    console.log("User will unmount!");
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

export default User;
