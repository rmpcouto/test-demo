import React, { Component } from 'react';

class PressAndHoldCaptcha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHolding: false,
      startTime: null,
      endTime: null,
      captchaPassed: false,
    };
  }

  startHold = () => {
    this.setState({
      isHolding: true,
      startTime: Date.now(),
    });
  };

  endHold = () => {
    if (this.state.isHolding) {
      const endTime = Date.now();
      const holdTime = endTime - this.state.startTime;
      const requiredHoldTime = 3000; // Adjust the required hold time (in milliseconds) as needed.

      if (holdTime >= requiredHoldTime) {
        this.setState({
          captchaPassed: true,
        });
      }

      this.setState({
        isHolding: false,
        endTime,
      });
    }
  };

  render() {
    const { captchaPassed } = this.state;

    return (
      <div>
        {captchaPassed ? (
          <div>
            <p>Captcha passed!</p>
            {/* Add your content here for when the captcha is passed */}
          </div>
        ) : (
          <div>
            <p>Press and hold the button for at least 3 seconds to pass the captcha.</p>
            <button
              onMouseDown={this.startHold}
              onMouseUp={this.endHold}
              onMouseLeave={this.endHold}
              onTouchStart={this.startHold}
              onTouchEnd={this.endHold}
            >
              {this.state.isHolding ? 'Hold...' : 'Press and Hold'}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default PressAndHoldCaptcha;
