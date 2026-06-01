module.exports=(io)=>{io.on("connection",socket=>{socket.on("ticket:join",id=>socket.join(String(id)));socket.on("ticket:leave",id=>socket.leave(String(id)))})};
