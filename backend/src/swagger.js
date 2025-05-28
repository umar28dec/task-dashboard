/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and user management
 *   - name: Tasks
 *     description: Task management
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: johndoe
 *         password:
 *           type: string
 *           example: secret123
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         fullName:
 *           type: string
 *           example: John Doe
 *         role:
 *           type: string
 *           default: user
 *           example: user
 *         isActive:
 *           type: boolean
 *           default: true
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T12:00:00Z"
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           description: Task title (required, non-empty string)
 *           example: "Buy groceries"
 *         description:
 *           type: string
 *           example: "Milk, Bread, Eggs"
 *         status:
 *           type: string
 *           enum:
 *             - todo
 *             - in-progress
 *             - done
 *           description: |
 *             Task status (must be one of: todo, in-progress, done)
 *           example: "todo"
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Due date (must be a valid date)
 *           example: "2024-06-10"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T12:00:00Z"
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and get JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid credentials
 *
 * /register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             username: johndoe
 *             password: secret123
 *             email: johndoe@example.com
 *             fullName: John Doe
 *             role: user
 *             isActive: true
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Username and password required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Username, password, and email are required
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Username already exists
 *
 * /users:
 *   get:
 *     tags: [Auth]
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - id: 1
 *                 username: johndoe
 *                 email: johndoe@example.com
 *                 fullName: John Doe
 *                 role: user
 *                 isActive: true
 *                 createdAt: "2024-06-01T12:00:00Z"
 *                 updatedAt: "2024-06-01T12:00:00Z"
 *
 * /users/{id}:
 *   get:
 *     tags: [Auth]
 *     summary: Get user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: 1
 *               username: johndoe
 *               email: johndoe@example.com
 *               fullName: John Doe
 *               role: user
 *               isActive: true
 *               createdAt: "2024-06-01T12:00:00Z"
 *               updatedAt: "2024-06-01T12:00:00Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *   put:
 *     tags: [Auth]
 *     summary: Update user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             username: johndoe
 *             email: johndoe@example.com
 *             fullName: John Doe
 *             role: admin
 *             isActive: false
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: 1
 *               username: johndoe
 *               email: johndoe@example.com
 *               fullName: John Doe
 *               role: admin
 *               isActive: false
 *               createdAt: "2024-06-01T12:00:00Z"
 *               updatedAt: "2024-06-01T12:10:00Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *   delete:
 *     tags: [Auth]
 *     summary: Delete user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Get all tasks (with pagination, filtering, and sorting)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tasks per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [todo, in-progress, done]
 *         description: Filter by task status
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by task title (partial match)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, title, status, dueDate, createdAt, updatedAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (asc or desc)
 *     responses:
 *       200:
 *         description: Paginated, filtered, and sorted list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *             example:
 *               tasks:
 *                 - id: 1
 *                   title: Buy groceries
 *                   description: Milk, Bread, Eggs
 *                   status: todo
 *                   dueDate: "2024-06-10"
 *                   createdAt: "2024-06-01T12:00:00Z"
 *                   updatedAt: "2024-06-01T12:00:00Z"
 *               total: 1
 *               page: 1
 *               pageSize: 10
 *               totalPages: 1
 *   post:
 *     tags: [Tasks]
 *     summary: Create a new task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           example:
 *             title: Buy groceries
 *             description: Milk, Bread, Eggs
 *             status: todo
 *             dueDate: "2024-06-10"
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               id: 1
 *               title: Buy groceries
 *               description: Milk, Bread, Eggs
 *               status: todo
 *               dueDate: "2024-06-10"
 *               createdAt: "2024-06-01T12:00:00Z"
 *               updatedAt: "2024-06-01T12:00:00Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Title is required and must be a non-empty string."]
 *
 * /tasks/{id}:
 *   get:
 *     tags: [Tasks]
 *     summary: Get a task by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               id: 1
 *               title: Buy groceries
 *               description: Milk, Bread, Eggs
 *               status: todo
 *               dueDate: "2024-06-10"
 *               createdAt: "2024-06-01T12:00:00Z"
 *               updatedAt: "2024-06-01T12:00:00Z"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Task not found
 *   put:
 *     tags: [Tasks]
 *     summary: Update a task by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           example:
 *             title: Buy groceries
 *             description: Milk, Bread, Eggs
 *             status: done
 *             dueDate: "2024-06-10"
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               id: 1
 *               title: Buy groceries
 *               description: Milk, Bread, Eggs
 *               status: done
 *               dueDate: "2024-06-10"
 *               createdAt: "2024-06-01T12:00:00Z"
 *               updatedAt: "2024-06-01T12:10:00Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Title is required and must be a non-empty string."]
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Task not found
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete a task by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Task not found
 */
