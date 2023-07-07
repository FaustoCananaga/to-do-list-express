const express = require('express');
const checklistsRouter= require('./src/routes/checklist')
const taskRouter= require('./src/routes/task')

const rootRouter= require('./src/routes/index')
const methodOverride = require('method-override');

require('./config/database')
const path = require('path'); 
const { simple } = require('./src/routes/task');

const app= express();

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public'))); // Abilitar o projecto para usar arquivos estáticos (bulma)


app.set('views', path.join(__dirname, 'src/views'));  // Setando o caminho das Views do nosso projecto
app.set('view engine', 'ejs');                        // Setando a View engine que será usada no projecto
/*
const log=(req,res, next)=>{
    console.log(req.body)
    console.log(`Data: ${Date.now()}`)
    next();
}
app.use(log)



app.get('/json', (req, res)=>{
   
    res.json({title:'Tarefa 1', done:true}) 
}) 


app.get('/', (req, res) =>{
    res.send('<h1>Minha Lista de Tarefas Alterado</h1>')
})
*/

app.use('/',rootRouter);
app.use('/checklist',checklistsRouter );
app.use('/checklist',taskRouter.checklistDependent );
app.use('/task',taskRouter.simple );


app.listen(3000, () =>{
    console.log('Servidor foi iniciado')
})

