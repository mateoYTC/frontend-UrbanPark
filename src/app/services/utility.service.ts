import { ElementRef, Injectable } from '@angular/core';
import{Modal} from 'bootstrap';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  
  
 cerrarModal(modal: ElementRef | undefined) {
    if (modal) {
      const bsModal = Modal.getInstance(modal.nativeElement);
      if (bsModal) {
        bsModal.hide();
      }

      
      setTimeout(() => {
        const backdrop = document.querySelector('.modal-backdrop.fade.show');
        if (backdrop) {
          backdrop.remove();
        }

        
        document.body.classList.remove('modal-open');
        document.body.removeAttribute('style');
      }, 300); 
    }
  }
}
