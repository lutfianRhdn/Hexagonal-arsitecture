import { UserRepository } from '../../core/repositories/UserRepository';
import { User } from '../../core/entities/User';

export class MySQLPostRepository implements UserRepository {
  createUser(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  getUserByUsername(username: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  // Implement methods to interact with MySQL for user data.
}
