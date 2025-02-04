const express = require('express');
const Todo = require('../Model/todoSchema');

const router = express.Router();
const {getByCreator, createTodo, deleteTodo} = require('../Controller/todoController');
const isValidUser = require('../Middleware/validateUser');

router.get('/todos/',isValidUser,getByCreator);
router.post('/create',isValidUser,createTodo);
router.delete('/delete/:id',isValidUser,deleteTodo);
router.get('/all',async (req,res)=>{
    const todos = await Todo.find();

    res.json(todos)
})


module.exports = router