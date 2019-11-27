import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [{id: 'u1', name: 'John Doe', image: 'https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif', places: 3}];

  return <UsersList items={USERS} />;
}

export default Users;
