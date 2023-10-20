from dns import resolver
import socket
import yaml


class Conf:

    file = 'multidns.conf'

    default_conf = {
        "check": {
            'port': 443,
            'timeout-s': 3
        },
        'servers': ['8.8.8.8']
    }

    def __init__(self):

        conf = self.default_conf

        try:
            with open(self.file) as f:
                conf = yaml.load(f.read(), Loader=yaml.CFullLoader)
        except:
            with open(self.file, "w") as f:
                f.write(yaml.dump(self.default_conf, Dumper=yaml.CSafeDumper))

        self.port = conf['check']['port']
        self.timeout = conf['check']['timeout-s']
        self.servers = conf['servers']


conf = Conf()


def check_ip(ip: str) -> bool:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(conf.timeout)

    try:
        s.connect((ip, conf.port))
        return True
    except:
        return False


def resolve_A(name: str) -> str:

    ips = []
    dns = resolver.Resolver()

    for server in conf.servers:

        dns.nameservers = [server]
        for res in dns.resolve(name, "A"):

            res = str(res)
            if check_ip(res):
                ips.append(res)

    return ips
