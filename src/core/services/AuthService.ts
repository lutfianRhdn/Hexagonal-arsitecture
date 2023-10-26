// src/core/services/AuthService.ts
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface AuthConfig {
  secretKey: string;
  expiresIn: string;
}

export class AuthService {
  constructor(private userRepository: UserRepository, private authConfig: AuthConfig) {}

  async registerUser(username: string, password: string): Promise<User | null> {
    // Check if the username is already taken
    const existingUser = await this.userRepository.getUserByUsername(username);
    if (existingUser) {
      throw new Error('Username is already taken');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the repository
    const user = new User('', username, hashedPassword);
    user.username
    // { username: 'asd'}
    const newUser = await this.userRepository.createUser(user);

    // You can omit the password from the returned user
    newUser.password = '';

    return newUser;
  }

  async loginUser(username: string, password: string): Promise<string | null> {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, this.authConfig.secretKey, {
      expiresIn: this.authConfig.expiresIn,
    });

    return token;
  }
}
