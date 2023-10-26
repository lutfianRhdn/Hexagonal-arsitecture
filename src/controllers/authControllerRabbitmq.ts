import { MongoDBUserRepository } from '../adapters/mongodb/MongoDBUserRepository';
import { AuthService } from '../core/services/AuthService';
import { Request, Response } from 'express';
const mongoDBUserRepository = new MongoDBUserRepository();
const authConfig = {
  secretKey: 'your-secret-key',
  expiresIn: '1h',
};

const authService = new AuthService(mongoDBUserRepository, authConfig);

export const login = async (username:string,password:string) => {
 authService.loginUser(username, password)
}
export const register = async (username: string, password: string) => {
  authService.registerUser(username, password)
}
