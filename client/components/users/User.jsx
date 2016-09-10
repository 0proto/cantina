import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <li>
        <a>
          <i className="fa fa-circle online-icon" aria-hidden="true"></i>&nbsp;&nbsp;
          {this.props.user.name}
        </a>
      </li>
    )
  }
}

User.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default User