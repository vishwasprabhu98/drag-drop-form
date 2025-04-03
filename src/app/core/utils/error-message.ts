export function getErrorMessage(errors: any, errorMessageObject: Record<string, string>) {
  if (!errors) {
    return ''
  }
  if (errors?.['required']) {
    return 'This field is required'
  } else if (errors?.['minlength']) {
    return errorMessageObject['minLength'] || ('Minimum length expected is ' + errors['minlength']?.requiredLength)
  } else if (errors?.['maxlength']) {
    return errorMessageObject['maxLength'] || ('Maximum length expected is ' + errors['maxlength']?.requiredLength)
  } else if (errors?.['min']) {
    return errorMessageObject['min'] || ('Minimum number expected is ' + errors['min']?.min)
  } else if (errors?.['max']) {
    return errorMessageObject['max'] || ('Maximum number expected is ' + errors['max']?.max)
  } else if (errors?.['pattern']) {
    return errorMessageObject['pattern'] || ('Accepted pattern expected is ' + errors['pattern']?.requiredPattern)
  }
  return ''
}