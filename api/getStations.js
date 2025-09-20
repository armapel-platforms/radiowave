const streams = [
    { name: 'DYHP RMN Cebu', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cb/DYHP_612.png', type: 'audio/mpeg', manifestUri: 'https://de3.amfmph.com/ssl/rmncebu?mp=/stream&1758366700449' },
    { name: 'hitsradio.com', logo: 'https://static.mytuner.mobi/media/tvos_radios/552/977-todays-hits.81a51b5b.jpg', type: 'audio/mpeg', manifestUri: 'https://18723.live.streamtheworld.com/977_HITS_SC' }
];

const publicStreams = streams.map(stream => ({
  name: stream.name,
  logo: stream.logo,
  type: stream.type, 
}));

export default function handler(request, response) {
  response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  response.status(200).json(publicStreams);
}
