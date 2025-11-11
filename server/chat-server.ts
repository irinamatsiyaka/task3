import WebSocket, { WebSocketServer } from "ws";
type RawData = string | Buffer | ArrayBuffer | Buffer[];

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws: WebSocket) {
   ws.on("error", console.error);

   ws.on("message", function message(data: RawData) {
      if (!wss.clients) return;
      wss.clients.forEach((client: WebSocket) => {
         if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
         }
      });
   });
});

console.log("WebSocket server listening on ws://localhost:8080");
