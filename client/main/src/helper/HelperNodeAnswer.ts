interface INodeAnswer {
  statusCode: number;
  message: string;
  error: string | null;
}

class NodeError extends Error {
  public statusCode: number = 0;

  public message: string = '';

  public error: string | null = null;
}

export class HelperNodeAnswer extends NodeError {
  constructor({ statusCode, message, error }: INodeAnswer) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.error = error || null;
  }
}
