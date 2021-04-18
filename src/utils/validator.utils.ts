/**
 * @param validateError
 */
export const validatorMapping = (validateError: { errors: any[]; }) => validateError?.errors.map((error: any) => ({
    'name': error.path,
    'type': error.type,
    'message': error.message,
    'rule': error.validatorKey === 'is' ? error.validatorArgs: null
}))
