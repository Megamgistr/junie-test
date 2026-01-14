// Sample user routes for testing API documentation workflow

import { UsersController } from '../controllers/usersController';

/**
 * Get all users
 * @route GET /api/users
 * @returns {User[]} Array of users
 */
export async function getUsers() {
  return UsersController.getAllUsers();
}

/**
 * Get user by ID
 * @route GET /api/users/:id
 * @param {string} id - User ID
 * @returns {User} User object
 */
export async function getUserById(id: string) {
  return UsersController.getUserById(id);
}

/**
 * Get user by Name
 * @route GET /api/users/:name
 * @param {string} name - User Name
 * @returns {User} User object
 */
export async function getUserByName(name: string) {
  return UsersController.getUserByName(name);
}

/**
 * Create new user
 * @route POST /api/users
 * @param {CreateUserRequest} body - User data
 * @returns {User} Created user
 */
export async function createUser(body: any) {
  return UsersController.createUser(body);
}

/**
 * Update user by it's Name
 * @route PUT /api/users/:name
 * @param {string} name - User Name
 * @param {UpdateUserRequest} body - Updated user data
 * @returns {User} Updated user
 */
export async function updateUserByName(name: string, body: any) {
  return UsersController.updateUserByName(name, body);
}

