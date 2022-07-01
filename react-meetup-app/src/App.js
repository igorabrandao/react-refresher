import { Route } from "react-router-dom";

import AllMetupsPage from "./pages/AllMetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";
import MainNaviation from "./components/layout/MainNavigation";

function App() {
  return (
    <div>
      <MainNaviation />
      <Route path="/" exact>
        <AllMetupsPage />
      </Route>
      <Route path="/new-meetup">
        <NewMeetupPage />
      </Route>
      <Route path="/favorites">
        <FavoritesPage />
      </Route>
    </div>
  );
}

export default App;
