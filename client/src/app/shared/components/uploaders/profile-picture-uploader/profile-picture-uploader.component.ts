import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Account } from 'src/app/shared/models/account';
import { Modal } from 'src/app/shared/models/modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-picture-uploader',
  templateUrl: './profile-picture-uploader.component.html',
  styleUrls: ['./profile-picture-uploader.component.scss']
})
export class ProfilePictureUploaderComponent implements OnInit {
  uploader?: FileUploader;
  hasBaseDropzoneOver = false;
  modal: Modal = new Modal;
  baseUrl = environment.apiUrl;
  url = '';
  account: Account = {} as Account;

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private confirmService: ConfirmService) {
      this.accountService.currentAccount$.pipe(take(1)).subscribe({
        next: account => {
          if (account) {
            this.account = account;
          }
        }
      })
  }

  ngOnInit(): void {
    const account: Account = this.account;
    const token: string = `Bearer ${account.token}`;
    const url: string = `${this.baseUrl}account/profile-picture`;
    this.initializeUploader(token, url);
  }

  private initializeUploader(token: string, url: string): void {
    this.uploader = new FileUploader({
      url: url,
      authToken: token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: true,
      maxFileSize: 10 * 1024 * 1042,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const account: Account = JSON.parse(response);
        this.accountService.setCurrentAccount(account);
        this.account = account;
      }
    };
  }

  public delete(): void {
    this.modal.title = `Eliminación de foto`;
    this.modal.message = '¿Está seguro de eliminar su foto de perfil?';
    this.modal.btnCancelText = 'Cancelar';
    this.modal.btnOkText = 'Eliminar';
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.accountService.deleteProfilePicture().subscribe({
          next: account => {
            this.toastr.success('Foto eliminada correctamente');
            this.account = account;
          },
          error: () => {
            this.toastr.error('Error al borrar');
          }
        })
      }
    })
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  public showUploader(): boolean {
    return this.account.photoUrl === null;
  }
}
