import { Component, computed, inject, Signal, WritableSignal } from '@angular/core';
import { SaveFormService } from '../../core/services/save-form/save-form.service';
import { TitleCasePipe } from '@angular/common';
import { Submission } from '../../core/models/submission.model';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-submissions',
  imports: [TitleCasePipe, MatButtonModule],
  templateUrl: './view-submissions.component.html',
  styleUrl: './view-submissions.component.scss'
})
export class ViewSubmissionsComponent {

  formService = inject(SaveFormService)
  router = inject(Router)

  readonly allSubmission!: Signal<Submission[]>

  constructor() {
    this.allSubmission = computed(() => this.formService.getSubmissions());
  }

  getKeys(submission: Submission) {
    return Object.keys(submission.formData)
  }

  getValue(key: string, submission: any) {
    if (submission.formData[key]) {
      return submission.formData[key]
    }
    return ''
  }

  goBack() {
    this.router.navigateByUrl('view-forms')
  }
}
