import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import Routes from "./routes";
import reducers from "./reducers";
import { setupInterceptors } from "./actions/api";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

setupInterceptors(store);

function App() {
  return (
    <ReduxProvider store={store}>
      <Routes />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        transition={Zoom}
        className="toast-container-custom"
      />
    </ReduxProvider>
  );
}

export default App;
