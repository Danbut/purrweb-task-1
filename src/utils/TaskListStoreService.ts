import { TaskListImpl } from '../entities/TaskList/TaskList';
import { TaskList } from '../entities/TaskList/ITaskList';

class TaskListStoreService {
  private key = "columns"
  private storage = window.localStorage

  addColumn(name: string) {
    const columns = this.getColumns()
    const position = columns.length ?? 0
    const taskList = new TaskListImpl(name, position)

    columns.push(taskList)
    this.setColumns(columns)
  }

  public getColumns(): TaskList[] {
    const value = this.storage.getItem(this.key)
    if (value) {
      return JSON.parse(value)
    }

    return []
  }

  public removeColumns() {
    this.storage.removeItem(this.key)
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

  private setColumns(arr: TaskList[]) {
    this.storage.setItem(this.key, JSON.stringify(arr))
  }
}

export default new TaskListStoreService()
