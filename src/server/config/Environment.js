class Environment {

  name() {
    return process.env.NODE_ENV || 'Development';
  }

  port() {
    return process.env.PORT || 9091;
  }
}

export default new Environment;
