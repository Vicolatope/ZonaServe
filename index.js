const WebSocket = require('ws');
const wss = new WebSocket.Server({
  perMessageDeflate: false,
  port: 8080
});
let party = [];

wss.on('connection', function connection(ws) {
  ws.on('message', function test(data, flags) {
    console.log(data);
    if (data.match('theme')) {
      console.log('its a thene');
      party.push({sock: ws, score: 1000, theme: data.substring(6)});
      console.log(party);
    } else if (data.match('joining')){
      console.log('baba');
      party.push({sock: ws, score: 1000, theme: party[0].theme});
      console.log(party);
    }
  })
  ws.on('finish', function finishing(message) {
    party.forEach((item) => {
      if (item.sock == ws) {
        item.score = message;
      }
    })
  })
  ws.on('join', function sendThemes(message) {
    let array = '';
    party.forEach((item) => {
      array = array + item;
      array = array + ' ';
    })
    ws.send(array);
  })
  ws.on('who', function whoooo(message) {
    if (ws === party[0].sock) {
      if (party[0].score > party[1].score) {
        ws.send('gagne');
      } else if (party[0].score === party[1].score) {
        ws.send('egalite');
      } else {
        ws.send('perdu');
      }
    } else if (ws === party[1].sock) {
      if (party[1].score > party[0].score) {
        ws.send('gagne');
      } else if (party[1].score === party[0].score) {
        ws.send('egalite');
      } else {
        ws.send('perdu');
      }
      }
    })
  ws.send('something');
});
