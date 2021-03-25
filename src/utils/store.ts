import { TaskListImpl } from '../entities/TaskList/TaskList';
import { TaskList } from '../entities/TaskList/ITaskList';

class StoreService {
  private authorNameKey = 'author'
  private columnKey = "columns"
  private storage = window.localStorage;

  // Name store

  public setName(name: string) {
    this.storage.setItem(this.authorNameKey, name)
  }

  public getName() {
    return this.storage.getItem(this.authorNameKey)
  }

  public removeName() {
    this.storage.removeItem(this.authorNameKey)
  }

  // Columns store

  public addColumns(names: string[]) {
    const columns = this.getColumns()
    const position = columns.length ?? 0

    names.forEach((name, index) => {
      columns.push(new TaskListImpl(name, position + index))
    })

    this.setColumns(columns)
  }

  public getColumns(): TaskList[] {
    const value = this.storage.getItem(this.columnKey)
    if (value) {
      return JSON.parse(value)
    }

    return []
  }

  private setColumns(arr: TaskList[]) {
    this.storage.setItem(this.columnKey, JSON.stringify(arr))
  }

  public removeColumns() {
    this.storage.removeItem(this.columnKey)
  }

  // Column store

  public addColumn(name: string) {
    const columns = this.getColumns()
    const position = columns.length ?? 0
    const taskList = new TaskListImpl(name, position)

    columns.push(taskList)
    this.setColumns(columns)
  }

  public renameColumn(id: string, name: string) {
    const columns = this.getColumns().map(c => {
      if (c.id === id) {
        c.name = name
      }
      return c
    })

    this.setColumns(columns)
  }
}

export default new StoreService()
