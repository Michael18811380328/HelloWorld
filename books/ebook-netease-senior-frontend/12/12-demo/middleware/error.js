const error = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = {
      message: 'server is error',
      error: error.message
    };
  }
}