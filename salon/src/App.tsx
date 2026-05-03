import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { Loader } from './components/layout/Loader';

export default function App() {
  return (
    <BrowserRouter>
      <Loader />
      <AppRoutes />
    </BrowserRouter>
  );
}
