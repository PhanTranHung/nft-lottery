import React from 'react';
import Layout from './layout';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import ListNFT from './pages/list-nft';
import ViewNFT from './pages/view-nft';
import CreateNFT from './pages/create-nft';

function App() {
  return (
    <div className="App" role="main">
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="create-lottery" element={<CreateNFT />} />
          <Route path="view-lottery/:poolAddress" element={<ViewNFT />} />
          <Route path="list-lottery" element={<ListNFT />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
