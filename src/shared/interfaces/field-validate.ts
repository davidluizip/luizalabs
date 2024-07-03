export interface FieldValidation<T> {
  validate(user: T): void;
}
