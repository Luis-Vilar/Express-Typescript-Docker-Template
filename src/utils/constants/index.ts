// Server Constants
export const PORT : number = 3000;


// Database Constants
export const DB_URL : string = process.env.DB_URL || 'postgres://postgres:password@localhost:5432/express-typescript';


// General Constants
export const JWT_SECRET : string = process.env.JWT_SECRET
export const JWT_EXPIRATION : string = process.env.JWT_EXPIRATION || '1h';

