import { createRoot } from 'react-dom/client'
import AppRouter from './routes/AppRouter';
import { SpeedInsights } from "@vercel/speed-insights/react"

//redux
import { store ,persistor} from '@store';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

//axios
import "./services/axios-global";
//styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css"


createRoot(document.getElementById('root')!).render(
    <Provider store={store}> 
        <PersistGate loading={null} persistor={persistor}>
            <AppRouter/>
            <SpeedInsights/>
        </PersistGate>
    </Provider>
 
);
