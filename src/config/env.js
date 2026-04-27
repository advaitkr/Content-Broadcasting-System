if (!process.env.DB_HOST) {
    throw new Error("Missing DB_HOST in .env");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in .env");
  } 