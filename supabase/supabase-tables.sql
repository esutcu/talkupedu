-- TalkUp Uygulaması Supabase Veritabanı Tabloları

-- Kullanıcı kredileri tablosu
create table user_credits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) unique,
  credits int default 0,
  created_at timestamp default now()
);

-- Öğretmen müsaitlik tablosu
create table availability (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid references auth.users(id),
  date date not null,
  hour time not null,
  is_booked boolean default false,
  created_at timestamp default now()
);

-- Rezervasyon tablosu
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references auth.users(id),
  teacher_id uuid references auth.users(id),
  availability_id uuid references availability(id),
  meet_link text,
  start_time timestamp,
  created_at timestamp default now()
);

-- Kredi paketleri tablosu
create table credit_packages (
  id uuid primary key default uuid_generate_v4(),
  name text,
  amount int,         -- kredi sayısı
  price numeric,      -- örn. $20
  is_active boolean default true
);

-- Ödeme kayıtları tablosu
create table payment_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  package_id uuid references credit_packages(id),
  iyzico_token text,
  status text, -- pending | success | failed
  created_at timestamp default now()
);

-- Referans programı tablosu
create table referral_program (
  id uuid primary key default uuid_generate_v4(),
  is_active boolean default false,
  invite_bonus int,    -- davet eden için
  join_bonus int,      -- davet edilen için
  target_group text,   -- 'all' ya da 'selected'
  created_at timestamp default now()
);

-- Referans bağlantıları tablosu
create table referral_links (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  code text unique,
  created_at timestamp default now()
);

-- Referanslar tablosu
create table referrals (
  id uuid primary key default uuid_generate_v4(),
  referred_user_id uuid references auth.users(id),
  referrer_user_id uuid references auth.users(id),
  credits_awarded boolean default false,
  created_at timestamp default now()
);

-- Row Level Security (RLS) politikaları
-- Öğretmenler kendi uygunluklarını ekleyebilir
create policy "Teachers can add availability"
on availability for insert
using (auth.uid() = teacher_id);

-- Öğretmenler kendi uygunluklarını görebilir
create policy "Teachers can see their availability"
on availability for select
using (auth.uid() = teacher_id);

-- Öğrenciler tüm boş uygunlukları görebilir
create policy "Students can see available slots"
on availability for select
using (is_booked = false);

-- Öğrenciler rezervasyon yapabilir
create policy "Students can book classes"
on bookings for insert
using (auth.uid() = student_id);

-- Öğrenciler kendi rezervasyonlarını görebilir
create policy "Students can see their bookings"
on bookings for select
using (auth.uid() = student_id);

-- Öğretmenler kendi rezervasyonlarını görebilir
create policy "Teachers can see their bookings"
on bookings for select
using (auth.uid() = teacher_id);

-- Kullanıcılar kendi kredi bakiyelerini görebilir
create policy "Users can see their credits"
on user_credits for select
using (auth.uid() = user_id);