const express= require('express');
const Checklist= require('../models/checklist')
const Task= require('../models/task')

const checklistDependentRouter = express.Router();
const simpleRouter = express.Router();



checklistDependentRouter.get('/:id/task/new', async (req, res)=>{
    try {
        let task= new Task()
        res.status(200).render('tasks/new', {checklistId: req.params.id, task:task})
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao carregar o formulário'})
    }
})


checklistDependentRouter.post('/:id/task', async (req, res)=>{
    let {name}=req.body.task;
    let task = new Task({name, checklist: req.params.id})
    try {
        await task.save()
        let checklist= await Checklist.findById(req.params.id)
        checklist.task.push(task);
        await checklist.save()
        res.redirect(`/checklist/${req.params.id}`)
    } catch (error) {
        res.status(422).render('task/new', { task: {...task, error}, checklistID: req.params.id})  
    }
})

simpleRouter.delete('/:id', async (req, res)=>{
    try {
        let task= await Task.findByIdAndDelete(req.params.id)
        let checklist = await Checklist.findById(task.checklist)
        let taskToRemove = checklist.task.indexOf(task.id);
        checklist.task.slice(taskToRemove, 1)
        checklist.save()
        res.redirect(`/checklist/${checklist._id}`)
    } catch (error) {
        console.log(error)
        res.status(500).render('pages/error', {error: 'Erro ao remover uma tarefa'})
    }
})

simpleRouter.put('/:id', async (req, res)=>{

      let task= await Task.findById(req.params.id)
    try {
        console.log('estou aqui')
        task.set(req.body.task)
        await task.save()
        res.status(200).json({task});
    } catch (error) {
        let erros= error.erros
        res.status(422).json({ task: {...erros}})
    }
})

module.exports= {
    checklistDependent: checklistDependentRouter,
    simple: simpleRouter
}