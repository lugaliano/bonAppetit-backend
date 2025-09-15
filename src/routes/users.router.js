import express from 'express';
import usersController from '../controllers/users.controller.js'

const router = express.Router();


router.post('/register', usersController.register)
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra un nuevo usuario
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
 *       201:
 *         description: Usuario registrado exitosamente
 */
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
router.post('/change-password', usersController.changePassword)
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