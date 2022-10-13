export interface Activity {
  id: number
  title?: string
  description?: string
  locale?: string
  intervenant?: string
  sponsors?: Array<string>
  type?: number
}