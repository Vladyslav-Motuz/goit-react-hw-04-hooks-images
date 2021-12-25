import React from 'react';
import Load from "react-loader-spinner";
export default class Loader extends React.Component {
  //other logic
  render() {
    return (
      <Load
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  }
}