/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express';
import * as UserService from './users.service';
import { BaseUser, User } from './user.interface';

/**
 * Router Definition
 */
export const usersRouter = express.Router();
/**
 * Controller Definitions
 */

// GET items

usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users: User[] = await UserService.findAll();

        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// GET items/:id

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

// POST items
usersRouter.post('/', async(req: Request, res: Response) => {
   try {
       const user: BaseUser = req.body;

       const newUser = await UserService.create(user);

       res.status(201).json(newUser);
   } catch (e) {
       res.status(500).send(e.message);
   }
});

// PUT items/:id
usersRouter.put('/:id', async(req: Request, res: Response) => {
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

// DELETE items/:id
usersRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id : number = parseInt(req.params.id, 10);
        await UserService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);

    }
});
