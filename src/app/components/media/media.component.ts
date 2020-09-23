import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { MediaService } from './services/media.service';
import { MediaFormComponent } from './media-form/media-form.component';
import { systemSettings } from "../../app-config"
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  serverURL=""
  isLoading=true
  public medias;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Type","Name","MetaTags","AlternativeText", "Description", "Image", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private mediaService: MediaService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.serverURL=systemSettings.serverURL;
    this.initializeTable();
  }
  initializeTable() {
    this.mediaService.getMedias().subscribe((medias: any) => {
      this.isLoading = false;
      this.medias = new MatTableDataSource(medias);
      this.medias.sort = this.sort;
      this.medias.paginator = this.paginator;
    });
  }
  onAdd() {
    this.mediaService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Media" };
    let dalogRef=this.dialog.open(MediaFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  onEdit(element) {
    console.log("element to edit ",element)
    this.mediaService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    
    dialogConfig.width = "60%";
    dialogConfig.data = { 
      title: "Edit A Media",
       xLargeImageUrl: element.Media_xLargImageUrl,
       largeImageUrl:element.Media_LargImageUrl,
      mediumImageUrl:element.Media_MediumImageUrl,
      smallImageUrl:element.Media_SamllImageUrl,
      id:element._id
     };

    let dalogRef=this.dialog.open(MediaFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.medias.filter = this.searchKey.trim().toLowerCase();
  }

}
