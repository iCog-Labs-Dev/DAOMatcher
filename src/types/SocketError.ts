interface SocketError {
  message: string;
  status: number;
}

export const isSocketError = (value: SocketError): value is SocketError => {
  return value.message != null && value.status != null;
};

export default SocketError;
