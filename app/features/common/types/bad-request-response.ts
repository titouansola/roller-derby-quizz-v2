export class BadRequestResponse extends Response {
  constructor() {
    super(null, { status: 400 });
  }
}
