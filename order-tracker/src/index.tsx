import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import './index.css';
import { theme } from './configs/theme';
import { ThemeProvider } from '@mui/material/styles';

const queryClient = new QueryClient();
const persister = createSyncStoragePersister({ storage: window.localStorage });
persistQueryClient({ queryClient, persister });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

reportWebVitals();
