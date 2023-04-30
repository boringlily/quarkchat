export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          author: string
          content: string
          created_at: string
          edited: boolean | null
          id: string
          post: string
        }
        Insert: {
          author: string
          content?: string
          created_at?: string
          edited?: boolean | null
          id?: string
          post: string
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          edited?: boolean | null
          id?: string
          post?: string
        }
      }
      posts: {
        Row: {
          author: string | null
          author_id: string
          content: string
          created_at: string
          edited: boolean | null
          id: string
        }
        Insert: {
          author?: string | null
          author_id: string
          content?: string
          created_at?: string
          edited?: boolean | null
          id?: string
        }
        Update: {
          author?: string | null
          author_id?: string
          content?: string
          created_at?: string
          edited?: boolean | null
          id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string
        }
      }
      upvotes: {
        Row: {
          id: string
          total: number
        }
        Insert: {
          id: string
          total: number
        }
        Update: {
          id?: string
          total?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
