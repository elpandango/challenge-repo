export type ApiAdditionalErrorObjectType = {
  response: Response;
};

export default class ApiError extends Error {
  extraData: ApiAdditionalErrorObjectType;
  constructor(extraData: ApiAdditionalErrorObjectType) {
    super();
    this.extraData = extraData;
  }
}
