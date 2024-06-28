"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const common_1 = require("@nestjs/common");
class Result {
    constructor(isSuccess, error, value, statusCode) {
        this.statusCode = statusCode || common_1.HttpStatus.OK;
        if (isSuccess && error) {
            throw new Error(`InvalidOperation: Um response OK não pode ser
      bem-sucedido e contém um erro`);
        }
        if (!isSuccess && !error) {
            throw new Error(`InvalidOperation: Um response FAIL
      precisa conter uma mensagem de erro`);
        }
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;
        Object.freeze(this);
    }
    getValue() {
        if (!this.isSuccess) {
            return this.handlerError();
        }
        return this._value;
    }
    static Ok(value) {
        return new Result(true, null, value);
    }
    static Fail(origin, error, statusCode) {
        if (statusCode === common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            console.error(origin, error?.message);
        return new Result(false, error, null, statusCode);
    }
    static Combine(results) {
        for (const result of results) {
            if (result.isFailure)
                return result;
        }
        return Result.Ok();
    }
    handlerError() {
        if (this.statusCode)
            throw new common_1.HttpException({
                error: this.error,
                isFailure: this.isFailure,
                isSuccess: this.isSuccess,
            }, this.statusCode);
        else
            throw new common_1.BadRequestException({
                error: this.error,
                isFailure: this.isFailure,
                isSuccess: this.isSuccess,
            });
    }
}
exports.Result = Result;
//# sourceMappingURL=results-api.base.js.map