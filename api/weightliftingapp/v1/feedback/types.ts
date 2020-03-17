export type Feedback = {
  id: string
  user_id: string
  device_id: string
  timestamp: number
  title: string
  body: string
  upvotes: number
  upvote_device_ids: string[]
}

export type FeedbackQuery = {
  success: boolean
  items: Feedback[]
}
