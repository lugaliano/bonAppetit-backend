import express from 'express';
import usersController from '../controllers/users.controller.js'
import rateLimit from 'express-rate-limit';

// Limit to 5 registration attempts per hour per IP
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    status: 'error',
    error: 'Too many accounts created from this IP, please try again after an hour.'
  }
});

// Limit to 5 password change attempts per hour per IP
const changePasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    status: 'error',
    error: 'Too many password change attempts from this IP, please try again after an hour.'
  }
});

const router = express.Router();


router.post('/register', registerLimiter, usersController.register)
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags:
 *       - Users
 *     description: Registra un nuevo usuario con los datos obligatorios de email, nombre, alias y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - alias
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: La dirección de correo electrónico del usuario.
 *                 example: ada@ejemplo.com
 *               name:
 *                 type: string
 *                 description: El nombre completo del usuario.
 *                 example: Ada Lovelace
 *               alias:
 *                 type: string
 *                 description: Un alias único para el usuario.
 *                 example: alovelace
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario (mínimo 8 caracteres).
 *                 format: password
 *                 example: SprSfePwd023890!
 *     responses:
 *       '200':
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       '400':
 *         description: Solicitud incorrecta, faltan datos o el usuario ya existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post('/register', registerLimiter, usersController.register);

router.post('/login', usersController.login)
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post('/send-password-change-verification-code', usersController.sendChangePasswordVerificationCode)
/**
 * @swagger
 * /api/users/send-password-change-verification-code:
 *   post:
 *     summary: Envía código de verificación para cambio de contraseña
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Código enviado
 */
router.post('/verify-password-change-verification-code', usersController.verifyChangePasswordVerificationCode)
/**
 * @swagger
 * /api/users/verify-password-change-verification-code:
 *   post:
 *     summary: Verifica el código de cambio de contraseña
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Código verificado
 */

router.post('/change-password', changePasswordLimiter, usersController.changePassword)
/**
 * @swagger
 * /api/users/change-password:
 *   post:
 *     summary: Cambia la contraseña del usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña cambiada
 */
router.get('/:uid', usersController.getUser)
/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtiene información de un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del usuario
 */
router.post('/guest', usersController.guest)
/**
 * @swagger
 * /api/users/guest:
 *   post:
 *     summary: Crea un usuario invitado
 *     tags:
 *       - Users
 *     responses:
 *       201:
 *         description: Usuario invitado creado
 */

export default router