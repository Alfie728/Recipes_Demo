import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';

const rootDom = document.querySelector('#root');
const rootReactDom = ReactDOM.createRoot(rootDom);

rootReactDom.render(<App />);
