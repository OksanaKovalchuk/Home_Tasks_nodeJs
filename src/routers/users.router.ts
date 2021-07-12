/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import * as UserService from '../services/users.service';
import { validatorMapping } from '../utils/validator.utils';
import { User } from '../models/user';
import { userLogger as logger } from '../config/winston';

/**
 * Router Definition
 */

export const usersRouter = express.Router();

/**
 * Controller Definitions
 */
usersRouter.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { login, password } = req.body;

        // Validate user input
        if (!(login && password)) {
            res.status(400).send("All input is required");
        }
        const users = await UserService.findAll(login, 20) || [];

        // Validate if user exist in our database
        // tslint:disable-next-line:no-shadowed-variable
        const user = users.rows.filter(user => {
            return user.login === login;
        })[0];


        if (user && password === user.password) {
            // Create token
            const token = jwt.sign(
                { user_id: user.id, login },
                'node_js-6-token',
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            const userwithToken = Object.assign(user, { token });

            // user
            res.status(200).json(userwithToken);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
// }
});

// GET users
usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const users = await UserService.findAll();

        logger.info(`method called: 'findAll', with params: no params`);
        res.send(users);
    } catch (e) {
        logger.error(`method called: 'findAll', with params: no params - ${ e.message }`);
        res.status(500).send(e.message);
    }
});

// GET users/search?loginSubstring=:loginSubstring&limit=:limit
usersRouter.get('/search', async(req: Request, res: Response) => {
    const loginSubstring = req.query.loginSubstring?.toString() || '';
    const limit = Number(req.query.limit);
    try {
        const users = await UserService.findAll(loginSubstring, limit);

        logger.info(`method called: 'findAll', with params: ${JSON.stringify({loginSubstring, limit})}`)
        res.send(users);
    } catch (e) {
        logger.error(`method called: 'findAll', with params: ${JSON.stringify({loginSubstring, limit})} - ${e.message}`)
        res.status(500).send(e.message);
    }
});

// GET users/:id
usersRouter.get('/:id', async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const user = await UserService.find(id);

        if (user) {
            logger.info(`method called: 'find', with params: ${JSON.stringify({ id })}`);
            return res.send(user);
        }

        res.status(404).send('user not found');
    } catch (e) {
        logger.error(`method called: 'find', with params: ${JSON.stringify({ id })} - ${e.message}`);
        res.status(500).send(e.message);
    }
});

// POST users
usersRouter.post('/', async(req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const newUser = await UserService.create(user);
        logger.info(`method called: 'create', with params: ${JSON.stringify({ user })}`);

        res.status(201).json(newUser);
    } catch (e) {
        logger.error(`method called: 'create', with params: ${JSON.stringify({ user: req.body })} - ${e.message}`);
        if (e instanceof Sequelize.ValidationError) {
            res.status(400).send(validatorMapping(e));
        } else {
            logger.error(`method called: 'create', with params: ${JSON.stringify({ user: req.body })} - ${e.message}`);
            res.status(500).send(e.message);
        }
    }
});

// PATCH users/:id
usersRouter.patch('/:id', async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const userUpdate: User = req.body;

        const existingUser = await UserService.find(id);
        logger.info(`method called: 'find', with params: ${JSON.stringify({ id })}`);

        if (existingUser) {
            const updatedUser = await UserService.update(id, userUpdate);
            logger.info(`method called: 'update', with params: ${JSON.stringify({ id, userUpdate })}`);
            return res.json(updatedUser);
        }
        logger.info(`method called: 'create', with params: ${JSON.stringify({ userUpdate })}`);

        const newUser = await UserService.create(userUpdate);

        res.status(201).json(newUser);
    } catch (e) {
        logger.error(`method called: 'update', with params: ${JSON.stringify({ id, userUpdate: req.body })} - ${e.message}`);
        if (e instanceof Sequelize.ValidationError) {
            res.status(400).send(validatorMapping(e));
        } else {
            res.status(500).send(e.message);
        }
    }
});

// DELETE users/:id
usersRouter.delete('/:id', async (req: Request, res: Response) => {
    const id : number = parseInt(req.params.id, 10);
    try {
        logger.info(`method called: 'remove', with params: ${JSON.stringify({ id })}`);
        await UserService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        logger.error(`method called: 'remove', with params: ${JSON.stringify({ id })} - ${e.message}`);
        res.status(500).send(e.message);
    }
});
