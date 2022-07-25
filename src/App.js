import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Layout } from './components/Layout';
import { Routes } from './Routes';

export function App() {
  return (
    <Router>
      <Layout>
        <Routes />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />
      </Layout>
    </Router>
  );
}
