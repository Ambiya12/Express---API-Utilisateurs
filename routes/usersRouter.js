import { Router } from 'express';
import users from './data/users';

const usersRouter = Router();

usersRouter.get('/users', (request, response) => {
    return response.json(users);
});

usersRouter.get('/users/:id', (request, response) => {
    const userID = request.params.id;
    const userByID = users.find(user => user.id == userID);
    if (!userByID) {
        return response.status(404).json({ message: 'User not found' });
    }
    return response.status(200).json(userByID);
});

usersRouter.post('/users', (request, response) => {
    const { firstName, lastName, telephone, address, hobbies } = request.body;
    if (!firstName || !lastName || !telephone || !address || !hobbies) {
        return response.status(400).json({ message: 'All fields are required' });
    }
    const newUser = {
        id: users.length + 1,
        firstName,
        lastName,
        telephone,
        address,
        hobbies
    };
    users.push(newUser);
    return response.status(201).json(newUser);
});

usersRouter.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, telephone, address, hobbies } = req.body;
    if (!firstName || !lastName || !telephone || !address || !hobbies) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    let userByID = users.find(user => user.id === parseInt(id));
    userByID = {
        id: userByID.id,
        firstName: firstName || userByID.firstName,
        lastName: lastName || userByID.lastName,
        telephone: telephone || userByID.telephone,
        address: address || userByID.address,
        hobbies: hobbies || userByID.hobbies
    };
    return res.status(200).json(userByID);
});

usersRouter.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    try {
        let userByID = users.find(user => user.id === parseInt(id));
        if (!userByID) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userIndex = users.indexOf(userByID);
        users.splice(userIndex, 1);
        return res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default usersRouter;