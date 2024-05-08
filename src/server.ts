import { server } from './index';
import WebSocket from 'ws';
import dotenv from 'dotenv'
import { prisma } from './index'

dotenv.config()

const port = process.env.API_PORT || 3000

const wss = new WebSocket.Server({ server });

wss.on('connection', async ws => {
  const promotions = await prisma.promotion.findMany();
  const subjects = await prisma.subject.findMany();
  ws.send(JSON.stringify({ promotions, subjects }));
});

server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/api ! 🚀`)
})