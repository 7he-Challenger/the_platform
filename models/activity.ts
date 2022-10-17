export interface Activity {
  '@id'?: string,
  '@type'?: string,
  id: number
  title?: string
  description?: string
  locale?: string
  intervenant?: string
  sponsors?: Array<string>
  type?: number
}

export type ActivityType = {
  id: number | null
  title?: string
  description?: string
  locale?: string
  intervenant?: string
  sponsors?: Array<string>
  type?: number
  startDate?: string
  endDate?: string
}