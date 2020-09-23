import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { ProductService } from "../services/product.service"
import { NotificationService } from "../../shared/services/notification.service"
import { ViewImagesComponent } from '../view-images/view-images.component';
import { ViewImagesService } from '../../shared/services/view-images.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productCategories:any=[];
  colorVariants:any=[];
  materials:any=[];
  sizeVariants:any=[];
  medias:any=[];
  productUnits:any=[];
  chosedColors:Array<object>=[];
  Color_Variants_Images_Media:any=[];
  Product_DefaultImages_Media:any=[];
  id;
  title;
  forViewImagesIDs:any=[]
  forDefaultViewImagesIDs:any=[]
  constructor(
    public ProductService: ProductService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    private viewImagesService:ViewImagesService,
    private dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id;
    this.forViewImagesIDs=data.forViewImagesIDs;
    this.forDefaultViewImagesIDs=data.forDefaultViewImagesIDs
  }

  ngOnInit() {
    this.initialize()
    
  }
  initialize(){
    this.ProductService.getCategories().subscribe((productCategories)=>{
      this.productCategories=productCategories;
    });
    this.ProductService.getProductMaterials().subscribe((response)=>{
      this.materials=response;
    })
    this.ProductService.getColorVariants().subscribe((response)=>{
      this.colorVariants=response;
      this.ff()
    })
    this.ProductService.getSizes().subscribe((response)=>{
      this.sizeVariants=response;
    })
    this.ProductService.getMedias().subscribe((response)=>{
      this.medias=response;
    })
    this.ProductService.getProductUnits().subscribe((response)=>{
      this.productUnits=response;
    })
  }
  onClear() {
    this.ProductService.form.reset();
  }

  onSubmit() {
    if (this.ProductService.form.valid) {
      //on adding product
      if (this.title === "Add New Product") {
        this.ProductService.addProduct(
          this.ProductService.form.value,this.Product_DefaultImages_Media, this.Color_Variants_Images_Media
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Product") {
        //update product
        this.ProductService.updateProduct(this.ProductService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.ProductService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.ProductService.form.reset();
    console.log("yy",this.ProductService.form.get('Product_Color_Variants'))

    this.dialogRef.close();
  }
  ff(){
    console.log("ff opened")
    let isChosed=0
   this.chosedColors= this.colorVariants.filter((color)=>{
      isChosed =0;
      if(this.ProductService.form.value.Product_Color_Variants){
        this.ProductService.form.value.Product_Color_Variants.forEach((id)=>{
          if(color._id==id){
            isChosed =1;
           
          }
          
        })
        if(isChosed ==1)return true
      }
      
      
    });
  }
  showImages(Color_Name,_id){
    console.log("open imagees to view");
    let viewImagesSendValues=[]
    if(this.title == "Edit A Product"){
      this.forViewImagesIDs.forEach((element)=>{
        if(element.Color_Variants==_id){
          viewImagesSendValues=element.Color_Variants_Images_Media;
        }
      })
      console.log("_id",_id)
      console.log("this.forViewImagesIDs",this.forViewImagesIDs)
      console.log("viewImagesSendValues",viewImagesSendValues)
      this.viewImagesService.form.get("images").setValue(viewImagesSendValues)
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { Color_Name: Color_Name };
    let dalogRef=this.dialog.open(ViewImagesComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      console.log("closed",data);
      this.viewImagesService.form.reset()
      if(data.message== true)
      this.Color_Variants_Images_Media.push({Color_Variants_Images_Media: data.data.images , Color_Variants:_id})
    })
   
  }

  chooseDefaultImages(){
    if(this.title == "Edit A Product"){
      this.viewImagesService.form.get("images").setValue(this.forDefaultViewImagesIDs)
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dalogRef=this.dialog.open(ViewImagesComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      console.log("closed",data);
      this.viewImagesService.form.reset()
      this.Product_DefaultImages_Media= data.data.images ;
    })
  }

}
