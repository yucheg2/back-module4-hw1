const chalk = require("chalk")
const {addNote, getNotes, removeNote, editNote} = require("./notes.controller")
const express = require("express")
const path = require("path")

const port = 3000//номер порта

const app = express()//создаем сервер используя express

app.set(
    "view engine", "ejs"//первый параметр - то что мы хотим 
    // переопределить (шаблонизатор)
    // второй параметр какой шаблонизатор мы используем
)//позволяет переопределять базовые настройки сервера на express
app.set("views", "pages")//поменяли папку в которой render ищет файлы

app.use(express.urlencoded({
    extended:true
}))//с помощью этого мы сможем получать данные из импорта
app.use(express.static(path.join(__dirname, "./public")))
app.use(express.json())


app.get("/", async (req, res)=>{
    //принимает 1) url по которому идет запрос 
    // 2) колбек, который так-же принимает request и response 

    // res.sendFile(path.join(basePath, "./index.html"))//так мы в ответ на 
    // // get запрос отправим файл (даже читать его не над POG)
    res.render("index",{
        title: "Express App", 
        notes: await getNotes(),//метод асинхронный по этому ждем 
        // результата
        created: false
    })//благодаря шаблонизаторам используем render
    //1й параметр - название файла, который рендерим
    //(по умолчанию ищут в папке dirname/views)
    //2й - объект options, которые мы передаем на фронтенд
})//обрабатываем get запрос

app.post("/", async (req, res) => {
    await addNote(req.body.title)//мы можем получать этот параметр от 
    // клиента благодаря строчке 16
    res.render("index",{
        title: "Express App", 
        notes: await getNotes(),
        created: true
    })
})

app.delete("/:id", async (req, res) => {//добавляем обработчик запроса
    // на страницу с параметром id
    const {id} = (req.params)//получаем id из параметров url
    await removeNote(id)
    res.render("index",{
        title: "Express App", 
        notes: await getNotes(),
        created: false
    })
})

app.put("/", async (req,res) => {
    await editNote(req.body)
    res.render("index",{
        title: "Express App", 
        notes: await getNotes(),
        created: false
    })
})

app.listen(port,()=>{
    console.log(chalk.green(`Server has been started on port ${port}`))
    // при успшеном запуске отпишемся об этом в консоли и укажем, на каком
    // порте запустились
})//запуская сервер мы передаем 2 параметра:
// 1) порт,
// 2) опционально можно передать колбек, который выполнится, если сервер
// успешно запустился

