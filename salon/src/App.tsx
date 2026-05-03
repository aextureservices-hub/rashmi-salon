import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { Loader } from './components/layout/Loader';
import { ScrollToTop } from './utils/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Loader />
      <AppRoutes />
    </BrowserRouter>
  );
}