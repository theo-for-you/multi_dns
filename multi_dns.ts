import dns2 from 'dns2'
import dns from "dns"
import fs from "fs"
import net from "net"

function getServers() {

    let fd = fs.readFileSync("servers", { flag: "a+", encoding: "utf8" })
    return fd.split(/\r?\n/) // Every new line
}

function checkIP(ip: string) {
    let socket = net.connect({ host: ip, port: 443 }) // Connecting on 433 TCP
    return socket
}

const { Packet } = dns2;

const server = dns2.createServer({
    udp: true,
    handle: (request, send) => {
        const response = Packet.createResponseFromRequest(request);

        let [question] = request.questions;
        let { name } = question;


        for (let server of getServers()) {

            dns.setServers([server])
            // Only A record
            dns.resolve4(name, (err, addresses) => {

                addresses.forEach((address) => {
                    let socket = checkIP(address)

                    // If connects successfully
                    socket.on("ready", () => {

                        response.answers.push({
                            name,
                            type: Packet.TYPE.A,
                            class: Packet.CLASS.IN,
                            ttl: 300,
                            address: address
                        });
                        send(response);

                        socket.destroy()

                    })
                })

            })
        }


    }
});


server.listen({

    udp: 5332,

}).then(() => console.log("started"))
