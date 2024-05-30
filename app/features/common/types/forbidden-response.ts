export class ForbiddenResponse extends Response {
  constructor() {
    super(null, { status: 403 });
  }
}
