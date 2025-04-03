import { Component, inject, OnInit } from '@angular/core';
import { SaveFormService } from '../../core/services/save-form/save-form.service';
import { SavedForm } from '../../core/models/saved-form';
import { MatButtonModule } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CommonService } from '../../core/services/common-service/common.service';
import { USER_TYPE } from '../../core/enums/user-type';

@Component({
  selector: 'app-view-form',
  imports: [
    MatButtonModule,
    TitleCasePipe
  ],
  templateUrl: './view-form.component.html',
  styleUrl: './view-form.component.scss'
})
export class ViewFormComponent implements OnInit {

  formService = inject(SaveFormService)
  commonService = inject(CommonService)
  router = inject(Router)

  allForms: SavedForm[] = []
  userType!: string | null
  userTypes = USER_TYPE

  ngOnInit() {
    this.allForms = this.formService.getAllSavedForms()
    this.userType = localStorage.getItem('loginType') || null
  }

  fillForm(form: SavedForm) {
    if (form?.uuid) {
      this.commonService.setViewFormData({
        uuid: form.uuid,
        editAccess: true
      })
      this.router.navigateByUrl('fill-form')
      return
    }
    this.formService.openSnackBar('Invalid Form')
  }

  editForm(form: SavedForm) {
    this.commonService.setEditingFormData({ uuid: form?.uuid || null })
    this.router.navigateByUrl('build-form')
  }

  addNewForm() {
    this.commonService.setEditingFormData({ uuid: null })
    this.router.navigateByUrl('build-form')
  }

  viewForm(form: SavedForm) {
    if (form?.uuid) {
      this.commonService.setViewFormData({
        uuid: form.uuid,
        editAccess: false
      })
      this.router.navigateByUrl('fill-form')
      return
    }
    this.formService.openSnackBar('Invalid Form')
  }

  deleteForm(form: SavedForm) {
    this.formService.deleteForm(form.uuid)
    this.ngOnInit()
  }

  viewSubmission() {
    this.router.navigateByUrl('submissions')
    
  }

  logout() {
    this.router.navigateByUrl('login')
  }
}
