import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { UserQuestions } from '../../_questions/lists/userQuestions';
import { MachineQuestions } from '../../_questions/lists/machineQuestions';
import { TyreQuestions } from '../../_questions/lists/tyreQuestions';
import { ProductionQuestions } from '../../_questions/lists/productionQuestions';
import { MachineService } from '../machine.service';
import { TyreService } from '../tyre.service';
import { ProductionService } from '../production.service';
import { SalesQuestions } from '../../_questions/lists/salesQuestions';
import { UserService } from '../user.service';
import { FilterQuestions } from '../../_questions/lists/filterQuestions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private machineService: MachineService, private tyreService: TyreService, 
    private productionService: ProductionService, private userService: UserService) { }

  //change for each entity
  getQuestions(questionArray, id = null) {
    switch (questionArray) {
      case "user": {
        return of(UserQuestions.sort((a, b) => a.order - b.order));
      }
      case "machine": {
        return of(MachineQuestions.sort((a, b) => a.order - b.order));
      } 
      case "tyre": {
        return of(TyreQuestions.sort((a, b) => a.order - b.order));
      }
      case "production": {
        return of(ProductionQuestions.getQuestions(this.machineService, this.tyreService)
          .sort((a, b) => a.order - b.order));
      }
      case "sales": {
        if(id != null) {
          return of(SalesQuestions.getQuestions(this.productionService, id)
            .sort((a, b) => a.order - b.order));
        }
        return of(SalesQuestions.getQuestions(this.productionService)
          .sort((a, b) => a.order - b.order));
        
      }
      case "filter": {
        return of(FilterQuestions.getQuestions(this.machineService, this.userService)
          .sort((a, b) => a.order - b.order));
      }
      default: return null;
    }
  }

}
