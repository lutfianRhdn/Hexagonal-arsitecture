import { MongoDBUserRepository } from '../adapters/mongodb/MongoDBUserRepository';
import { AuthService } from '../core/services/AuthService';
import { Request, Response } from 'express';
const mongoDBUserRepository = new MongoDBUserRepository();
const authConfig = {
  secretKey: 'your-secret-key',
  expiresIn: '1h',
};

const authService = new AuthService(mongoDBUserRepository, authConfig);

export const login = async (req: Request, res: Response) => {
 authService.loginUser(req.body.username, req.body.password)
}
