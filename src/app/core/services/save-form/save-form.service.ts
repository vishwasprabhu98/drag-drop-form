import { inject, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { SavedForm } from '../../models/saved-form';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SaveFormService {
  private _snackBar = inject(MatSnackBar);
  
  constructor() { }

  saveForm(data: SavedForm) {
    const savedForms: SavedForm[] = JSON.parse(localStorage.getItem('savedForms') ?? `[]`)

    savedForms.push({
      uuid: uuidv4(),
      ...data
    })

    localStorage.setItem('savedForms', JSON.stringify(savedForms))
  }

  updateForm(data: SavedForm) {
    const savedForms: SavedForm[] = JSON.parse(localStorage.getItem('savedForms') ?? `[]`)

    const formIndex = savedForms.findIndex(form => form.uuid === data.uuid)
    if (formIndex !== -1) {
      savedForms[formIndex] = data
    } else {
      savedForms.push({
        uuid: uuidv4(),
        ...data
      })
    }

    localStorage.setItem('savedForms', JSON.stringify(savedForms))
  }

  getFormByUUID(uuid: string) {
    const savedForms: SavedForm[] = JSON.parse(localStorage.getItem('savedForms') ?? `[]`)

    const formIndex = savedForms.findIndex(form => form.uuid === uuid)
    if (formIndex !== -1) {
      return savedForms[formIndex]
    } else {
      return null
    }
  }

  getAllSavedForms() {
    const savedForms: SavedForm[] = JSON.parse(localStorage.getItem('savedForms') ?? `[]`)
    return savedForms
  }

  deleteForm(uuid?: string) {
    if (!uuid) {
      this.openSnackBar('Form not found')
      return
    }
    const savedForms: SavedForm[] = JSON.parse(localStorage.getItem('savedForms') ?? `[]`)

    const formIndex = savedForms.findIndex(form => form.uuid === uuid)
    if (formIndex !== -1) {
      savedForms.splice(formIndex, 1)
    }
    localStorage.setItem('savedForms', JSON.stringify(savedForms))
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
