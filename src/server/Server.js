import express from 'express';
import stormpath from 'express-stormpath';
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


  init() {
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

    // this.server.get('/automated-tests', (req, res) => {
    //   res.send(ReactDOMServer.renderToStaticMarkup( < TestHarness testType = 'automated' / > ));
    // });

    this.server.get('/automated-tests/*', (req, res) => {
      res.send('<!DOCTYPE html>' +
        ReactDOMServer
          .renderToStaticMarkup(
            <TestHarness
              testType='automated'
              pageName={'HomePage'}
            />
          )
        );
    });



    this.server.get('^(/|/home|/index)', (req, res) => {
      res.send('<!DOCTYPE html>' +
        ReactDOMServer
          .renderToStaticMarkup(
            <TestHarness
              testType='manual'
              pageName='home'
            />
          )
        );
    });


    this.server.get('/booking', (req, res) => {
      res.send('<!DOCTYPE html>' +
        ReactDOMServer
          .renderToStaticMarkup(
            <TestHarness
              testType='manual'
              pageName='booking'
            />
          )
        );
    });


    this.server.use(express.static(`${__dirname}/../../build/client`));
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
