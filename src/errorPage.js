import React from 'react';

class ErrorPage extends React.Component {
  render() {
    return <div>Error: {this.props.error.message}</div>;
  }
}

export default ErrorPage;
