-- Omitir este archivo al migrar a Postgres que no sea Supabase.
alter table kc_clients enable row level security;
alter table kc_services enable row level security;
alter table kc_contact_requests enable row level security;
alter table kc_contact_request_services enable row level security;
alter table kc_projects enable row level security;
alter table kc_project_services enable row level security;

revoke execute on function kc_submit_contact_request(text,text,text,text[],text,text) from public, anon, authenticated;
revoke execute on function kc_count_recent_requests(text,interval) from public, anon, authenticated;
grant execute on function kc_submit_contact_request(text,text,text,text[],text,text) to service_role;
grant execute on function kc_count_recent_requests(text,interval) to service_role;
