import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetToken } from '@Actions/application.action';
import { Route, Routes } from 'react-router-dom';
import { Header, Sidebar } from '@components';
import { Loader } from '@common';

const Company = React.lazy(() => import('@pages/properties/companies/Company'));
const Contract = React.lazy(() => import('@pages/properties/contracts/Contract'));
const Vendors = React.lazy(() => import('@pages/properties/vendors/Vendors'));
const Others = React.lazy(() => import('@pages/properties/others/Others'));
const Sites = React.lazy(() => import('@pages/properties/sites/Sites'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      dispatch(GetToken());
    }
  }, []);

  return (
    <div className="container">
      <div className="app_wrapper">
        <Sidebar />
        {/*<SidebarRS />*/}
        <div className="content_wrapper">
          <Header />
          <section className="contents">
            <React.Suspense fallback={<Loader />}>
              <Routes>
                <Route path="Companies/*" element={<Company />} />
                <Route path="Contracts/*" element={<Contract />} />
                <Route path="Vendors/*" element={<Vendors />} />
                <Route path="Others/*" element={<Others />} />
                <Route path="Locations/*" element={<Sites />} />
              </Routes>
            </React.Suspense>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
