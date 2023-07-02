const server = http.createServer( async (req, res)=>{
    //передаем в метод колбек, который в свою  
    // очередь принимает 2 параметра: request и response
    console.log("Request method ", req.method)//метод в запросе от клиента
    console.log("Request url", req.url)//путь клиента

    // res.end("Hello from server!")//завершить запрос, выдав то что в 
    // параметре метода как ответ с сервера

    if ( req.method === "GET") {
        const page = await fs.readFile(path.join(basePath, "./index.html"))
        //читаем html файл чтобы получить его как константу

        // res.setHeader("Content-Type","text/html")
        // указываем доп информацию в хедере, какую наш 
        // клиент должен знать.(браузер будет заранеее знать, что он  
        // работает с текстом и html и не будет тратить время на  
        // определение того, какого типа информация пришла с сервера)
        res.writeHead(200, {
            "Content-Type": "text/html"//альтернативный способ setHeader
            // указываем в методе writeHead в объект все необходимые 
            // ключи и их знения 
        })//отправляем код статуса(200 - успешный статус)
        res.end(page)//завершаем ответ выдавая html страницу
    } else if (req.method === "POST") {
        const body = []// 
         
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8"
        })//чтобы ответ работал в старых браузерах

        req.on("data", data => {
            body.push(Buffer.from(data))//пушим все получаемые данные в
            //  body переводя их из буфера в нормальные данные
        })//с помощью этого метода мы добавляем события
        // с помощью события data мы получаем данные, который нам 
        // отправляет клиент в виде буфера
           
        req.on("end", async ()=>{//событие сработает, когда запрос закончится
            const title = body.toString().split("=")[1].replaceAll("+"," ")
            
            addNote(title)
            res.end(`Title = ${title}`)
        })
    }
})//создает веб-сервер используя метод http.createServer
