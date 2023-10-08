import dns2 from 'dns2'
import dns from "dns"
import fs from "fs"
import net from "net"

function getServers() {

    let fd = fs.readFileSync("server", { flag: "a+", encoding: "utf8" })
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

        let servers = getServers();

        console.log("got req")

        for (let server of servers) {
            dns.setServers([server])
            dns.lookup(name, (err, address) => {
                console.log("lookuped")


                let socket = checkIP(address)
                socket.on("ready", () => { // Connects successfully

                    console.log("check")
                    response.answers.push({
                        name,
                        type: Packet.TYPE.A, // Only A record
                        class: Packet.CLASS.IN,
                        ttl: 300,
                        address: address
                    });
                    send(response);

                    socket.destroy()

                })
            })
        }


    }
});


server.listen({

    udp: 5332,

}).then(() => console.log("started"))
