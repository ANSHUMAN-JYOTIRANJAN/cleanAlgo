const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

const notFound = (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`,
  });
};

module.exports = {
  errorMiddleware,
  notFound,
};
