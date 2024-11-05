type HttpResponse<T> = {
  data: T;
  message: string;
  limit?: number;
  page?: number;
  count?: number;
};
