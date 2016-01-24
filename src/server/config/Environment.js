class Environment {

  name() {
    return process.env.NODE_ENV || 'Development';
  }

  port() {
    return process.env.PORT || 8081;
  }
}

export default new Environment;
