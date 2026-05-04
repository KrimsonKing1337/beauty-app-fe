export type ApiErrorPayload = {
  message?: string;
  error?: string;
  code?: string;
  details?: unknown;
};

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Некорректный запрос',
  401: 'Нужно войти в аккаунт',
  403: 'Недостаточно прав',
  404: 'Данные не найдены',
  409: 'Конфликт данных',
  413: 'Файл слишком большой',
  422: 'Не удалось обработать данные',
  500: 'Ошибка сервера',
};

export class ApiError extends Error {
  status: number;
  statusText: string;
  code?: string;
  details?: unknown;

  constructor(args: {
    message: string;
    status: number;
    statusText: string;
    code?: string;
    details?: unknown;
  }) {
    super(args.message);

    this.name = 'ApiError';
    this.status = args.status;
    this.statusText = args.statusText;
    this.code = args.code;
    this.details = args.details;
  }
}

export const getErrorMessage = (
  error: unknown,
  fallback = 'Что-то пошло не так',
): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

const parseErrorPayload = async (
  response: Response,
): Promise<ApiErrorPayload | null> => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as ApiErrorPayload;
  } catch {
    return {
      message: text,
    };
  }
};

export const createApiError = async (response: Response): Promise<ApiError> => {
  const payload = await parseErrorPayload(response);

  const message =
    payload?.message ||
    payload?.error ||
    STATUS_MESSAGES[response.status] ||
    `Ошибка запроса: ${response.status}`;

  return new ApiError({
    message,
    status: response.status,
    statusText: response.statusText,
    code: payload?.code,
    details: payload?.details,
  });
};
