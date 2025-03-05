import { Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { NgbAlert, NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from './alerts.service';
import { debounceTime, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-alerts',
  imports: [NgbAlertModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
// export class AlertsComponent implements OnInit{
//   @ViewChild("modalAlert") modalAlert!: ElementRef;
//   isAlert:boolean = true;
//   alertType: string = "info";

//   title = "";
//   isHtmlContent: boolean | undefined = false;
//   content = "";
//   confirmFunction: any;
//   cancelFunction: any;

//   public get modal() {
//     return this.injector.get(NgbModal);
//   }

//   public get alertService() {
//     return this.injector.get(AlertsService);
//   }

//   constructor(private injector: Injector) {
//   }

//   ngOnInit(): void {
//     this.alert();
//     this.confirm();
//   }

//   alert() {
//     this.alertService.alertSettings.subscribe(
//       (data) => {
//         this.isAlert = true;
//         this.alertType = data.type;
//         this.title = data.title;
//         this.content = data.content;
//         this.isHtmlContent = data.isHtmlContent;

//         this.modal.open(this.modalAlert, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

//         }, (reason) => {

//         });
//         return true;
//       }
//     )
//   }

//   confirm() {
//     this.alertService.confirmAlertSettings.subscribe(
//       (data) => {
//         this.isAlert = false;
//         this.alertType = data.type;
//         this.title = data.title;
//         this.content = data.content;
//         this.confirmFunction = data.confirm;
//         this.cancelFunction = data.cancel;
//         this.isHtmlContent = data.isHtmlContent;

//         this.modal.open(this.modalAlert, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

//         }, (reason) => {

//         });
//         return true;
//       }
//     )
//   }

//   confirmAlert() {
//     this.confirmFunction();
//   }

//   cancelAlert() {
//     this.hide();
//     if(this.cancelFunction !== undefined) {
//       this.cancelFunction();
//     }
//   }

//   hide() {
//     this.modal.dismissAll();
//   }

//   setAlertColor(alertType: string) {
//     if(alertType === 'error') {
//       return 'danger';
//     }
//     return alertType;
//   }
// }
export class AlertsComponent {
  private _message$ = new Subject<string>();
  @Input() messageType: string = '';
  @Input() messageContent: string = '';

	staticAlertClosed = false;
	successMessage: string | unknown = '';

	@ViewChild('staticAlert', { static: false }) staticAlert!: NgbAlert;
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

	constructor() {
		this._message$
			.pipe(
				takeUntilDestroyed(),
				tap((message) => (this.successMessage = this.messageContent)),
				debounceTime(5000),
			)
			.subscribe(() => this.selfClosingAlert?.close());
	}

	public changeSuccessMessage() {
		this._message$.next(`${new Date()} - Message successfully changed.`);
	}
}


