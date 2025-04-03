import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  viewFormData = signal<{uuid: string|null, editAccess: boolean}>({uuid: null, editAccess: false})
  editFormData = signal<{uuid: string|null}>({ uuid: null })

  constructor() { }

  setViewFormData(data: {uuid: string|null, editAccess: boolean}) {
    this.viewFormData.set(data)
  }

  setEditingFormData(data: {uuid: string|null}) {
    this.editFormData.set(data)
  }
}
