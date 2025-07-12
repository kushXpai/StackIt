// src/types/database.ts

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  password_hash: string;
  is_admin: boolean;
  created_at: string;
}

export interface Question {
  id: string;
  user_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string;
}

export interface Answer {
  id: string;
  question_id: string;
  user_id: string;
  content: string;
  is_accepted: boolean;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}

export interface QuestionTag {
  question_id: string;
  tag_id: string;
}

export interface Vote {
  id: string;
  user_id: string;
  answer_id: string;
  value: number;
  created_at: string;
}

export interface Notification {
  id: string;
  recipient_id: string;
  type: string;
  message?: string;
  is_read: boolean;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  content_type: 'question' | 'answer';
  content_id: string;
  reason?: string;
  created_at: string;
}