-- CEURS–Escolas: papéis definidos previamente + convites.
-- Execute uma vez no SQL Editor do Supabase.

create type public.app_role as enum ('participante', 'curador', 'admin', 'master');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  role public.app_role not null default 'participante',
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create unique index user_roles_unico_master on public.user_roles (role) where role = 'master';

create table public.convites (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role public.app_role not null,
  convidado_por uuid references auth.users(id) on delete set null,
  aceito_em timestamptz,
  created_at timestamptz not null default now(),
  constraint convite_sem_master check (role <> 'master')
);
grant select, insert, update, delete on public.convites to authenticated;
grant all on public.convites to service_role;
alter table public.convites enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Ver o proprio papel" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(),'admin') or public.has_role(auth.uid(),'master'));
create policy "Master gerencia papeis" on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(),'master'))
  with check (public.has_role(auth.uid(),'master') and role <> 'master');
create policy "Admin define curador/participante" on public.user_roles for update to authenticated
  using (public.has_role(auth.uid(),'admin') and role in ('participante','curador'))
  with check (public.has_role(auth.uid(),'admin') and role in ('participante','curador'));

create policy "Admin e master veem convites" on public.convites for select to authenticated
  using (public.has_role(auth.uid(),'admin') or public.has_role(auth.uid(),'master'));
create policy "Master convida qualquer papel" on public.convites for all to authenticated
  using (public.has_role(auth.uid(),'master')) with check (public.has_role(auth.uid(),'master'));
create policy "Admin convida curador/participante" on public.convites for insert to authenticated
  with check (public.has_role(auth.uid(),'admin') and role in ('participante','curador'));

create or replace function public.atribuir_papel_novo_usuario()
returns trigger language plpgsql security definer set search_path = public as $$
declare _role public.app_role;
begin
  if lower(new.email) = 'suporte@leful.com.br' then
    _role := 'master';
  else
    select role into _role from public.convites where lower(email) = lower(new.email);
    update public.convites set aceito_em = now() where lower(email) = lower(new.email);
  end if;
  insert into public.user_roles (user_id, role) values (new.id, coalesce(_role, 'participante'))
  on conflict (user_id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created_role
  after insert on auth.users for each row execute function public.atribuir_papel_novo_usuario();

insert into public.user_roles (user_id, role)
select id, case when lower(email) = 'suporte@leful.com.br' then 'master'::public.app_role else 'participante' end
from auth.users on conflict (user_id) do nothing;
