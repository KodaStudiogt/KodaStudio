-- SOLO DESARROLLO: datos ficticios para entorno local; nunca usar como muestra real.
insert into kc_clients (full_name, email) values ('Cliente de Prueba', 'cliente@example.com')
on conflict ((lower(email))) do nothing;
insert into kc_contact_requests (client_id, message, source, status)
select id, 'Solicitud ficticia para comprobar el entorno local.', 'seed-dev', 'new'
from kc_clients where lower(email) = lower('cliente@example.com')
and not exists (select 1 from kc_contact_requests where source = 'seed-dev' and client_id = kc_clients.id);
