This information is only available in Swedish.

# En responsiv live-graphite-dashboard
Jag ville utforska möjligheterna att skriva en egen dashboard mot en graphitedatabas. För ett tag sedan installerade jag en rad mätare hemma som håller reda på temperatur, luftfuktighet, elförbrukning, mm. Dessa rapporterar löpande in till en graphiteserver som jag har i Amazons fantastiska moln, [EC2](http://aws.amazon.com/ec2/). [Graphite](http://graphite.wikidot.com/) har dessutom möjligheten att exponera [data som JSON](http://graphite.readthedocs.org/en/1.0/url-api.html#format) utan att man ens behöver anstränga sig. Upplägget är alltså en dashboard för huset.

Det responsiva löser jag med [Skeleton](http://www.getskeleton.com/), som på ett lättviktigt och rent sätt hjälper mig med strukturen. Graferna ritar jag inte med graphite eftersom jag vill ha litet termometrar och mätare, samt kunna aminera dem. Valet denna gång föll på [RGraph](http://www.rgraph.net/) som mer än väl räcker till för mina behov. Det hela knyts ihop med [jQuery](http://jquery.com/).


Ett fungerande exempel kan finnas [här](http://hem.lizell.se/content/dash/).

![Källaren](https://www.evernote.com/shard/s19/sh/ca82d9b8-4908-498a-a0b0-84328687a824/17aa447f2faa35d48b23a2d8315c43cd/res/1be692af-1fa7-42e9-a75f-3050c2909aee/skitch.png?resizeSmall&width=400 "Källaren").
