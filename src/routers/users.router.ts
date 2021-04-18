/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import Sequelize from 'sequelize';
import * as UserService from '../services/users.service';
import { validatorMapping } from '../utils/validator.utils';
import { User } from '../models/user';


/**
 * Router Definition
 */

export const usersRouter = express.Router();

/**
 * Controller Definitions
 */

// GET users
usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const users = await UserService.findAll();

        res.send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// GET users/search?loginSubstring=:loginSubstring&limit=:limit
usersRouter.get('/search', async(req: Request, res: Response) => {
    const loginSubstring = req.query.loginSubstring?.toString() || '';
    const limit = Number(req.query.limit);
    try {
        const users = await UserService.findAll(loginSubstring, limit);

        res.send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// GET users/:id
usersRouter.get('/:id', async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const user = await UserService.find(id);

        if (user) {
            return res.send(user);
        }

        res.status(404).send('user not found');
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST users
usersRouter.post('/', async(req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const newUser = await UserService.create(user);

        res.status(201).json(newUser);
    } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
            res.status(400).send(validatorMapping(e));
        } else {
            res.status(500).send(e.message);
        }
    }
});

// PUT users/:id
usersRouter.patch('/:id', async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const userUpdate: User = req.body;

        const existingUser = await UserService.find(id);

        if (existingUser) {
            const updatedUser = await UserService.update(id, userUpdate);
            return res.json(updatedUser);
        }

        const newUser = await UserService.create(userUpdate);

        res.status(201).json(newUser);
    } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
            res.status(400).send(validatorMapping(e));
        } else {
            res.status(500).send(e.message);
        }
    }
});

// DELETE users/:id
usersRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id : number = parseInt(req.params.id, 10);
        await UserService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);

    }
});
