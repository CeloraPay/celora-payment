import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import PaymentPage from './components/Payment/PaymentPage';

const AddressWrapper: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  if (!address)
    return (
      <p className="text-center mt-20 text-gray-400">No address provided</p>
    );
  return <PaymentPage address={address} />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-dark-primary text-gray-200 antialiased">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://picsum.photos/seed/bg/1920/1080")',
            opacity: '0.05',
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-dark-primary via-dark-primary/80 to-dark-primary"></div>
        <main className="relative z-10">
          <Routes>
            <Route path="/:address" element={<AddressWrapper />} />
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-screen">
                  <p className="text-gray-500 text-lg">404 | Page Not Found</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
