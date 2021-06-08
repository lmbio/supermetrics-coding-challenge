import Layout from '@components/Layout';
import LoginForm from '@components/LoginForm';

export default function Login() {
  return (
    <>
      <Layout title="Login">
        <div className="login-wrapper">
          <LoginForm />
        </div>
      </Layout>

      <style jsx>{`
        .login-wrapper {
          margin: 100px auto;
        }
      `}</style>
    </>
  );
}
