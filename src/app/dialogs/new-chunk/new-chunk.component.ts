import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ChunkService } from '../../_services/chunk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-chunk',
  templateUrl: './new-chunk.component.html',
  styleUrls: ['./new-chunk.component.scss']
})
export class NewChunkComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewChunkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private chunkService: ChunkService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  newChunkForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit() {
  }

  submitNewChunk() {
    let chunkData = {
      newChunkName: this.newChunkForm.controls.title.value,
      newChunkDescription: this.newChunkForm.controls.description.value,
      parentChunkID: this.data.currentChunk,
      userid: this.data.userid
    }
    this.chunkService.createChunk(chunkData)
    .then((data) => {
      this.snackbar.open('Chunk successfully created!', 'Dismiss', {
        duration: 5000,
        panelClass: 'success-snackbar'
      })
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([`chunk/${data.id}`]);
      });
    })
    .catch((e) => {

    })
  }

}
