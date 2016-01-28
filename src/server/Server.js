import express from 'express';
import stormpath from 'express-stormpath';

import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// my routes
import routes from './routes/index.js';
import booking from './routes/booking.js';
//import error from './routes/error.js';

//import request from 'request';
import React from 'react';
import ReactDOMServer from 'react-dom/Server';
import TestHarness from './TestHarness';

class Server {

  constructor(environmentConfig) {
    this.env = environmentConfig;
    this.port = this.env.port();
    this.server = express();
    this.init();
  }

  // errorHandler(req, res) {
  //   res.send('<!DOCTYPE html>' +
  //     ReactDOMServer
  //       .renderToStaticMarkup(
  //         <TestHarness
  //           testType='manual'
  //           pageName='error'
  //         />
  //       )
  //     );
  // }

  init() {

    // Axway data request for usage graph
    //
    // this.server.use('/axway', (req, res) => {
    //   var options = {
    //     url: `http://api-a.ec2.impello.co.uk:8082${req.url}`
    //   };
    //
    //   req.pipe(request(options))
    //     .on('error', (e) => {
    //       console.log(e);
    //     })
    //     .pipe(res)
    //     .on('error', (e) => {
    //       console.log(e);
    //     });
    // });
    // end data request


    // automated Selenium tests
    // this.server.get('/automated-tests/*', (req, res) => {
    //   res.send('<!DOCTYPE html>' +
    //     ReactDOMServer
    //       .renderToStaticMarkup(
    //         <TestHarness
    //           testType='automated'
    //           pageName='home'
    //         />
    //       )
    //     );
    // });



    // uncomment after placing your favicon in /build/client/images
    this.server.use(favicon(path.join(__dirname, './../../build/client/images', 'favicon.png')));
    // console.log(path.join(__dirname, './../../build/client/images', 'favicon.png'));
    // console.log(path.join(__dirname, './../../build/client'));
    this.server.use(logger('dev'));
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(cookieParser());
    this.server.use(express.static(path.join(__dirname, './../../build/client')));

    this.server.use('^(/|/home|/index)', routes);
    this.server.use('/booking', booking);

    // catch 404 and forward to error handler
    this.server.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });


    // error handlers

    // development error handler
    // will print stacktrace
    if (this.server.get('env') === 'development') {

//      this.server.use(null, error);
      this.server.use(function (err, req, res, next) {
        res.status(err.status || 500);

        res.send('<!DOCTYPE html>' +
          ReactDOMServer
            .renderToStaticMarkup(
              <TestHarness
                testType='manual'
                pageName='error'
              />
            )
          );
        next(err);
        // res.render('error', {
        //   message: err.message,
        //   error: err
        // });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    this.server.use(function (err, req, res, next) {
      res.status(err.status || 500);

      res.send('<!DOCTYPE html>' +
        ReactDOMServer
          .renderToStaticMarkup(
            <TestHarness
              testType='manual'
              pageName='error'
            />
          )
        );
      // res.render('error', {
      //   message: err.message,
      //   error: {}
      // });
    });

















  }

  start() {

    stormpath.init(this.server, {
      website: true
    });

    this.server.on('stormpath.ready', () => {
      this.server.listen(this.port, 'localhost', (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Listening at http://localhost:' + this.port);
      });
    });
  }

}

export default Server;
