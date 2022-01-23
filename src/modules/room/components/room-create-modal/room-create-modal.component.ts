import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomType } from '../../room.model';
import { RoomService } from '../../services/room.service';

export class CreateRoomFormModel {
  name: string = "";
  type: RoomType = RoomType.Text;
}

@Component({
  selector: 'app-room-create-modal',
  templateUrl: './room-create-modal.component.html',
  styleUrls: ['./room-create-modal.component.less']
})
export class RoomCreateModalComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  isNew: boolean = true;
  isVisible: boolean = false;
  model = new CreateRoomFormModel();

  constructor(private roomService: RoomService) {
  }

  ngOnInit(): void {
  }

  async onOk() {
    if (this.form.form.valid) {
      // invoquer la méthode create du RoomService
      let room = await this.roomService.create(this.model.name, this.model.type);
      this.isNew = true;
      this.close();
    }
  }

  onCancel() {
    this.close();
  }

  open() {
    this.form.resetForm(new CreateRoomFormModel());
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.isNew = false;
  }
}
