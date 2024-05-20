import { ValidationError, ValidationPipe } from '@nestjs/common';
import { iterate } from 'iterare';

/**
 * Source: https://github.com/exonest/better-validation
 */
export class CustomValidationPipe extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]) {
    return iterate(validationErrors)
      .map((error) => this.mapChildrenToValidationErrors(error))
      .flatten()
      .filter((item) => !!item.constraints)
      .map((item) => ({
        errors: Object.values(item.constraints || {}),
        field: (item as any).field || item.property,
      }))
      .filter((errorObject) => errorObject.errors.length > 0)
      .flatten()
      .toArray() as unknown as string[];
  }

  protected prependConstraintsWithParentProp(
    parent: string,
    error: ValidationError,
  ): ValidationError {
    return {
      field: `${parent}.${error.property}`,
      ...super.prependConstraintsWithParentProp(parent, error),
    } as unknown as ValidationError;
  }
}
