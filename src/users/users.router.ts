/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express';
import * as UserService from './users.service';
import { BaseUser, User } from './user.interface';
import { validationSchema } from './users.validation';

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
        const users: User[] = await UserService.findAll();

        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// GET users/search?loginSubstring=:loginSubstring&limit=:limit
usersRouter.get('/search', async(req: Request, res: Response) => {
    const loginSubstring = req.query.loginSubstring;
    const limit = req.query.limit;
    try {
        // @ts-ignore
        const users: User[] = await UserService.getAutoSuggestUsers(loginSubstring, limit);

        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// GET users/:id
usersRouter.get('/:id', async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const user: User = await UserService.find(id);

        if (user) {
            return res.status(200).send(user);
        }

        res.status(404).send('user not found');
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST users
usersRouter.post('/', validationSchema(),  async(req: Request, res: Response) => {
   try {
       const user: BaseUser = req.body;
       const newUser = await UserService.create(user);

       res.status(201).json(newUser);
   } catch (e) {
       res.status(500).send(e.message);
   }
});

// PUT users/:id
usersRouter.put('/:id', validationSchema('update'), async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const userUpdate: User = req.body;

        const existingUser: User = await UserService.find(id);

        if (existingUser) {
            const updatedUser = await UserService.update(id, userUpdate);
            return res.status(200).json(updatedUser);
        }

        const newUser = await UserService.create(userUpdate);

        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).send(e.message);
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
