import express from 'express';
const Router = new express.Router();

import React from 'react';
import ReactDOMServer from 'react-dom/Server';
import TestHarness from '../TestHarness';

Router.get('/', (req, res, next) => {
  res.send('<!DOCTYPE html>' +
    ReactDOMServer
      .renderToStaticMarkup(
        <TestHarness
          testType='manual'
          pageName='error'
        />
      )
    );
});

export default Router;
