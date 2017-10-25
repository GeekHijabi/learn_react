import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';
import App from './components/app'
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Main = () => {
    return(
    <BrowserRouter>
    <div>
     <Match exactly pattern="/" component={StorePicker}/>
     <Match pattern="/store/:storeId" component={App}/>
     <Miss component={NotFound} />

    </div>
    </BrowserRouter>
    )
}


render(<Main/>, document.getElementById('main'));

