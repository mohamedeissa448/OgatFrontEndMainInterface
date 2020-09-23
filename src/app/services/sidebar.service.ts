import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	public sidebarVisible: boolean = true;
	public currentSelectedMainMenu: any ="";
	public currentSelectedSubMenu: any ="";
	constructor() { }

	toggle() {
		this.sidebarVisible = !this.sidebarVisible;
	}

	getStatus() {
		return this.sidebarVisible;
	}
	setcurrentSelectedMainMenu(menuName: any){
		this.currentSelectedMainMenu = menuName;
	}
	getcurrentSelectedMainMenu(){
		return this.currentSelectedMainMenu;
	}
	setcurrentSelectedSubMenu(submenuName: any){
		this.currentSelectedSubMenu = submenuName;
	}
	getcurrentSelectedSubMenu(){
		return this.currentSelectedSubMenu;
	}
}
