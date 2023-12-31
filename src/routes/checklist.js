const express= require('express');
const Checklist= require('../models/checklist')

const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        let checklist = await Checklist.find({})
        console.log(checklist)
        res.status(200).render('checklists/index', {checklist:checklist})
    } catch (error) {
        console.log(error)
        res.status(500).render('pages/error', {error: 'Erro ao exibir as Listas'})
    }
})

router.post('/', async (req, res)=>{
    
   let {name} = req.body.checklist;
   let checklist= new Checklist({name})

    try {
       
        await checklist.save()
        console.log(checklist)
        res.redirect('/checklist')
     //   res.status(200).json(checklist)
    } catch (error) {
      //  res.status(500).json(error)
      res.status(422).render('/checklists/new', { checklist: {...checklist, error}}) //Voltar a página de criação e mostrar o erro caso ocorra algum erro ao salvar
    }
})

router.get('/new', async (req, res)=>{
        try {
            
            let checklist= new Checklist()
            res.status(200).render('checklists/new', {checklist:checklist})
        } catch (error) {
            res.status(500).render('pages/error', {error: 'Erro ao carregar o formulário'})
        }
})

router.get('/:id/edit', async (req,res)=>{
   // let {name} = req.body.checklist;

    try {
        let checklist = await Checklist.findById(req.params.id)
        res.status(200).render('checklists/edit', {checklist:checklist})
    } catch (error) {
      
        res.status(500).render('pages/error', {error: 'Erro  ao carregar a edição das listas de Tarefa'})
    }
    
})

router.get('/:id', async (req,res)=>{
   

    try {
        let checklist = await Checklist.findById(req.params.id).populate('task')
        console.log(checklist)
        res.status(200).render('checklists/show', {checklist:checklist})
    } catch (error) {
        console.log(error)
        res.status(500).render('pages/error', {error: 'Erro ao exibir as Listas de tarefas'})
    }
    
})


router.put('/:id', async (req, res) => {
    try {
      let { name } = req.body.checklist || {};
      const checklist = await Checklist.findByIdAndUpdate(req.params.id, { name }, { new: true });
      res.redirect('/checklist');
      // res.status(200).json(checklist)
    } catch (error) {
      let errors = error.errors || {};
      res.status(422).render('checklists/edit', {checklist: {...checklist, errors} });
    }
  });

router.delete('/:id', async (req,res)=>{
    console.log('Chegou')
   try {
    let checklist= await Checklist.findByIdAndRemove(req.params.id)
    res.redirect('/checklist');
   // res.status(200).json(checklist)
   } catch (error) {
    res.status(422).json(error)
    res.status(500).render('pages/error', {error: 'Erro ao deletar a Listas de tarefas'})
   }
})


module.exports = router;