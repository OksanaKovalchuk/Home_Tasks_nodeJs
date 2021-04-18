/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import Sequelize from 'sequelize';
import * as GroupService from '../services/group.service';
import { group as groupModel } from '../models/group';
import { validatorMapping } from '../utils/validator.utils';


export const groupsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET groups
groupsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const groupList = await GroupService.findAll();

        res.send(groupList);
    } catch (e) {
        res.status(500).send(e.message);
    }
});


// GET groups/:id
groupsRouter.get('/:id', async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const group = await GroupService.find(id);

        if (group) {
            return res.send(group);
        }

        res.status(404).send('Group was not found');
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST groups
groupsRouter.post('/', async(req: Request, res: Response) => {
    try {
        const newGroup: groupModel = req.body;
        const createdGroup = await GroupService.create(newGroup);

        res.status(201).json(createdGroup);
    } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
            res.status(400).send(validatorMapping(e));
        } else {
            res.status(500).send(e.message);
        }
    }
});

// PUT groups/:id
groupsRouter.patch('/:id', async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const groupUpdate: groupModel = req.body;

        const existingGroup = await GroupService.find(id);

        if (existingGroup) {
            const updatedGroup = await GroupService.update(id, groupUpdate);
            return res.json(updatedGroup);
        }

        const newGroup = await GroupService.create(groupUpdate);

        res.status(201).json(newGroup);
    } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
            res.status(400).send(validatorMapping(e));
        } else {
            res.status(500).send(e.message);
        }
    }
});

// DELETE groups/:id
groupsRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id : number = parseInt(req.params.id, 10);
        await GroupService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);

    }
});
