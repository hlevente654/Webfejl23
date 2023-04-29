import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from "@angular/core";


@Component({
    selector:'shop-menu',
    templateUrl:'./menu.component.html',
    styleUrls:['./menu.component.scss']
})

export class MenuComponent{

    
    @Input() currentPage: string = '';
    @Input() loggedInUser?: firebase.default.User | null;
    
    @Output() selectedPage:EventEmitter<string> = new EventEmitter();
    @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
    @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
    

    constructor(){}

    menuSwitch(){
        this.selectedPage.emit(this.currentPage);
    }

    close(logout?: boolean){
        this.onCloseSidenav.emit(true);
        if(logout === true){
            this.onLogout.emit(logout);
        }
    }

}