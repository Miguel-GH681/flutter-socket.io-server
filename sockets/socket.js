const { io } = require('../index');

io.on('connection', client =>{
    console.log('Cliente conectado');
    
    client.on('disconnect', ()=>{
        console.log('Cliente desconectado');        
    });

    client.on('emitir-mensaje', (payload)=>{
        console.log(payload);
        client.broadcast.emit('nuevo-mensaje', payload)
    });
});
