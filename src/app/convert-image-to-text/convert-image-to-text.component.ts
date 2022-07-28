import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { ConvertImageToTextService } from './services/convert-image-to-text.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-convert-image-to-text',
  templateUrl: './convert-image-to-text.component.html',
  styleUrls: ['./convert-image-to-text.component.css'],
  providers: [MessageService],
})
export class ConvertImageToTextComponent implements OnInit, AfterViewInit {
  uploadedFiles: any;
  userId: String = '61b97df64e3280002f16a33c';
  textAreaLeft: any;
  textAreaRight: any = '';
  previousStep: any = new Array(0);
  haveFile: boolean = true;
  spinner: boolean = false;
  @ViewChild('myfile') myfile: FileUpload;
  @ViewChild('textareaLeft1') textAreaLeft1: ElementRef;

  // @HostListener('window:keydown', ['$event'])
  // onKeyPress($event: KeyboardEvent) {
  //   // if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 67)
  //   //   console.log('CTRL + C');
  //   if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 86){
  //     this.myfile.files = window.clipboardData.files
  //   }
  // }

  @HostListener('paste', ['$event'])
  onPaste($event: ClipboardEvent) {
    if ($event.clipboardData?.files) {
      if ($event.clipboardData?.files[0]) {
        if (this.uploadedFiles) {
          this.uploadedFiles = $event.clipboardData?.files[0];
        } else {
          this.uploadedFiles = $event.clipboardData?.files[0];
        }
        this.haveFile = false;
      }
    }
  }

  constructor(
    private convertImageToTextService: ConvertImageToTextService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.textAreaLeft1) {
      this.textAreaLeft1.nativeElement.addEventListener(
        'copy',
        (event: Event) => {
          const selection = document.getSelection();
          var mergePararaph = this.handleBreak(
            selection ? selection.toString() : ''
          );
          this.previousStep.push(this.textAreaRight);
          this.textAreaRight += mergePararaph;
          this.textAreaRight += '\n';
        }
      );
    }
  }

  showSuccess() {
    this.messageService.add({
      key: 'br',
      severity: 'info',
      summary: 'Status',
      detail: 'Success',
      life: 1500,
    });
  }

  uploadFile(event: Event, fileUpload: any) {
    this.handleSubmit();
    this.haveFile = true;
    fileUpload.clear();
  }

  onSelect(e: Event) {
    this.haveFile = true
    this.uploadedFiles = this.myfile.files[0];
  }

  handleSubmit() {
    if (this.uploadedFiles) {
      if (this.uploadedFiles) {
        this.haveFile = true;
        this.spinner = true;
        const formData = new FormData();
        var blob = this.uploadedFiles.slice(
          0,
          this.uploadedFiles.size,
          'image/jpg'
        );
        var newFile = new File([blob], this.userId + '.jpg', {
          type: 'image/jpg',
        });
        formData.append('photo', newFile);
        this.convertImageToTextService
          .uploadFile(formData)
          .subscribe((res: any) => {
            this.textAreaLeft1.nativeElement.value = res.text;
            this.uploadedFiles = null;
            this.spinner = false
            this.showSuccess()
          });
      } else {
        console.log('nul [0]');
      }
    } else {
      console.log('nul');
    }
  }

  handleBreak(data: String) {
    var lines = data.split('\n');
    var merge = '';
    lines.map((line) =>
      merge === '' ? (merge = line.trim()) : (merge = merge + ' ' + line.trim())
    );
    return merge;
  }

  handleBack() {
    if (this.previousStep.length > 0) {
      this.textAreaRight = this.previousStep[this.previousStep.length - 1];
      this.previousStep.pop();
    }
  }

  handleRefresh() {
    this.textAreaRight = '';
  }
}
