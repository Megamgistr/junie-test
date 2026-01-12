// User controller - handles business logic for user operations

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
}

// In-memory storage for demo purposes
let users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    createdAt: new Date('2024-01-02'),
  },
];

/**
 * Get all users
 */
export class UsersController {
  static async getAllUsers(): Promise<User[]> {
    return users;
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string): Promise<User | null> {
    const user = users.find((u) => u.id === id);
    return user || null;
  }

  /**
   * Get user by name
   */
  static async getUserByName(name: string): Promise<User | null> {
    const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase());
    return user || null;
  }

  /**
   * Create an new user
   */
  static async createUser(body: CreateUserRequest): Promise<User> {
    const newUser: User = {
      id: String(users.length + 1),
      name: body.name,
      email: body.email,
      createdAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  }

  /**
   * Update user by
   */
  static async updateUserByName(
    name: string,
    body: UpdateUserRequest
  ): Promise<User | null> {
    const userIndex = users.findIndex(
      (u) => u.name.toLowerCase() === name.toLowerCase()
    );

    if (userIndex === -1) {
      return null;
    }

    users[userIndex] = {
      ...users[userIndex],
      ...body,
    };

    return users[userIndex];
  }

  /**
   * Delete user by ID
   */
  static async deleteUserById(id: string): Promise<boolean> {
    const initialLength = users.length;
    users = users.filter((u) => u.id !== id);
    return users.length < initialLength;
  }
}
