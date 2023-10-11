# Multi DNS
A dns server that can check multiple other servers and choose an available IP address. 

Use case: some nameservers can give unavailable IPs

It can only resolve A records. 
It check addresses for being available on TLS port 

## How to use

1. Put DNS servers that you found into "servers" file
2. `npm i` and run the script `npm start`
3. Configure your program to use this server, default port is 5332


## To do
 - Add DNS over HTTPS
 - Add support of records other than A
