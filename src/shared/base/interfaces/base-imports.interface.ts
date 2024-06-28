export interface BaseConsumer<T> {
  products: T[];
  lastLote: boolean;
  incrementalImport?: boolean;
}
