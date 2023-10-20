# Multi DNS
A dns resolve program that can check multiple other servers and choose an available IP address. 

Use case: some nameservers can give unavailable IPs

It can only resolve A records

## How to use

1. Put DNS servers that you found into `.conf` file in your work directory 
2. Run `pip install .` to install as a python package
3. Use it in your grogram by importing `resolve_A`


## To do
 - Add DNS over HTTPS
 - Add support of records other than A
 - Add network server support
