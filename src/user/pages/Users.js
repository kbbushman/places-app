import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [{id: 'u1', name: 'John Doe', image: 'https://robohash.org/johnDoe.png', places: 3}];

  return <UsersList items={USERS} />;
}

export default Users;
