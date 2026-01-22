export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            bookings: {
                Row: {
                    id: string
                    user_id: string
                    service_id: number
                    therapist_id: string | null
                    start_time: string
                    end_time: string
                    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
                    payment_status: 'unpaid' | 'paid' | 'refunded'
                    customer_name: string
                    customer_phone: string
                    notes: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    service_id: number
                    therapist_id?: string | null
                    start_time: string
                    end_time: string
                    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
                    payment_status?: 'unpaid' | 'paid' | 'refunded'
                    customer_name: string
                    customer_phone: string
                    notes?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    service_id?: number
                    therapist_id?: string | null
                    start_time?: string
                    end_time?: string
                    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
                    payment_status?: 'unpaid' | 'paid' | 'refunded'
                    customer_name?: string
                    customer_phone?: string
                    notes?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            therapists: {
                Row: {
                    id: string
                    name: string
                    specialty: string
                    is_active: boolean
                    current_shift_status: 'active' | 'break' | 'off_duty'
                    avatar_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    specialty: string
                    is_active?: boolean
                    current_shift_status?: 'active' | 'break' | 'off_duty'
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    specialty?: string
                    is_active?: boolean
                    current_shift_status?: 'active' | 'break' | 'off_duty'
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            services: {
                Row: {
                    id: number
                    name: string
                    price: number
                    duration_minutes: number
                    description: string | null
                    image_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: number
                    name: string
                    price: number
                    duration_minutes: number
                    description?: string | null
                    image_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: number
                    name?: string
                    price?: number
                    duration_minutes?: number
                    description?: string | null
                    image_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
}
