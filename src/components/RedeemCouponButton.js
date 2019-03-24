import React from 'react';

import Button from './Button';

class RedeemButtonCoupon extends React.Component {
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
        {this.state.shared ? "Coupon Redeemed!" : "Redeem Coupon"}
      </Button>
    );
  }
};

export default RedeemButtonCoupon;
