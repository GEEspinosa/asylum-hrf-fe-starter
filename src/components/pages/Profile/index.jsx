import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
 */


const Profile = () => {
  
  //Dev Note: replaced hardcoded with variables pulled from useAuth0 hook
  const { user, isLoading, isAuthenticated, logout } = useAuth0();

  if (isLoading || !user) {
    return <div className='text-center p-4'>Loading...</div>;
  }

  //Dev Note: JSX below renders auth0's user object

  return (
    <>
      {isAuthenticated && (
        <>
          <section class='secondary-c'>
            <h1 class='text-4xl font-semibold mt-8'>Hello {user.nickname}!</h1>
            <div class='max-w-sm mx-auto my-10 bg-white rounded-lg shadow-lg p-6 text-center'>
              <img src={user.picture} alt={user.name} class='w-24 h24 rounded-full mx-auto mb-4' />
              <h2 class='text-2xl font-semibold mb-2'>{user.name}</h2>
              <p class='text-gray-600'>{user.email}</p>
              <button class='mt-6 px-4 py-2 bg-[#aaa] text-white font-semibold rounded-lg hover:bg-blue-600 transition' onClick={() => logout()}>
                Logout
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Profile;
