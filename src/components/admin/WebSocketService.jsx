import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    this.client = new Client({
      brokerURL: 'http://localhost:8080/ws', // Dirección del endpoint WebSocket
      connectHeaders: {},
      debug: (str) => {
        console.log('WebSocket debug:', str); // Logs del WebSocket para ayudar a depurar
      },
      onConnect: () => {
        console.log('Conectado a WebSocket');
      },
      onDisconnect: () => {
        console.log('Desconectado de WebSocket');
      },
      onStompError: (frame) => {
        console.error('Error STOMP:', frame);
      },
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
    });

    // Conectar y activar la conexión WebSocket
    this.client.activate();

    // Agregar manejadores de error y cierre globales
    this.client.onError = (error) => {
      console.error('Error de WebSocket:', error);
    };

    this.client.onClose = (event) => {
      console.log('Conexión WebSocket cerrada', event);
    };
  }

  // Suscripción a los canales de notificación
  subscribeToNotifications = (channel, callback) => {
    console.log(`Suscribiéndome al canal: ${channel}`);
    this.client.subscribe(channel, (message) => {
      console.log(`Mensaje recibido del canal ${channel}:`, message.body); // Log de los mensajes recibidos
      callback(JSON.parse(message.body)); // Llamar al callback con el mensaje
    });
  };

  // Método para cerrar la conexión
  disconnect = () => {
    if (this.client.connected) {
      this.client.deactivate();
    }
  };
}

export default new WebSocketService();
