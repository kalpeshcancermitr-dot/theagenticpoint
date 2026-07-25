/*
# Bootstrap first admin user

Allows the very first authenticated user to create their own admin profile
(chicken-and-egg: super admins create profiles, but the first super admin
needs a profile). Once any profile exists, this policy stops matching and
only super admins can add users.
*/

drop policy if exists "bootstrap_first_admin_profile" on public.admin_profiles;
create policy "bootstrap_first_admin_profile" on public.admin_profiles
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and not exists (select 1 from public.admin_profiles)
  );

-- Function to auto-assign Super Admin role on first-ever profile insert
create or replace function public.auto_assign_super_admin()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.role_id is null then
    select id into new.role_id from public.admin_roles where is_super_admin = true limit 1;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_auto_assign_super_admin on public.admin_profiles;
create trigger trg_auto_assign_super_admin
  before insert on public.admin_profiles
  for each row execute function public.auto_assign_super_admin();
