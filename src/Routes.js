import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { SidesListPage } from './pages/SidesListPage';
import { NewRecipePage } from './pages/NewRecipePage';
import { EditRecipePage } from './pages/EditRecipePage';

export function Routes() {
  return (
    <RouterRoutes>
      <Route index element={<RecipeListPage />} />
      <Route path="/prilohy" element={<SidesListPage />} />
      <Route path="/novy-recept" element={<NewRecipePage />} />
      <Route path="/upravit-recept/:slug" element={<EditRecipePage />} />
      <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
