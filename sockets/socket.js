const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band')

const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Pink Floyd'));
bands.addBand(new Band('Guns N Roses'));
bands.addBand(new Band('Eagles'));

io.on('connection', client =>{
    console.log('Cliente conectado');

    client.on('disconnect', ()=>{
        console.log('Cliente desconectado');        
    });

    client.emit('active-bands', bands.getBands());

    client.on('vote-band', payload =>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('create-band', payload =>{
        bands.addBand(new Band(payload['name']));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', payload =>{
        bands.deleteBand(payload['id']);
        io.emit('active-bands', bands.getBands());
    });
});
