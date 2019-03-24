import React from 'react';

import Button from './Button';

class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sent: false};
  }

  render() {
    return (
      <Button
        onClick={() => {
          this.setState({sent: true});
        }}
      >
        {this.state.sent ? "Goal sent!" : "Send to a friend!"}
      </Button>
    );
  }
};

export default ShareButton;
