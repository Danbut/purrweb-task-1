class NameStoreService {
  private key = 'author'
  private storage = window.localStorage;

  public setName(name: string) {
    this.storage.setItem(this.key, name)
  }

  public getName() {
    return this.storage.getItem(this.key)
  }

  public removeName() {
    this.storage.removeItem(this.key)
  }
}

export default new NameStoreService()
