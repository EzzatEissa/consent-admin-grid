import {Component, OnInit} from '@angular/core';
import {Lookup} from '../../model/lookup';
import {LookupModel} from '../../model/lookup-model';
import {LookupConfigService} from '../../service/lookup-config.service';
import {ConfigurationUtil} from '../../utilities/configuration-util';

@Component({
  selector: 'app-lookup-config',
  templateUrl: './lookup-config.component.html',
  styleUrls: ['./lookup-config.component.css']
})
export class LookupConfigComponent implements OnInit {
  lookupNameListArray: string[];
  lookupModelList: LookupModel [] = [];
  lookupModel: LookupModel;
  lookupList: Lookup[];
  showLookupButtonFlag = false;
  lookUpAPIName: any;
  showAddNewLookupFlag: boolean;
  showLookupTableFlag: boolean;
  newLookup: Lookup = new Lookup();
  showSuccessMsg: boolean;
  showErrorMsg: boolean;
  errorMesage: any;
  SucessMessage: string;

  constructor(public configUtil: ConfigurationUtil, private lookupConfigService: LookupConfigService) {
  }

  ngOnInit(): void {
    const lookupNameListStr: string = this.configUtil.getProperty('lookup.name.list');
    this.lookupNameListArray = lookupNameListStr.split(',');
    this.lookupNameListArray.forEach(element => {
      const lookupModel = new LookupModel();
      lookupModel.lookupName = element;
      lookupModel.niceName = this.titleCaseWord(element, ' Lookup');
      this.lookupModelList.push(lookupModel)
    });
    console.log('lookupNameListArray: ', this.lookupNameListArray)
    console.log('lookupNameListArray: ', this.lookupModelList)
  }

  showLookupTable(lookupModel: LookupModel) {
    console.log('lookupModel: ', lookupModel)

    this.lookupConfigService.getLookup(lookupModel.lookupName).subscribe(data => {
      console.log(lookupModel.lookupName + '...in getLookupList data= ', data)
      this.lookupList = data.Data;
      this.lookUpAPIName = lookupModel.lookupName;
      this.lookupModel = lookupModel
      this.showSuccessMsg = false;
      this.showErrorMsg = false
      this.showLookupButtonFlag = true;
      this.showLookupTableFlag = true;
    });
  }

  DeleteLookUpRecord(id, index) {
    const lookUpAPIName = this.lookUpAPIName
    if (confirm('Are you sure to delete this ' + this.lookupModel.niceName)) {
      this.lookupConfigService.deleteLookup(lookUpAPIName, id).subscribe(data => {
        console.log(lookUpAPIName + ' deleted successfully ' + data)
        this.lookupList.splice(index, 1);
        this.SucessMessage = 'Lookup deleted Successfully'
        this.showSuccessMsg = true
        this.showErrorMsg = false
      });
    }

  }

  showaddNewTable(lookupName) {
    this.showAddNewLookupFlag = true
  }

  saveNewLookup() {
    const lookUpAPIName = this.lookUpAPIName
    console.log('lookUpAPIName: ', lookUpAPIName)
    console.log('this.newLookup: ', this.newLookup)
    console.log('this.lookupList: ', this.lookupList)
    const idList = this.lookupList.map(obj => obj.id)
    const max = Math.max.apply(Math, idList);
    this.newLookup.id = max + 1
    console.log('this.newLookup: ', this.newLookup)
    this.lookupConfigService.saveLookup(this.newLookup, lookUpAPIName).subscribe(data => {
        console.log(lookUpAPIName + ' saved successfully ' + data)
        this.SucessMessage = 'Lookup added Successfully'
        this.showSuccessMsg = true
        this.showErrorMsg = false
        this.showLookupTableFlag = false;
        this.showAddNewLookupFlag = false;
        // this.lookupList.push(this.newLookup);
      },
      error => {
        // this.showMsg=true;
        this.errorMesage = 'Lookup saving Failed , Error: ' + error.message;
        this.showErrorMsg = true;
        this.showSuccessMsg = false;
        console.log('Error...', error);
      });

  }


  titleCaseWord(word: string, suffix: string) {
    if (!word) {
      return word;
    }
    return word[0].toUpperCase() + word.substr(1).toLowerCase().replace('_', ' ') + suffix;
  }

}
