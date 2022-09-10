import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import MissionList from './components/MissionList';
import RocketDetails from './components/RocketDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<MissionList />} />
          <Route path='/:id' element={<RocketDetails />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
