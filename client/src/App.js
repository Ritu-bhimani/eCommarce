import { Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import { Provider } from "react-redux";
import { configReducer } from "./redux/Store";
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "./context/ThemeContext";
import { BestSellerProvider } from "./context/bestSellerContext";
import { ContactProvider } from "./context/contactContext";
import { store } from './reduxNew/store'

function App() {

  // const { store, persistor } = configReducer()

  return (
    <ContactProvider>
      <ThemeProvider>
        <BestSellerProvider>
          <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
              <Routes>
                <Route exact path="/*" element={<UserRoutes />} />
                <Route element={<PrivateRoutes />} >
                  <Route exact path="/admin/*" element={<AdminRoutes />} />
                </Route>
              </Routes>
            {/* </PersistGate> */}
          </Provider>
        </BestSellerProvider>
      </ThemeProvider>
    </ContactProvider>
  );
}

export default App;
