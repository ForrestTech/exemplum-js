type Errors = {
  field: string;
  message: string;
};

export type Failed = {
  code?: string;
  message: string;
  errors: Errors[];
};

export class Result<T> {
  private value?: T;
  private failed?: Failed;

  private constructor(value?: T, failed?: Failed) {
    this.value = value;
    this.failed = failed;
  }

  get result(): T {
    if (this.value === undefined) {
      throw new Error("Value is undefined");
    }
    return this.value;
  }

  get failure(): Failed {
    if (this.failed === undefined) {
      throw new Error("Failed is undefined");
    }
    return this.failed;
  }

  get isSuccess(): boolean {
    return this.value !== undefined;
  }
  get isFailure(): boolean {
    return this.failed !== undefined;
  }

  static success<T>(value: T): Result<T> {
    return new Result<T>(value, undefined);
  }

  static failed<T>(
    message: string,
    code?: string,
    errors?: Errors[]
  ): Result<T> {
    return new Result<T>(undefined, {
      code,
      message,
      errors: errors ?? [],
    });
  }
}
