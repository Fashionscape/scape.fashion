const Validate = (() => {
  const rules = rules => (req, res, next) => {
    const error = rules.reduce((msg, fn) => msg || fn(req.query, req), false);

    if (error) {
      const isObject = typeof error === 'object';
      const status = isObject ? error.status : 400;
      const message = isObject ? error.message : error;

      return res.status(status).json({message});
    }

    next();
  };

  return {rules};
})();

module.exports = Validate;
