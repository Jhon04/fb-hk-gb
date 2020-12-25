const express = require('express')
const bodyParser = require('body-parser');

app = express().use(bodyParser.json());

app.post('/webhook', (req, res) => {

    console.log('POST: WebHook')

    const body = req.body;

    if(body.object === 'page'){

        body.forEach(entry => {
            // re reciben y procesan los mensajes
            const webhookEvent = entry.menssaging[0];
            console.log(webhookEvent);
        })
        res.status(200).send('EVENTO RECIBIDO')
    }else{
        res.sendStatus(404);
    }

});

app.get('/webhook', (req, res) => {

    console.log('GET: WebHook')

    const VERIFY_TOKEN ='<stringUnicoParaTuAplicacion>';
    
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if(mode && token){
        if(mode === 'subscribe' && token === VERIFY_TOKEN){
            console.log('webhook VERIFICADO')
            res.status(200).send(challenge);
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(404);
    }


});

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));