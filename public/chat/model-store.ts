import {OrderedModel} from "./ordered-model"

export class ModelStore {
  records: List<OrderedModel> = []

  add(record: OrderedModel) {
    this.records.push(record)
  }

  forEach(callback: Function) {
    this.records.forEach(callback)
  }

  remove(record: OrderedModel) {
    var i = this.records.indexOf(record)
    if (i > -1) {
      var spliced = this.records.splice(i, 1)
      return spliced[0]
    }

    return null
  }

  removeMatching(pred: Function) {
    var records = this.records.filter(pred)
    for (var i = 0; i < records.length; i++) {
      var index = this.records.indexOf(records[i])
      this.records.splice(index, 1)
    }
    return records
  }
}
