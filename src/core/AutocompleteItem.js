import {observable} from 'mobx'

export class Item {
  @observable highlighted = false

  constructor(item) {
    this.field = item.field
    this.value = item.value
    this.count = item.count
  }
}
