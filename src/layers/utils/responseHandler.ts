export const success = (statusCode: number, body: any) => ({
  statusCode,
  body: JSON.stringify({ success: true, data: body }),
});

export const failure = (statusCode: number, message: string) => ({
  statusCode,
  body: JSON.stringify({ success: false, error: message }),
});