import { FormField } from "./input-field"

export interface SavedForm {
  uuid?: string
  formName: string
  formObject: FormField[]
}