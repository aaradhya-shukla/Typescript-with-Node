"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ msg: 'successfully added todo' });
});
router.post('/todo/delete', (req, res, next) => {
    const body = req.body;
    const id = body.id;
    console.log(id);
    for (let i in todos) {
        if (todos[i].id === id) {
            if (i === '0') {
                todos.splice(+i, +i + 1);
                console.log(todos);
                return res.status(201).json({ msg: "successfully deleted" });
            }
            todos.splice(+i, +i);
            console.log(todos);
            return res.status(201).json({ msg: "successfully deleted" });
        }
    }
    res.status(404).json({ msg: "item not found" });
});
router.post('/todo/edit', (req, res, next) => {
    const body = req.body;
    const id = body.id;
    const newText = body.text;
    for (let i of todos) {
        if (i.id === id) {
            i.text = newText;
            return res.status(200).json({ msg: "successfully updated" });
        }
    }
    res.send(404).json({ msg: "item not found" });
});
exports.default = router;
