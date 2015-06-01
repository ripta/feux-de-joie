import {OrderedModel} from "./ordered-model"
import {ListWrapper} from "../../node_modules/angular2/src/facade/collection"

export class ModelStore {
  records: List<OrderedModel> = []

  add(record: OrderedModel) {
    ListWrapper.push(this.records, record)
  }

  remove(record: OrderedModel) {
    var i = this.records.indexOf(record)
    if (i > -1) {
      var spliced = ListWrapper.splice(this.records, i, 1)
      return spliced[0]
    }

    return null
  }

  removeMatching(pred: Function) {
    var records = ListWrapper.filter(this.records, pred)
    ListWrapper.removeAll(this.records, records)
    return records
  }
}
