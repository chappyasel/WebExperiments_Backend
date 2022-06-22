import { AuthManager } from '../auth'
import { IDoseCreate, IDoseDelete } from '@shared/caffiene'

export * from '@shared/caffiene'

export class DB {
  static async create(dose: IDoseCreate): Promise<any> {
    const options = await this.fetchOptions('POST', dose)
    return await fetch('/api/caffiene/v1/create', options).then(res => res.json())
  }

  static async get(): Promise<any> {
    const options = await this.fetchOptions()
    return await fetch('/api/caffiene/v1/', options).then(res => res.json())
  }

  static async delete(dose: IDoseDelete): Promise<any> {
    const options = await this.fetchOptions('DELETE', dose)
    return await fetch('/api/caffiene/v1/delete', options).then(res => res.json())
  }

  // MARK: - Private

  private static async fetchOptions(method?: string, body?: any): Promise<any> {
    const token = await AuthManager.shared.getToken()
    return {
      method: method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  }
}
