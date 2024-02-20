const express = require('express');
const cors = require('cors');
const { createTodo, updateTodo } = require('./utils/types');
const { Todo } = require('./db/schema');

const app = express();
app.use(express.json());
app.use(cors())

app.post("/todo", async (req, res) => {
    try {
        const createPayload = req.body;
        const parsedPayload = createTodo.safeParse(createPayload);
        if(!parsedPayload.success) {
            return res.status(411).json({message: 'You sent the wrong inputs'});
        }
        await Todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false,
        });

        res.json({message: 'TODO created'});
    } catch(err) {
        return res.status(500).json({error: 'Error while saving TODO'});
    }
    
});

app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        if(todos && todos.length > 0) {
            return res.json({todos});
        }
        return res.json({message: 'No todos found'});
    } catch(err) {
        return res.status(500).json({error: 'Error while fetching TODO'});
    }
});

app.put("/completed", async (req, res) => {
    try {
        const updatePayload = req.body;
        const parsedPayload = updateTodo.safeParse(updatePayload);
        if(!parsedPayload.success) {
            return res.status(411).json({message: 'You sent the wrong inputs'});
        }
        await Todo.updateOne({
            _id: req.body.id,
        }, {
            completed: true,
        });
        res.json({message: 'Marked todo as completed'});
    } catch(err) {
        return res.status(500).json({error: `Error while updating TODO`});
    }
    
});

app.listen(3000, () => {
    console.log('Express server is running on Port 3000');
})