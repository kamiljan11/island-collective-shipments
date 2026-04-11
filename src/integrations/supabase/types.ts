export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      group_campaigns: {
        Row: {
          created_at: string
          currency: string
          current_slots: number
          deposit_amount: number
          description: string | null
          ends_at: string | null
          id: string
          image_url: string | null
          starts_at: string
          status: string
          target_slots: number
          title: string
          unit_price_estimate: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          current_slots?: number
          deposit_amount?: number
          description?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          starts_at?: string
          status?: string
          target_slots?: number
          title: string
          unit_price_estimate?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          current_slots?: number
          deposit_amount?: number
          description?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          starts_at?: string
          status?: string
          target_slots?: number
          title?: string
          unit_price_estimate?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      group_orders: {
        Row: {
          campaign_id: string
          company_name: string
          contact_name: string
          created_at: string
          deposit_amount: number
          deposit_paid: boolean
          email: string
          id: string
          kennitala: string
          notes: string | null
          payment_reference: string | null
          phone: string | null
          quantity: number
          status: string
          updated_at: string
        }
        Insert: {
          campaign_id: string
          company_name: string
          contact_name: string
          created_at?: string
          deposit_amount?: number
          deposit_paid?: boolean
          email: string
          id?: string
          kennitala: string
          notes?: string | null
          payment_reference?: string | null
          phone?: string | null
          quantity?: number
          status?: string
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          company_name?: string
          contact_name?: string
          created_at?: string
          deposit_amount?: number
          deposit_paid?: boolean
          email?: string
          id?: string
          kennitala?: string
          notes?: string | null
          payment_reference?: string | null
          phone?: string | null
          quantity?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_orders_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "group_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          company_name: string
          content: string
          created_at: string
          email: string
          estimated_value: string | null
          form_type: string
          id: string
          kennitala: string
          priority: string
          status: string
          updated_at: string
          weight_info: string | null
        }
        Insert: {
          company_name: string
          content: string
          created_at?: string
          email: string
          estimated_value?: string | null
          form_type?: string
          id?: string
          kennitala: string
          priority?: string
          status?: string
          updated_at?: string
          weight_info?: string | null
        }
        Update: {
          company_name?: string
          content?: string
          created_at?: string
          email?: string
          estimated_value?: string | null
          form_type?: string
          id?: string
          kennitala?: string
          priority?: string
          status?: string
          updated_at?: string
          weight_info?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_campaign_slots: {
        Args: { amount?: number; campaign_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
