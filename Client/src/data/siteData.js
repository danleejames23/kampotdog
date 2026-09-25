export const counters = [
  { key: 'dogs_on_site', value: '85', label: 'DOGS ON SITE' },
  { key: 'long_term_residents', value: '40', label: 'LONG-TERM RESIDENTS' },
  { key: 'dogs_rescued', value: '100+', label: 'DOGS RESCUED' },
  { key: 'founded', value: '2016', label: 'FOUNDED' },
];

const dogProfiles = {
  Coco: { age: '1', description: "Coco is one of Emii's puppies and Yin Yang's sister. She is socialised, eager to learn and at a great age to begin training." },
  'Dop Mouy Eleven': { age: '2', description: 'Dop Mouy (Eleven) is a tripod after a back leg amputation. Rescued from Battambang, he loves strokes, naps and skip-hop greetings.' },
  Emii: { age: '3', description: "Emii is the mum of eight puppies. She has been through a lot and remains one of the calmest and gentlest dogs at the sanctuary." },
  Frog: { age: '4', description: 'Frog is loving, kind and gentle with humans. She loves strokes, cuddles and company, but needs an experienced home because she can be selective with other dogs.' },
  Gohan: { age: '2', description: 'Handsome Gohan can be shy at first. With consistency and training he becomes a loyal companion. He is bonded with Torro.' },
  Heidi: { age: '5', description: 'Heidi is a small girl with big eyes and a calm, confident attitude that makes her a great addition to a household.' },
  Kai: { age: '9', description: 'Kai is a cheeky chap who loves to sing songs of awoooos. He is very sociable and likes hanging out in the bar area.' },
  Lady: { age: '5', description: 'Lady is a beautiful, strong and healthy dog. With a calm environment and a trusted handler, she will flourish.' },
  Lumpi: { age: '3', description: 'Lumpi is a confident and playful small Khmer dog who is low maintenance, easy company and gets on well with humans and other dogs.' },
  Mao: { age: '7', description: 'Mao is a relaxed, chilled lady who enjoys simple pleasures and likes being stroked and groomed.' },
  Missy: { age: '2', description: 'Missy is a small, friendly dog who loves ear scratches and gets on well with humans and other dogs.' },
  Nunie: { age: '2', description: 'Nunie is a very sweet girl who would make a wonderful addition to a household. She is great with kids.' },
  'Pan Pan': { age: '7', description: 'Pan Pan narrowly escaped the dog meat trade. He thrives with care and attention, walks by your side and is happy being handled.' },
  Roller: { age: '1', description: 'Roller is an agile escape artist. He is great with other dogs, likes cuddles and loves exploring.' },
  Sal: { age: '2', description: 'Sal is an incredibly sweet boy who came to us with a severe injury. He has recovered and is ready for his forever home.' },
  Scarlett: { age: '1', description: 'Scarlett is a loving and sleek young dog who happily joins daily walks and cuddles by your side.' },
  Torro: { age: '4', description: 'Torro is a big beautiful boy who bonds deeply with his chosen human. He is bonded with Gohan and ideally they should be adopted together.' },
  'Yin Yang': { age: '1', gender: 'Male', description: "Yin Yang is one of Emii's puppies and Coco's brother. He is playful, bright and already has a sponsor." },
};

