import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.scss']
})
export class ComposeMessageComponent implements OnInit {

  details: string;
  message: string;
  sending: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  save() {
    console.log("save");
    this.sending = true;
    this.message = 'Sending message...';

    setTimeout(() => {
      this.sending = false;
      this.message = '';
      this.closePopup();
    }, 1000);
  }

  cancel() {
    this.sending = false;
    this.closePopup();
  }

  closePopup() {
    // Close named router outlet
    this.router.navigate([{ outlets: { popup: null } }]);
  }
}
