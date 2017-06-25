import {Component, ChangeDetectionStrategy, Output, ViewChild, EventEmitter, Input, ElementRef} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'template-modal',
  templateUrl: 'template-modal.template.html'
})
export class TemplateModalComponent {

  private modalName: string =  'templateFormModal';
  private modalRef: NgbModalRef;

  @ViewChild('content') _templateModal: ElementRef;

  @Input() set modalState(_modalState:any) {
    if(_modalState == this.modalName) {
      this.openModal();
    } else if(this.modalRef) {
      this.closeModal();
    }
  }

  @Output() onCloseModal = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal
  ) {
  }

  openModal() {
    let self = this;
    // Super Dirty way to avoid ExpressionChangedAfterItHasBeenCheckedError:
    // https://github.com/angular/angular/issues/14748
    // https://github.com/angular/angular/issues/15464
    setTimeout(
      () => self.modalRef = self.modalService.open(self._templateModal, {backdrop: 'static' , keyboard: false, size: 'sm'}),
      50
    );
  }

  closeModal() {
    this.modalRef.close();
  }

}
