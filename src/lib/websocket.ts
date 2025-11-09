import type { ChatMessage } from "../types/message";

const WS_URL = "wss://ws.ifelse.io";

type ChatListener = (message: ChatMessage) => void;

let socket: WebSocket | null = null;
const chatListeners = new Set<ChatListener>();

function isChatMessage(value: unknown): value is ChatMessage {
   if (typeof value !== "object" || value === null) return false;
   const data = value as Record<string, unknown>;

   return (
      typeof data.id === "string" &&
      typeof data.todoId === "string" &&
      typeof data.author === "string" &&
      typeof data.text === "string" &&
      typeof data.createdAt === "string"
   );
}

function openWebSocketConnection(): void {
   if (
      socket &&
      (socket.readyState === WebSocket.OPEN ||
         socket.readyState === WebSocket.CONNECTING)
   ) {
      return;
   }
}

socket = new WebSocket(WS_URL);

socket.onopen = (): void => {
   console.log("ws connected");
};

socket.onclose = (): void => {
   console.log("ws disconnect");
};

socket.onerror = (): void => {
   console.log("ws error");
};

socket.onmessage = (event: MessageEvent): void => {
   try {
      const rawData = String(event.data);
      const parseData = JSON.parse(rawData);

      if (!isChatMessage(parseData)) return;

      for (const listener of chatListeners) {
         listener(parseData);
      }
   } catch (error) {
      console.error("Failed to parse incoming message", error);
   }
};

export function connectToChat(onMessage: ChatListener): () => void {
   chatListeners.add(onMessage);
   openWebSocketConnection();

   return () => {
      chatListeners.delete(onMessage);
   };
}

export function sendChatMessage(
   todoId: string,
   author: string,
   text: string
): void {
   const chatMessage: ChatMessage = {
      id: crypto.randomUUID(),
      todoId,
      author,
      text,
      createdAt: new Date().toISOString(),
   };

   saveMessageToLocalStorage(todoId, chatMessage);

   if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(chatMessage));
   } else {
      console.warn("WS isn't open");
   }
}

export function getChatHistory(todoId: string): ChatMessage[] {
   const storageKey = `chat_${todoId}`;
   try {
      const storedValue = localStorage.getItem(storageKey);
      if (!storedValue) return [];
      const parsedValue = JSON.parse(storedValue);
      if (!Array.isArray(parsedValue)) return [];
      return parsedValue as ChatMessage[];
   } catch {
      return [];
   }
}

function saveMessageToLocalStorage(todoId: string, message: ChatMessage): void {
   const storageKey = `chat_${todoId}`;
   const history = getChatHistory(todoId);
   const updated = [...history, message];
   localStorage.setItem(storageKey, JSON.stringify(updated));
}
