import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { SidesListPage } from './pages/SidesListPage';

export function Routes() {
  return (
    <RouterRoutes>
      <Route index element={<RecipeListPage />} />
      <Route path="/prilohy" element={<SidesListPage />} />
      <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
