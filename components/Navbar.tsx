import { useContext, useEffect, useState } from 'react';
import UserSessionContext from '@contexts/UserSessionContext';
import { SESSION_COOKIE_NAME } from '@lib/constants';
import { getCookie } from '@lib/cookies';

export default function Navbar() {
  const [userSession] = useContext(UserSessionContext);
  const [isValidSession, setIsValidSession] = useState(false);

  /**
   * Checks if there's a valid session cookie and updates the state
   */
  useEffect(() => {
    setIsValidSession(getCookie(SESSION_COOKIE_NAME) ? true : false);
  }, [isValidSession]);

  return (
    <>
      <nav>
        <div className="session-info">
          {isValidSession ? (
            <>
              <div>
                <b>Token</b>: {userSession.token}
              </div>
              <div>
                <b>Name</b>: {userSession.name}
              </div>
              <div>
                <b>Email</b>: {userSession.email}
              </div>
            </>
          ) : (
            'No session found. Please log in.'
          )}
        </div>
      </nav>

      <style jsx>{`
        nav {
          width: 100%;
          background-color: #d32329;
          color: #fff;
        }

        .session-info {
          display: flex;
          justify-content: flex-end;
          padding: 12px 24px;
        }

        .session-info div {
          margin-left: 15px;
        }
      `}</style>
    </>
  );
}
