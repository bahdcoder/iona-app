apt update
apt install postgresql postgresql-contrib
sudo -u postgres psql << EOF

CREATE ROLE {{ role }} PASSWORD '{{ password }}';
CREATE DATABASE {{ database }};
\q

>> EOF

