import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { SavedForm } from '../../models/saved-form';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Submission } from '../../models/submission.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveFormService {

  private _snackBar = inject(MatSnackBar);
  private httpClient = inject(HttpClient)

  submissions = signal<Submission[]>([])
  
  constructor() {
    this.submissions.set(JSON.parse(localStorage.getItem('submissions') || `[]`))
  }

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

  submitForm(data: Submission) {

    // API call
    // This api will not be successful, because there is no such endpoint
    this.httpClient.post(
      environment.baseUrl + '/submission',
      data,
    ).subscribe({
      next: response => {
        // success response
      },
      error: error => {
        console.error(error)
      }
    })

    this.submissions.update((prevData: any) => {
      return [
        ...prevData,
        data
      ]
    })
    localStorage.setItem('submissions', JSON.stringify(this.submissions()))
  }

  getSubmissions() {
    return this.submissions()
  }
}