const dogImages = [
  ['Yin Yang', 'yin_yang.jpg', true, true],
  ['Ah Bee', 'ah_bee.jpg'], ['Ah Gang', 'ah_gang.jpg'], ['Apple', 'apple.jpg'],
  ['Ben', 'ben.jpg'], ['Bones', 'bones.jpg'], ['Chica', 'chica.jpg'],
  ['Chick Chick', 'chick_chick.jpg'], ['Coco', 'coco.jpg'], ['Cola', 'cola.jpg'],
  ['Dop Mouy Eleven', 'dop_mouy_eleven.jpg'], ['Draco', 'draco.jpg'], ['Emii', 'emii.jpg'],
  ['Eros', 'eros.jpg'], ['Fang Xi', 'fang_xi.jpg'], ['Finn', 'finn.jpg'],
  ['Fish', 'fish.jpg'], ['Frog', 'frog.jpg'], ['Ghibli', 'ghibli.jpg'],
  ['Gizmo', 'gizmo.jpg'], ['Gohan', 'gohan.jpg'], ['Guappa', 'guappa.jpg'],
  ['Gus', 'gus.jpg'], ['Heidi', 'heidi.jpg'], ['Heng', 'heng.jpg'],
  ['Jabba', 'jabba.jpg'], ['Jaxx', 'jaxx.jpg'], ['Jett', 'jett.jpg'],
  ['Kai', 'kai.jpg'], ['Kora', 'kora.jpg'], ['Lady', 'lady.jpg'],
  ['Lucky', 'lucky_-_adopted.jpg'], ['Lumpi', 'lumpi.jpg'], ['Mao', 'mao.jpg'],
  ['Mick', 'mick.jpg'], ['Mickey', 'mickey.jpg'], ['Missy', 'missy.jpg'],
  ['Nunie', 'nunie.jpg'], ['Nyip Nyip', 'nyip nyip.jpg'],
  ['Pan Pan', 'pan_pan.jpg'], ['Pao Bao', 'pao_bao.jpg'], ['Phu Gwoi', 'phu_gwoi.jpg'],
  ['Ping An', 'ping_an.jpg'], ['Ping Lai', 'ping_lai.jpg'], ['Rizzo', 'rizzo.jpg'],
  ['Rocky', 'rocky.jpg'], ['Roller', 'roller.jpg'], ['Rosie', 'rosie.jpg'],
  ['Sabre', 'sabre.jpg'], ['Sal', 'sal.jpg'], ['Scarlett', 'scarlett.jpg'],
  ['Soda', 'soda.jpg'], ['Soo Yung', 'soo_yung.jpg'], ['Srey Leap', 'srey leap.jpg'],
  ['Teddy Cappuccino', 'teddy cappuccino.jpg'], ['Thunder', 'thunder_-_adopted.jpg'],
  ['Torro', 'torro.jpg'], ['William', 'william.jpg'], ['Yakuza', 'yakuza.jpg'], ['Z', 'z.jpg'],
];

export const dogs = dogImages.map(([name, image, pinned = false, sponsored = false], index) => ({
  id: index + 1,
  name,
  image,
  breed: 'Mixed Breed',
  looking_for_home: ['Apple', 'Ben', 'Bones', 'Chica', 'Draco', 'Fish', 'Ghibli', 'Jett', 'Mick', 'Mickey', 'Nyip Nyip', 'Rocky', 'Srey Leap', 'Teddy Cappuccino', 'William', 'Yakuza'].includes(name),
  adopted: ['Lucky', 'Coco', 'Ah Gang'].includes(name),
  pinned,
  sponsored,
  ...(dogProfiles[name] || {}),
}));

export const blogs = [
  { id: 1, title: 'WHO IS JOE?', category: 'Who Is Joe', content: 'Joe is an Australian citizen who fell in love with Cambodia and chose to build a life here. Over time, he became the heart behind Kampot Dog Sanctuary and rescue work for vulnerable dogs.', author: 'KDS Team', image: 'whoisjoe.jpg', created_at: '2026-06-01T06:27:03Z' },
  { id: 2, title: 'CHICK CHICK', category: 'Dog Profile', content: 'Chick Chick is happiest when people respect her space. She is not aggressive when left alone, but she does not like being touched or stroked. Please let her come to you if she wants attention.', author: 'KDS Team', image: 'chick_chick.jpg', created_at: '2026-06-01T08:04:42Z' },
  { id: 3, title: 'FINN', category: 'Dog Profile', content: 'Finn enjoys a quiet life and needs people to respect his boundaries. He is not aggressive when left alone, but does not like being touched or stroked.', author: 'KDS Team', image: 'finn.jpg', created_at: '2026-06-01T08:04:42Z' },
];

export const videos = [
  { id: 1, youtube_id: '88TDPIASN3Y', title: 'KDS - Learn More' },
  { id: 2, youtube_id: 'Avsixhmxvvg', title: 'Inside Kampot Dog Sanctuary' },
];

export const featuredVideo = { youtube_id: '88TDPIASN3Y', title: 'LEARN MORE' };
