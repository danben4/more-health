import React from 'react';

import Button from './Button';

class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {shared: false};
  }

  render() {
    return (
      <Button
        onClick={() => {
          this.setState({shared: true});
        }}
      >
        {this.state.shared ? "Shared!" : "Share"}
      </Button>
    );
  }
};

export default ShareButton;
