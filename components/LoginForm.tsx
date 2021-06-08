import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import UserSessionContext from '@contexts/UserSessionContext';

export default function LoginForm() {
  const router = useRouter();
  const [userSession, createSession] = useContext(UserSessionContext);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
  });

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = formValues;
    await createSession(email, name);
  };

  useEffect(() => {
    if (userSession.token) {
      router.push({ pathname: '/posts' });
    }
  }, [userSession.token]);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="title">Login</div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required={true}
            value={formValues.name}
            onChange={handleInputValue}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required={true}
            value={formValues.email}
            onChange={handleInputValue}
          />
        </div>
        <div className="button-wrapper">
          <button type="submit">Go</button>
        </div>
      </form>

      <style jsx>{`
        form {
          width: 400px;
          margin: 0 auto;
          padding: 30px 60px;
          box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.1);
        }

        .title {
          margin-bottom: 30px;
          font-size: 22px;
          text-align: center;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label,
        input {
          display: block;
          width: 100%;
        }

        label {
          margin-bottom: 5px;
        }

        input {
          padding: 8px;
        }

        .button-wrapper {
          display: flex;
          justify-content: flex-end;
        }

        button {
          border: none;
          background-color: #d32329;
          color: #fff;
          padding: 8px 16px;
          cursor: pointer;
          clear: both;
        }
      `}</style>
    </>
  );
}
