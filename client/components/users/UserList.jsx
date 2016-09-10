import React, { Component } from 'react';
import User from './User.jsx';

class UserList extends Component {
  render() {
    return (
      <ul className='nav nav-pills nav-stacked'>{
        this.props.users.map( user => {
          return (
            <User 
              key={user.id}
              user={user}
            />
          )
        })
      }</ul>
    )
  }
}

UserList.propTypes = {
  users: React.PropTypes.array.isRequired
}

export default UserList